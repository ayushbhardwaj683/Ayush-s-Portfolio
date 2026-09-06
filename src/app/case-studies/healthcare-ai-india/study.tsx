"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { ArrowLeft, ArrowUpRight, BookOpen, ChevronRight, RotateCcw } from "lucide-react";
import { calculateQueue, defaultQueue, specialistData, studySources } from "@/lib/healthcare-study";
import styles from "./study.module.css";

type SourceKey = keyof typeof studySources;
function Source({ id, children }: { id: SourceKey; children?: ReactNode }) {
  return <a className={styles.source} href={studySources[id].url} target="_blank" rel="noreferrer">{children || studySources[id].label} <ArrowUpRight size={13} aria-hidden="true" /></a>;
}

function QueueDashboard() {
  const [inputs, setInputs] = useState(defaultQueue);
  const { rows, assistedCapacity } = calculateQueue(inputs);
  const last = rows[rows.length - 1];
  const maxY = Math.max(100, Math.ceil(Math.max(...rows.flatMap(r => [r.baseline, r.assisted])) / 50) * 50);
  const x = (week: number) => 58 + week * 66;
  const y = (value: number) => 235 - (value / maxY) * 185;
  const points = (key: "baseline" | "assisted") => rows.map(r => `${x(r.week)},${y(r[key])}`).join(" ");
  const difference = last.baseline - last.assisted;

  return <div>
    <div className={styles.scenarioLabel}>Made-up example · not hospital results</div>
    <h3>Could the same team help more patients with AI support?</h3>
    <p>Imagine one team checking patients’ scan reports. Keep the number of staff and their working hours the same. There are already 60 patients waiting. Change the settings to see what might happen over eight weeks.</p>
    <div className={styles.controls}>
      <label>Patients arriving each week <output>{inputs.arrivals}</output><input type="range" min="40" max="240" step="10" value={inputs.arrivals} onChange={e => setInputs({ ...inputs, arrivals: Number(e.target.value) })} /></label>
      <label>Reports the team checks each week <output>{inputs.capacity}</output><input type="range" min="40" max="200" step="10" value={inputs.capacity} onChange={e => setInputs({ ...inputs, capacity: Number(e.target.value) })} /></label>
      <label>Change in reports checked with AI <output>{inputs.capacityChange > 0 ? "+" : ""}{inputs.capacityChange}%</output><input type="range" min="-20" max="40" step="5" value={inputs.capacityChange} onChange={e => setInputs({ ...inputs, capacityChange: Number(e.target.value) })} /></label>
    </div>
    <p className={styles.small}>For example, +20% changes 100 reports a week to 120 for the same team. This is an assumption, not a proven AI benefit. Try a negative value: learning a new tool or correcting its mistakes could slow the team down.</p>
    <div className={styles.legend}><span><i className={styles.baselineDot} /> Same team, current way of working (dashed)</span><span><i className={styles.assistedDot} /> Same team, assumed change with tools (solid)</span></div>
    <div className={styles.chartScroll}><svg className={styles.queueChart} viewBox="0 0 630 282" role="img" aria-labelledby="queue-title queue-description">
      <title id="queue-title">Example: patients waiting for their report to be checked</title><desc id="queue-description">At week eight, {last.baseline} patients wait with the current way of working, compared with {last.assisted} with the assumed change. The same values are available in the table below.</desc>
      <text x="58" y="20" className={styles.axisTitle}>Patients still waiting</text>
      {[0, .25, .5, .75, 1].map(f => <g key={f}><line x1="58" x2="586" y1={y(maxY * f)} y2={y(maxY * f)} className={styles.gridLine} /><text x="46" y={y(maxY * f) + 4} textAnchor="end" className={styles.axis}>{Math.round(maxY * f)}</text></g>)}
      {rows.map(r => <text key={r.week} x={x(r.week)} y="259" textAnchor="middle" className={styles.axis}>{r.week}</text>)}
      <text x="622" y="259" textAnchor="end" className={styles.axis}>Week</text>
      <polyline points={points("baseline")} className={styles.baselineLine} /><polyline points={points("assisted")} className={styles.assistedLine} />
      {rows.map(r => <circle key={r.week} cx={x(r.week)} cy={y(r.assisted)} r="3.5" className={styles.chartPoint} />)}
    </svg></div>
    <div className={styles.scenarioResult} aria-live="polite"><strong>{last.baseline} → {last.assisted}</strong><span>patients waiting at week 8 · {difference === 0 ? "no difference" : `${Math.abs(difference)} ${difference > 0 ? "fewer" : "more"} waiting`}<br />Same team with tools: {assistedCapacity} reports checked each week.</span></div>
    <div className={styles.scenarioFooter}><details><summary>How did I work this out?</summary><div className={styles.tableScroll}><table><caption>Made-up example: patients still waiting at the end of each week</caption><thead><tr><th scope="col">Week</th><th scope="col">Current way</th><th scope="col">With tools</th></tr></thead><tbody>{rows.map(r => <tr key={r.week}><th scope="row">{r.week}</th><td>{r.baseline}</td><td>{r.assisted}</td></tr>)}</tbody></table></div><p>Each week, add new patients to the waiting list and subtract the reports the team can check. The list cannot go below zero. Reports checked with tools = current number × (1 + percentage change ÷ 100), rounded down.</p><p>This simple example leaves out emergencies, repeat visits, patients leaving the queue and harder cases. Checking a report is not the same as finishing treatment. It does not predict deaths, illnesses or job losses.</p></details><button className={styles.reset} onClick={() => setInputs(defaultQueue)}><RotateCcw size={15} /> Reset</button></div>
  </div>;
}

function EvidenceDashboard() {
  const gap = specialistData.shortfall / specialistData.required * 100;
  return <div className={styles.evidenceGrid}>
    <article>
      <span className={styles.reportedLabel}>Government data · 31 March 2023</span>
      <h3>Some public facilities need many more specialists.</h3>
      <p>Rural Community Health Centres needed 21,964 specialist doctors under the staffing standard, but had 4,413.</p>
      <div className={styles.bigNumber}>{gap.toFixed(1)}% <span>below the required number</span></div>
      <div className={styles.stackedBar} role="img" aria-label="20.1 percent of required specialists in position; 79.9 percent shortfall"><span style={{ width: `${100-gap}%` }} /><span style={{ width: `${gap}%` }} /></div>
      <div className={styles.dataPair}><span>Working there<br /><strong>4,413</strong></span><span>Gap<br /><strong>17,551</strong></span><span>Needed<br /><strong>21,964</strong></span></div>
      <p><strong>Why it matters here:</strong> the workforce problem includes a lack of people. AI support does not remove the need for trained doctors.</p>
      <p className={styles.small}>Gap = 17,551 ÷ 21,964 × 100. This covers rural CHCs, not all hospitals. It compares staff with the required number, not just approved job vacancies.</p>
      <Source id="workforce" />
    </article>
    <article>
      <span className={styles.reportedLabel}>Hospital report · financial year 2024–25</span>
      <h3>Some repeated office tasks are already automated.</h3>
      <div className={styles.bigNumber}>20+ <span>software bots at Max Healthcare</span></div>
      <p>Max reports more than 20 software bots handling repeated tasks across business functions. These are software processes, not physical robots.</p>
      <p><strong>Why it matters here:</strong> hospitals are changing how some tasks are done. That does not tell us how many employees were replaced.</p>
      <p className={styles.small}>This is process automation, not a count of AI doctors. The report does not establish job losses or hours saved. These two cards describe different things and cannot be compared as an AI adoption rate.</p>
      <Source id="max" />
    </article>
  </div>;
}

const terms = [
  ["Workforce", "The people working in a hospital: doctors, nurses, technicians, office staff and others."],
  ["AI", "Software that finds patterns or makes suggestions, such as pointing out a scan that may need attention. Its suggestions can be wrong."],
  ["Automation", "Using software or equipment to carry out repeated steps, such as moving information between systems. It does not always use AI."],
  ["Robot-assisted surgery", "A surgeon uses controls to move surgical instruments. This is different from a robot deciding and operating on its own."],
  ["Training for new tasks", "Helping existing staff learn to use a tool, check its output and handle mistakes, rather than expecting them to adapt without support."],
  ["CHC", "Community Health Centre: a public health facility that provides referral care. The staffing chart covers rural CHCs only."],
  ["Software bot / RPA", "A program that follows steps to do repeated computer tasks. One bot does not equal one employee or one job lost."],
  ["Generative AI / GenAI", "AI that creates content, such as a draft note or report. A person still needs to check the result."],
];

function GlossaryItem({ term, definition, index }: { term: string; definition: string; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `glossary-definition-${index}`;

  return <div className={styles.glossaryItem} data-open={open}>
    <button type="button" className={styles.glossaryToggle} aria-expanded={open} aria-controls={panelId} onClick={() => setOpen(!open)}>
      <ChevronRight size={16} aria-hidden="true" />{term}
    </button>
    <div id={panelId} className={styles.glossaryPanel} aria-hidden={!open}>
      <div><p>{definition}</p></div>
    </div>
  </div>;
}

export default function HealthcareStudy() {
  const [dashboard, setDashboard] = useState<"evidence" | "scenario">("evidence");
  return <div className={styles.study}>
    <header className={styles.topbar}>
      <Link href="/" className={styles.mark}>AB</Link>
      <Link href="/#projects"><ArrowLeft size={16} /> Back to my portfolio</Link>
      <span>Learning notebook / 01</span>
    </header>
    <main className={styles.main}>
      <div className={styles.intro}>
        <span className={styles.kicker}><BookOpen size={16} /> My first business-analysis case study</span>
        <h1>AI in Indian hospitals:<br /><span>what happens to the staff?</span></h1>
        <p>As hospitals use more AI, some everyday tasks may become easier or need less manual work. I wanted to understand what this could mean for doctors, technicians and other hospital staff.</p>
        <div className={styles.meta}>Learning exercise · 7 September 2026 · Based on public sources, not hospital interviews</div>
      </div>
      <nav className={styles.contents} aria-label="Case study contents">
        <a href="#business-need">The question</a><a href="#people">Changes to work</a><a href="#examples">Hospital examples</a><a href="#dashboard">Simple dashboard</a><a href="#public-sector">Public hospitals</a><a href="#recommendation">My suggestion</a><a href="#terms">Terms & sources</a>
      </nav>

      <section id="business-need" className={styles.questionSection}>
        <span className={styles.kicker}>01 / What I am trying to understand</span>
        <h2>How will the growth of AI change healthcare jobs in India?</h2>
        <div className={styles.twoColumns}>
          <div>
            <h3>My problem statement</h3>
            <p>As Indian hospitals use more AI and automation, how will the daily work, skills and job opportunities of doctors, technicians and other staff change?</p>
            <p>The business question is how to improve patient care while helping staff learn new tasks and managing the risk that some roles may shrink.</p>
          </div>
          <aside className={styles.notebookNote}>
            <h3>What I want the reader to take away</h3>
            <p><strong>AI may take over parts of a job. That does not mean it takes over the whole job.</strong></p>
            <p>People may spend less time on repeated tasks and more time caring for patients, checking results and solving problems. But some routine roles could face pressure. The sources here do not tell us how many jobs will be gained or lost.</p>
          </aside>
        </div>
      </section>

      <section id="people" className={styles.section}>
        <span className={styles.kicker}>02 / What could change at work?</span>
        <h2>Less repeated work. New skills. Some job uncertainty.</h2>
        <p>These are possible task changes I would discuss with hospital staff. They are not findings that the hospitals below cut jobs.</p>
        <div className={styles.tableScroll}>
          <table className={styles.workforceTable}>
            <caption>How different hospital jobs could change</caption>
            <thead><tr><th scope="col">Who?</th><th scope="col">What could change?</th><th scope="col">What would people still do?</th></tr></thead>
            <tbody>
              <tr><th scope="row">Surgeons</th><td>For some operations, a surgeon controls robotic instruments instead of moving every instrument directly by hand. Robotic assistance is not automatically AI.</td><td>Decide how to treat the patient, control the operation and handle complications. Learn the system and keep the skills to work without it. <Source id="robotics" /></td></tr>
              <tr><th scope="row">Scan technicians</th><td>Software may help check image quality and highlight scans that need attention sooner.</td><td>Position patients, take scans safely, check equipment and raise concerns. Learn when the software cannot be trusted.</td></tr>
              <tr><th scope="row">Lab technicians</th><td>Tracking samples and entering results are possible tasks for automation. These examples do not prove AI use in a particular lab.</td><td>Handle samples, check equipment accuracy and investigate unusual results. Learn to manage automated steps and fix problems.</td></tr>
              <tr><th scope="row">Doctors and nurses</th><td>AI may help draft notes or organise information. Checking those drafts becomes part of the work.</td><td>Make care decisions, speak with patients and check that records are correct. A wrong draft can add work instead of saving it.</td></tr>
              <tr><th scope="row">Office staff</th><td>Some repeated data-entry and record-transfer tasks can be handled by software.</td><td>Handle exceptions and help patients. Some routine roles may shrink or change; training can help staff move into other tasks.</td></tr>
            </tbody>
          </table>
        </div>
        <div className={styles.inlineNote}><strong>My reading:</strong> there could be more need for people who check AI results, maintain systems and help others use them. These are possible changes, not measured job-growth figures. Staff should have training time and a say in how their work changes.</div>
      </section>

      <section id="examples" className={styles.section}>
        <span className={styles.kicker}>03 / Where this is already starting</span>
        <h2>Examples from three private hospitals</h2>
        <p>Each hospital reports a different use of technology. The examples show changing tasks, not proof that doctors or technicians have been replaced.</p>
        <div className={styles.hospitals}>
          <article>
            <span className={styles.hospitalType}>AI tools and robotic surgery</span><h3>Apollo Hospitals</h3>
            <p>Its 2024–25 report describes AI tools for health-risk checks and support for doctors. It also reports <strong>more than 22,000 robot-assisted operations in total by June 2025</strong> across its units.</p>
            <p className={styles.takeaway}><strong>What this means for staff:</strong> doctors need to understand the tools, check their advice and learn new equipment. The surgeon remains in control of robot-assisted surgery.</p>
            <Source id="apollo" /><small>The operation count is a running total, not one year’s activity or a count of autonomous AI surgery.</small>
          </article>
          <article>
            <span className={styles.hospitalType}>AI testing and repeated office tasks</span><h3>Max Healthcare</h3>
            <p>Its 2024–25 report describes testing generative AI in scan-related and clinical work, and using <strong>over 20 software bots</strong> across business functions.</p>
            <p className={styles.takeaway}><strong>What this means for staff:</strong> some repeated computer tasks can change. People still need to check outputs and deal with cases the software cannot handle.</p>
            <Source id="max" /><small>The bot count is not a count of employees replaced. The report does not establish job losses.</small>
          </article>
          <article>
            <span className={styles.hospitalType}>Surgeon-controlled equipment</span><h3>Medanta, Noida</h3>
            <p>The hospital lists a <strong>da Vinci Xi</strong> system in its robotic-surgery service.</p>
            <p className={styles.takeaway}><strong>What this means for staff:</strong> surgeons and supporting teams need training to use and maintain the equipment. This shows robotic assistance, not independent AI surgery.</p>
            <Source id="medanta" /><small>The source does not give a verified number of jobs changed or patient outcomes improved.</small>
          </article>
        </div>
      </section>

      <section id="dashboard" className={styles.dashboard}>
        <div className={styles.sectionHead}><div><span className={styles.kicker}>04 / Looking at the effect on staff and patients</span><h2>A simple workforce dashboard</h2></div><span className={styles.noteBadge}>Learning exercise</span></div>
        <p>The first view shows two facts about staffing and automation. The second asks whether the <strong>same team</strong> could check more reports with tools. It does not calculate how many jobs AI will replace.</p>
        <div className={styles.switcher} aria-label="Choose dashboard view"><button aria-pressed={dashboard === "evidence"} onClick={() => setDashboard("evidence")}>What the sources say</button><button aria-pressed={dashboard === "scenario"} onClick={() => setDashboard("scenario")}>Same team: a what-if example</button></div>
        {dashboard === "evidence" ? <EvidenceDashboard /> : <QueueDashboard />}
      </section>

      <section id="public-sector" className={styles.section}>
        <span className={styles.kicker}>05 / Why this matters in India</span><h2>Public hospitals also need support for their staff.</h2>
        <div className={styles.twoColumns}>
          <div>
            <h3>Government programmes already use AI.</h3>
            <p>A February 2026 government report says DeepCXR, a tool that checks chest X-rays, was used in <strong>eight states and union territories</strong>. It also describes AI support in eSanjeevani teleconsultations.</p><Source id="publicAI" />
            <p>But a tool needs working equipment, useful records and trained people. These needs must be checked hospital by hospital. It would be wrong to say every government hospital is behind.</p>
            <h3>The need for care is changing too.</h3>
            <p>UNFPA projects that people aged 60+ will make up more than 20% of India’s population by 2050. My reading: hospitals need to prepare staff for more long-term care and follow-up. That figure does not predict patient numbers by itself.</p><Source id="ageing" />
          </div>
          <aside className={styles.notebookNote}>
            <h3>What if staff are left behind?</h3>
            <p>Without training and support, staff may struggle with new tools or spend extra time correcting mistakes. Workers doing mostly routine tasks may have fewer chances to move into new roles.</p>
            <p>If hospitals cannot keep up with the work, patients could wait longer or travel elsewhere. These are possible risks—not measured predictions of extra deaths or job losses.</p>
            <p><strong>My point:</strong> investing in staff should be part of investing in AI.</p>
          </aside>
        </div>
        <details className={styles.measurements}><summary>A supporting point: patients still need affordable care</summary><p>Direct household payments made up 39.4% of India’s total health spending in 2021–22, down from 62.6% in 2014–15. This is a spending share, not a patient count. It does not show that AI caused the fall. My question for a hospital would be whether new tools improve service without making care harder to afford.</p><Source id="spending" /></details>
      </section>

      <section id="recommendation" className={styles.section}>
        <span className={styles.kicker}>06 / What I would suggest to a hospital</span><h2>Understand the job before changing it.</h2>
        <p>I would start with one team and one repeated task, such as preparing a draft scan report. The aim would be to learn how the task changes—not to assume the hospital can reduce staff.</p>
        <div className={styles.pilot}>
          <div><strong>1. Listen to the team</strong><p>Ask what takes time, where mistakes happen and what staff worry about. Measure the time spent on the task before adding AI.</p></div>
          <div><strong>2. Try it with training</strong><p>Train a small group, give them time to practise, and keep a person checking every final result. Keep the old process available if the tool fails.</p></div>
          <div><strong>3. Check the real effect</strong><p>Compare time saved with time spent checking and fixing outputs. Ask staff whether the work became easier, harder or simply different.</p></div>
        </div>
        <h3>What I would measure</h3>
        <ul className={styles.list}>
          <li><strong>Staff time:</strong> minutes spent on each report, including corrections.</li>
          <li><strong>Training:</strong> who received training and who still needs help.</li>
          <li><strong>Quality:</strong> mistakes found by the doctor checking the report.</li>
          <li><strong>Job changes:</strong> tasks removed, new tasks added, and whether staff moved into other work.</li>
          <li><strong>Patient service:</strong> how long patients wait for a checked report.</li>
        </ul>
        <p className={styles.small}>This is my proposed learning exercise, not work I have carried out in a hospital. The ICMR guidelines informed the need for human checks, safety, privacy and fair treatment. <Source id="ethics" /></p>
        <div className={styles.inlineNote}><h3>My answer to the main question</h3><p>As AI grows, healthcare workers may do less of some repeated tasks and more checking, problem-solving and patient care. Some routine roles could shrink, while other tasks could grow. The size of these changes is still unknown in the evidence used here.</p><p><strong>Hospitals should plan the people side of AI: train staff, review how jobs change, and check whether patients actually benefit.</strong></p></div>
      </section>

      <section id="terms" className={styles.section}><span className={styles.kicker}>07 / A few useful words</span><h2>Simple meanings</h2><div className={styles.glossary}>{[0, 1].map(column => <div className={styles.glossaryColumn} key={column}>{terms.map(([term, definition], index) => index % 2 === column ? <GlossaryItem key={term} term={term} definition={definition} index={index} /> : null)}</div>)}</div></section>
      <section className={styles.section} id="sources"><span className={styles.kicker}>08 / Where the information came from</span><h2>Sources and what I still do not know</h2><p>I checked these sources on 7 September 2026. Each figure keeps its original date. Hospital examples come from the hospitals themselves. I have not interviewed staff, measured job losses, or proved that AI caused better patient outcomes.</p><details><summary>Read the source list and data notes</summary><ol className={styles.sourceList}>{Object.entries(studySources).map(([id, source]) => <li key={id}><Source id={id as SourceKey} /><p>{source.note}</p></li>)}</ol></details><p className={styles.small}>My next step would be to speak to healthcare workers and compare their tasks before and after a tool is introduced. That would help test the ideas in this case study.</p></section>
      <footer className={styles.bottom}><Link href="/#projects"><ArrowLeft size={16} /> Back to my projects</Link><span>Bhardwaj · Learning in public</span></footer>
    </main>
  </div>;
}
