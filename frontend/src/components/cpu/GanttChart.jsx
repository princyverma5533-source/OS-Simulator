const labels = { fcfs: "First Come, First Served", sjf: "Shortest Job First", rr: "Round Robin" };

function GanttChart({ chart, algorithm }) {
  if (!chart) {
    return <section className="gantt-card gantt-card--empty"><h3>Gantt Chart</h3><p>Run a simulation to visualize CPU execution.</p></section>;
  }

  const totalTime = chart[chart.length - 1].end - chart[0].start;
  return (
    <section className="gantt-card">
      <div className="section-heading"><div><h3>Gantt Chart</h3><p>{labels[algorithm]}</p></div><span className="gantt-card__duration">{totalTime} units</span></div>
      <div className="gantt-scroll">
        <div className="gantt-chart">
          {chart.map((item, index) => (
            <div className={`gantt-block ${item.id === "Idle" ? "gantt-block--idle" : ""}`} key={`${item.id}-${index}`} style={{ flex: Math.max(item.end - item.start, 1) }}>
              <strong>{item.id}</strong><span>{item.end - item.start}u</span><small>{item.start}</small>
            </div>
          ))}
          <span className="gantt-chart__end">{chart[chart.length - 1].end}</span>
        </div>
      </div>
    </section>
  );
}

export default GanttChart;
