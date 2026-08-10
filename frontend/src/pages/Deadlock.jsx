import { useState } from "react";

function Deadlock() {
  const [available, setAvailable] = useState("3,3,2");

  const [allocation, setAllocation] = useState(`0,1,0
2,0,0
3,0,2
2,1,1
0,0,2`);

  const [maximum, setMaximum] = useState(`7,5,3
3,2,2
9,0,2
2,2,2
4,3,3`);

  const [needMatrix, setNeedMatrix] = useState([]);
  const [safeSequence, setSafeSequence] = useState([]);
  const [safeState, setSafeState] = useState(null);

  const reset = () => {
    setAvailable("3,3,2");

    setAllocation(`0,1,0
2,0,0
3,0,2
2,1,1
0,0,2`);

    setMaximum(`7,5,3
3,2,2
9,0,2
2,2,2
4,3,3`);

    setNeedMatrix([]);
    setSafeSequence([]);
    setSafeState(null);
  };

  const simulate = () => {
    try {
      const availableResources = available
        .split(",")
        .map((value) => Number(value.trim()));

      const allocationMatrix = allocation
        .trim()
        .split("\n")
        .map((row) =>
          row.split(",").map((value) => Number(value.trim()))
        );

      const maximumMatrix = maximum
        .trim()
        .split("\n")
        .map((row) =>
          row.split(",").map((value) => Number(value.trim()))
        );

      const processCount = allocationMatrix.length;
      const resourceCount = availableResources.length;

      if (
        processCount === 0 ||
        maximumMatrix.length !== processCount ||
        allocationMatrix.some(
          (row) => row.length !== resourceCount
        ) ||
        maximumMatrix.some(
          (row) => row.length !== resourceCount
        ) ||
        availableResources.some(
          (value) => !Number.isFinite(value) || value < 0
        )
      ) {
        alert("Invalid Matrix Format");
        return;
      }

      const need = allocationMatrix.map((row, i) =>
        row.map(
          (value, j) => maximumMatrix[i][j] - value
        )
      );

      const hasInvalidValue = need.some((row) =>
        row.some(
          (value) =>
            !Number.isFinite(value) || value < 0
        )
      );

      if (hasInvalidValue) {
        alert(
          "Maximum value cannot be smaller than Allocation value."
        );
        return;
      }

      const work = [...availableResources];
      const finish = new Array(processCount).fill(false);
      const sequence = [];

      let completed = 0;

      while (completed < processCount) {
        let found = false;

        for (let i = 0; i < processCount; i++) {
          if (finish[i]) {
            continue;
          }

          let canRun = true;

          for (let j = 0; j < resourceCount; j++) {
            if (need[i][j] > work[j]) {
              canRun = false;
              break;
            }
          }

          if (canRun) {
            for (let j = 0; j < resourceCount; j++) {
              work[j] += allocationMatrix[i][j];
            }

            finish[i] = true;
            completed += 1;
            sequence.push(`P${i}`);
            found = true;
          }
        }

        if (!found) {
          break;
        }
      }

      setNeedMatrix(need);
      setSafeSequence(sequence);
      setSafeState(completed === processCount);
    } catch (error) {
      alert("Invalid Input");
    }
  };

  return (
    <>
      {/* PAGE HEADER */}

      <header className="cpu-page__header">
        <div>
          <span className="dashboard__kicker">
            System Safety
          </span>

          <h2>Deadlock</h2>

          <p>
            Enter resource information and preview a
            safety-analysis workspace.
          </p>
        </div>
      </header>

      {/* TOP WORKSPACE */}

      <div className="cpu-workspace">

        {/* INPUT SECTION */}

        <div className="cpu-panel deadlock-input-panel">

          <h3>Input Section</h3>

          <p>
            Configure the simulation inputs.
          </p>

          {/* MATRICES */}

          <div className="deadlock-matrix-row">

            {/* ALLOCATION */}

            <div className="deadlock-field">

              <label>
                Allocation Matrix
              </label>

              <textarea
                rows="5"
                value={allocation}
                onChange={(e) =>
                  setAllocation(e.target.value)
                }
                placeholder={`0,1,0
2,0,0
3,0,2
2,1,1
0,0,2`}
              />

            </div>

            {/* MAXIMUM */}

            <div className="deadlock-field">

              <label>
                Maximum Matrix
              </label>

              <textarea
                rows="5"
                value={maximum}
                onChange={(e) =>
                  setMaximum(e.target.value)
                }
                placeholder={`7,5,3
3,2,2
9,0,2
2,2,2
4,3,3`}
              />

            </div>

          </div>

          {/* AVAILABLE RESOURCES */}

          <div className="deadlock-available">

            <label>
              Available Resources
            </label>

            <input
              type="text"
              value={available}
              onChange={(e) =>
                setAvailable(e.target.value)
              }
              placeholder="Example: 3,3,2"
            />

          </div>

          {/* BUTTONS */}

          <div className="cpu-controls__actions">

            <button
              type="button"
              onClick={simulate}
            >
              Simulate
            </button>

            <button
              type="button"
              className="button--secondary"
              onClick={reset}
            >
              Reset
            </button>

          </div>

        </div>

        {/* RESOURCE ALLOCATION VIEW */}

        <div className="cpu-panel">

          <h3>Resource Allocation View</h3>

          <p>
            Visualization area
          </p>

          {safeState === null ? (
            <p>
              Run a simulation to populate this view.
            </p>
          ) : (
            <>
              <h4>
                {safeState
                  ? "Safe State ✅"
                  : "Unsafe State ❌"}
              </h4>

              <p>
                <strong>Safe Sequence:</strong>
                <br />

                {safeSequence.length > 0
                  ? safeSequence.join(" → ")
                  : "No safe sequence found."}
              </p>
            </>
          )}

        </div>

      </div>

      {/* OUTPUT SECTION */}

      <div className="cpu-panel">

        <h3>Output Section</h3>

        {needMatrix.length === 0 ? (
          <div>

            <h4>
              Awaiting simulation
            </h4>

            <p>
              Results and metrics will appear here.
            </p>

          </div>
        ) : (
          <div>

            <h4>
              Need Matrix
            </h4>

            <table className="process-table">

              <thead>
                <tr>
                  <th>Process</th>
                  <th>R1</th>
                  <th>R2</th>
                  <th>R3</th>
                </tr>
              </thead>

              <tbody>

                {needMatrix.map((row, index) => (
                  <tr key={index}>

                    <td>
                      P{index}
                    </td>

                    {row.map((value, i) => (
                      <td key={i}>
                        {value}
                      </td>
                    ))}

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>
    </>
  );
}

export default Deadlock;