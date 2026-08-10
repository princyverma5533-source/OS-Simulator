function CpuStats({ completed }) {
  if (!completed) {
    return <section className="results-panel results-panel--empty"><h3>Simulation results</h3><p>Completion, waiting, and turnaround times will appear here.</p></section>;
  }

  const results = [...completed].sort((first, second) => first.id - second.id);
  const averageWaiting = results.reduce((total, process) => total + process.waiting, 0) / results.length;
  const averageTurnaround = results.reduce((total, process) => total + process.turnaround, 0) / results.length;

  return (
    <section className="results-panel">
      <div className="section-heading"><div><h3>Performance results</h3><p>Per-process scheduling metrics.</p></div></div>
      <div className="table-scroll">
        <table>
          <thead><tr><th>Process</th><th>Completion Time</th><th>Waiting Time</th><th>Turnaround Time</th></tr></thead>
          <tbody>{results.map((process) => <tr key={process.id}><td><span className="process-pill">P{process.id}</span></td><td>{process.completion}</td><td>{process.waiting}</td><td>{process.turnaround}</td></tr>)}</tbody>
        </table>
      </div>
      <div className="stats-grid">
        <div className="stat-card"><span>Average Waiting Time</span><strong>{averageWaiting.toFixed(2)} units</strong></div>
        <div className="stat-card"><span>Average Turnaround Time</span><strong>{averageTurnaround.toFixed(2)} units</strong></div>
      </div>
    </section>
  );
}

export default CpuStats;
