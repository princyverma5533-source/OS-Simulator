function DeadlockForm({
  available,
  setAvailable,
  allocation,
  setAllocation,
  maximum,
  setMaximum,
  simulate,
  reset,
}) {
  return (
    <div className="cpu-panel">
      <div className="cpu-controls">

        <label>
          Available Resources
          <input
            type="text"
            value={available}
            onChange={(e) => setAvailable(e.target.value)}
            placeholder="3,3,2"
          />
        </label>

        <label>
          Allocation Matrix
          <textarea
            rows={6}
            value={allocation}
            onChange={(e) => setAllocation(e.target.value)}
            placeholder={`0,1,0
2,0,0
3,0,2
2,1,1
0,0,2`}
          />
        </label>

        <label>
          Maximum Matrix
          <textarea
            rows={6}
            value={maximum}
            onChange={(e) => setMaximum(e.target.value)}
            placeholder={`7,5,3
3,2,2
9,0,2
2,2,2
4,3,3`}
          />
        </label>

        <div className="cpu-controls__actions">
          <button onClick={simulate}>
            Simulate
          </button>

          <button
            className="button--secondary"
            onClick={reset}
          >
            Reset
          </button>
        </div>

      </div>
    </div>
  );
}

export default DeadlockForm;