import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const algorithms = ["FCFS", "SSTF", "SCAN", "C-SCAN", "LOOK", "C-LOOK"];

function parseQueue(value) {
  const entries = value.split(",").map((entry) => entry.trim());
  if (!value.trim() || entries.some((entry) => !/^\d+$/.test(entry))) return null;
  return entries.map(Number);
}

function totalMovement(sequence) {
  return sequence.slice(1).reduce((total, track, index) => total + Math.abs(track - sequence[index]), 0);
}

function runFcfs(queue, head) {
  const sequence = [head, ...queue];
  return { sequence, executionOrder: [...queue] };
}

function runSstf(queue, head) {
  const pending = [...queue];
  const executionOrder = [];
  let current = head;

  while (pending.length) {
    let selectedIndex = 0;
    pending.forEach((track, index) => {
      if (Math.abs(track - current) < Math.abs(pending[selectedIndex] - current)) selectedIndex = index;
    });
    current = pending.splice(selectedIndex, 1)[0];
    executionOrder.push(current);
  }
  return { sequence: [head, ...executionOrder], executionOrder };
}

function runScan(queue, head, diskSize) {
  const higher = queue.filter((track) => track >= head).sort((first, second) => first - second);
  const lower = queue.filter((track) => track < head).sort((first, second) => second - first);
  const sequence = [head, ...higher];
  if (lower.length) {
    if (sequence[sequence.length - 1] !== diskSize - 1) sequence.push(diskSize - 1);
    sequence.push(...lower);
  }
  return { sequence, executionOrder: [...higher, ...lower] };
}

function runCScan(queue, head, diskSize) {
  const higher = queue.filter((track) => track >= head).sort((first, second) => first - second);
  const lower = queue.filter((track) => track < head).sort((first, second) => first - second);
  const sequence = [head, ...higher];
  if (lower.length) {
    if (sequence[sequence.length - 1] !== diskSize - 1) sequence.push(diskSize - 1);
    if (diskSize > 1) sequence.push(0);
    sequence.push(...lower);
  }
  return { sequence, executionOrder: [...higher, ...lower] };
}

function runLook(queue, head) {
  const higher = queue.filter((track) => track >= head).sort((first, second) => first - second);
  const lower = queue.filter((track) => track < head).sort((first, second) => second - first);
  return { sequence: [head, ...higher, ...lower], executionOrder: [...higher, ...lower] };
}

function runCLook(queue, head) {
  const higher = queue.filter((track) => track >= head).sort((first, second) => first - second);
  const lower = queue.filter((track) => track < head).sort((first, second) => first - second);
  return { sequence: [head, ...higher, ...lower], executionOrder: [...higher, ...lower] };
}

function DiskScheduling() {
  const [queueInput, setQueueInput] = useState("");
  const [headInput, setHeadInput] = useState("");
  const [diskSizeInput, setDiskSizeInput] = useState("");
  const [algorithm, setAlgorithm] = useState("FCFS");
  const [result, setResult] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!result?.sequence || currentStep >= result.sequence.length - 1) return undefined;
    const animation = window.setTimeout(() => setCurrentStep((step) => step + 1), 420);
    return () => window.clearTimeout(animation);
  }, [result, currentStep]);

  const simulate = () => {
    const queue = parseQueue(queueInput);
    const head = Number(headInput);
    const diskSize = Number(diskSizeInput);
    const validNumbers = queue && Number.isInteger(head) && Number.isInteger(diskSize) && diskSize > 0;
    const tracksAreValid = validNumbers && head >= 0 && head < diskSize && queue.every((track) => track >= 0 && track < diskSize);

    if (!tracksAreValid) {
      setResult({ error: "Enter a valid integer queue, head position, and disk size. Tracks must be within the disk range." });
      setCurrentStep(0);
      return;
    }

    const simulation = algorithm === "FCFS"
      ? runFcfs(queue, head)
        : algorithm === "SSTF"
        ? runSstf(queue, head)
        : algorithm === "SCAN"
          ? runScan(queue, head, diskSize)
          : algorithm === "C-SCAN"
            ? runCScan(queue, head, diskSize)
            : algorithm === "LOOK"
              ? runLook(queue, head)
              : runCLook(queue, head);
    const movement = totalMovement(simulation.sequence);
    setResult({ ...simulation, diskSize, head, totalMovement: movement, averageMovement: movement / queue.length });
    setCurrentStep(0);
  };

  const reset = () => {
    setQueueInput("");
    setHeadInput("");
    setDiskSizeInput("");
    setAlgorithm("FCFS");
    setResult(null);
    setCurrentStep(0);
  };

  const currentHead = result?.sequence?.[currentStep];
  const headPosition = result ? `${(currentHead / Math.max(result.diskSize - 1, 1)) * 100}%` : "0%";

  return (
    <section className="module-page">
      <header className="module-page__header">
        <div>
          <span className="dashboard__kicker">I/O management</span>
          <h2>Disk Scheduling</h2>
          <p>Schedule disk requests and inspect the resulting head movement.</p>
        </div>
        <Link className="back-button" to="/">← Back to Dashboard</Link>
      </header>

      <div className="module-grid">
        <section className="module-card module-card--input">
          <h3>Input section</h3>
          <p>Configure disk requests, starting head position, and disk size.</p>
          <label>
            Disk queue
            <input value={queueInput} onChange={(event) => setQueueInput(event.target.value)} placeholder="Example: 98, 183, 37, 122" />
          </label>
          <label>
            Initial head position
            <input type="number" min="0" step="1" value={headInput} onChange={(event) => setHeadInput(event.target.value)} placeholder="Example: 53" />
          </label>
          <label>
            Disk size
            <input type="number" min="1" step="1" value={diskSizeInput} onChange={(event) => setDiskSizeInput(event.target.value)} placeholder="Example: 200" />
          </label>
          <label>
            Scheduling algorithm
            <select value={algorithm} onChange={(event) => setAlgorithm(event.target.value)}>
              {algorithms.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <div className="module-actions">
            <button type="button" onClick={simulate}>Simulate</button>
            <button className="button--secondary" type="button" onClick={reset}>Reset</button>
          </div>
        </section>

        <section className="module-card module-card--visual">
          <h3>Disk head path</h3>
          <p>Current head movement across the disk track.</p>
          <div className="placeholder-visual" aria-label="Disk track visualization" aria-live="polite" style={{ display: "block", padding: "22px 12px" }}>
            {result && <>
              <div style={{ color: "var(--text)", display: "flex", fontSize: "11px", justifyContent: "space-between", marginBottom: "12px" }}><strong>Start: {result.head}</strong><strong>End: {result.sequence[result.sequence.length - 1]}</strong></div>
              <div style={{ background: "var(--border)", height: "4px", position: "relative", width: "100%" }}>
                {result.sequence.slice(0, currentStep + 1).map((track, index) => <div key={`${track}-${index}`} title={`Visited track ${track}`} style={{ background: "var(--primary)", borderRadius: "50%", height: "10px", left: `${(track / Math.max(result.diskSize - 1, 1)) * 100}%`, position: "absolute", top: "-3px", transform: "translateX(-50%)", width: "10px" }} />)}
                <div aria-label={`Current head ${currentHead}`} style={{ background: "var(--primary-dark)", borderRadius: "50%", height: "16px", left: headPosition, position: "absolute", top: "-6px", transform: "translateX(-50%)", transition: "left .35s ease", width: "16px" }} />
              </div>
              <div style={{ color: "var(--text-light)", display: "flex", fontSize: "11px", justifyContent: "space-between", marginTop: "14px" }}><div>0</div><strong>Current Head: {currentHead}</strong><div>{result.diskSize - 1}</div></div>
              <small>Visited Tracks: {result.sequence.slice(0, currentStep + 1).join(" → ")}</small>
            </>}
          </div>
        </section>
      </div>

      <section className="module-card module-card--output">
        <h3>Output section</h3>
        {result && <div className="output-placeholder">
          {result.error ? <strong>{result.error}</strong> : <>
            <strong>Total Head Movement: {result.totalMovement}</strong>
            <span>Average Movement: {result.averageMovement.toFixed(2)}</span>
            <span>Seek Sequence: {result.sequence.join(" → ")}</span>
            <span>Execution Order: {result.executionOrder.join(" → ")}</span>
          </>}
        </div>}
      </section>
    </section>
  );
}

export default DiskScheduling;
