function ProcessTable({ processes, onAdd, onUpdate, onRemove }) {
  return (
    <section className="process-table">
      <div className="section-heading">
        <div><h3>Process queue</h3><p>Arrival and CPU burst times are measured in time units.</p></div>
        <button type="button" onClick={onAdd}>+ Add Process</button>
      </div>
      <div className="table-scroll">
        <table>
          <thead><tr><th>Process ID</th><th>Arrival Time</th><th>Burst Time</th><th>Action</th></tr></thead>
          <tbody>
            {processes.map((process) => (
              <tr key={process.id}>
                <td><span className="process-pill">P{process.id}</span></td>
                <td><input aria-label={`Arrival time for P${process.id}`} type="number" min="0" value={process.arrival} onChange={(event) => onUpdate(process.id, "arrival", event.target.value)} /></td>
                <td><input aria-label={`Burst time for P${process.id}`} type="number" min="1" value={process.burst} onChange={(event) => onUpdate(process.id, "burst", event.target.value)} /></td>
                <td><button className="remove-button" type="button" onClick={() => onRemove(process.id)} disabled={processes.length === 1}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ProcessTable;
