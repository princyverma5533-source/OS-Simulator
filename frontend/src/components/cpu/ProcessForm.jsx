function ProcessForm({ algorithm, onAlgorithmChange, quantum, onQuantumChange, onSimulate, onReset }) {
  return (
    <div className="cpu-controls">
      <label>
        Scheduling algorithm
        <select value={algorithm} onChange={(event) => onAlgorithmChange(event.target.value)}>
          <option value="fcfs">FCFS</option>
          <option value="sjf">SJF (Non Preemptive)</option>
          <option value="rr">Round Robin</option>
        </select>
      </label>
      {algorithm === "rr" && (
        <label>
          Time quantum
          <input type="number" min="1" value={quantum} onChange={(event) => onQuantumChange(Math.max(1, Number(event.target.value) || 1))} />
        </label>
      )}
      <div className="cpu-controls__actions">
        <button type="button" onClick={onSimulate}>Simulate</button>
        <button className="button--secondary" type="button" onClick={onReset}>Reset</button>
      </div>
    </div>
  );
}

export default ProcessForm;
