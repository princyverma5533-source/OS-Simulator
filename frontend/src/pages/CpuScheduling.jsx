import { useState } from "react";

function CpuScheduling() {
  const [algorithm, setAlgorithm] = useState("FCFS");

  const [processes, setProcesses] = useState([
    { id: "P1", arrival: 0, burst: 5 },
    { id: "P2", arrival: 1, burst: 3 },
    { id: "P3", arrival: 2, burst: 8 },
    { id: "P4", arrival: 3, burst: 6 },
  ]);

  const [result, setResult] = useState(null);

  const handleChange = (index, field, value) => {
    const updated = [...processes];

    updated[index] = {
      ...updated[index],
      [field]: Number(value),
    };

    setProcesses(updated);
  };

  const addProcess = () => {
    const nextNumber = processes.length + 1;

    setProcesses([
      ...processes,
      {
        id: `P${nextNumber}`,
        arrival: 0,
        burst: 1,
      },
    ]);
  };

  const removeProcess = (index) => {
    if (processes.length <= 1) return;

    setProcesses(
      processes.filter((_, i) => i !== index)
    );
  };

  const reset = () => {
    setAlgorithm("FCFS");

    setProcesses([
      { id: "P1", arrival: 0, burst: 5 },
      { id: "P2", arrival: 1, burst: 3 },
      { id: "P3", arrival: 2, burst: 8 },
      { id: "P4", arrival: 3, burst: 6 },
    ]);

    setResult(null);
  };

  const simulate = () => {
    if (processes.length === 0) return;

    let currentTime = 0;
    const calculated = [];

    let orderedProcesses = [...processes];

    if (algorithm === "SJF") {
      orderedProcesses.sort((a, b) => {
        if (a.arrival !== b.arrival) {
          return a.arrival - b.arrival;
        }

        return a.burst - b.burst;
      });
    } else {
      orderedProcesses.sort(
        (a, b) => a.arrival - b.arrival
      );
    }

    orderedProcesses.forEach((process) => {
      if (currentTime < process.arrival) {
        currentTime = process.arrival;
      }

      const start = currentTime;
      const completion = start + process.burst;

      const turnaround =
        completion - process.arrival;

      const waiting =
        turnaround - process.burst;

      calculated.push({
        ...process,
        start,
        completion,
        waiting,
        turnaround,
      });

      currentTime = completion;
    });

    const totalWaiting = calculated.reduce(
      (sum, process) =>
        sum + process.waiting,
      0
    );

    const totalTurnaround = calculated.reduce(
      (sum, process) =>
        sum + process.turnaround,
      0
    );

    setResult({
      processes: calculated,
      averageWaiting:
        totalWaiting / calculated.length,
      averageTurnaround:
        totalTurnaround / calculated.length,
    });
  };

  return (
    <>
      {/* PAGE HEADER */}
      <header className="cpu-page__header">
        <div>
          <span className="dashboard__kicker">
            Processor management
          </span>

          <h2>CPU Scheduling</h2>

          <p>
            Configure processes and compare CPU
            scheduling algorithms through an
            interactive simulation.
          </p>
        </div>
      </header>

      {/* INPUT + GANTT */}
      <div className="cpu-workspace">

        {/* INPUT SECTION */}
        <div className="cpu-panel">

          <h3>Input Section</h3>

          <p>
            Configure the simulation inputs.
          </p>

          {/* PROCESS INPUT INSIDE INPUT SECTION */}
          <h4>Process Input</h4>

          <p>
            Enter arrival time and burst time for
            each process.
          </p>

          <table className="process-table">
            <thead>
              <tr>
                <th>Process</th>
                <th>Arrival</th>
                <th>Burst</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {processes.map(
                (process, index) => (
                  <tr key={process.id}>

                    <td>
                      <strong>
                        {process.id}
                      </strong>
                    </td>

                    <td>
                      <input
                        type="number"
                        min="0"
                        value={process.arrival}
                        onChange={(e) =>
                          handleChange(
                            index,
                            "arrival",
                            e.target.value
                          )
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="number"
                        min="1"
                        value={process.burst}
                        onChange={(e) =>
                          handleChange(
                            index,
                            "burst",
                            e.target.value
                          )
                        }
                      />
                    </td>

                    <td>
                      <button
                        type="button"
                        className="button--secondary"
                        onClick={() =>
                          removeProcess(index)
                        }
                      >
                        Remove
                      </button>
                    </td>

                  </tr>
                )
              )}
            </tbody>
          </table>

          {/* ADD PROCESS */}
          <div className="cpu-controls__actions">
            <button
              type="button"
              onClick={addProcess}
            >
              Add Process
            </button>
          </div>

          {/* ALGORITHM */}
          <label>
            Scheduling Algorithm

            <select
              value={algorithm}
              onChange={(e) =>
                setAlgorithm(e.target.value)
              }
            >
              <option value="FCFS">
                FCFS
              </option>

              <option value="SJF">
                SJF (Non-Preemptive)
              </option>

              <option value="Round Robin">
                Round Robin
              </option>
            </select>
          </label>

          {/* SIMULATE + RESET */}
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

        {/* GANTT CHART */}
        <div className="cpu-panel">

          <h3>Gantt Chart</h3>

          <p>
            CPU execution timeline.
          </p>

          {!result ? (
            <p>
              Run a simulation to populate the
              Gantt chart.
            </p>
          ) : (
            <div className="gantt-chart">

              {result.processes.map(
                (process) => (
                  <div
                    className="gantt-block"
                    key={process.id}
                  >
                    <strong>
                      {process.id}
                    </strong>

                    <small>
                      {process.start} -{" "}
                      {process.completion}
                    </small>
                  </div>
                )
              )}

            </div>
          )}

        </div>

      </div>

      {/* OUTPUT SECTION - BOTTOM */}
      <div className="cpu-panel">

        <h3>Output Section</h3>

        {!result ? (
          <div>
            <h4>Awaiting simulation</h4>

            <p>
              Run a simulation to populate this
              view.
            </p>
          </div>
        ) : (
          <>
            <h4>Process Statistics</h4>

            <table className="process-table">

              <thead>
                <tr>
                  <th>Process</th>
                  <th>Arrival</th>
                  <th>Burst</th>
                  <th>Completion</th>
                  <th>Waiting</th>
                  <th>Turnaround</th>
                </tr>
              </thead>

              <tbody>
                {result.processes.map(
                  (process) => (
                    <tr key={process.id}>

                      <td>{process.id}</td>

                      <td>
                        {process.arrival}
                      </td>

                      <td>
                        {process.burst}
                      </td>

                      <td>
                        {process.completion}
                      </td>

                      <td>
                        {process.waiting}
                      </td>

                      <td>
                        {process.turnaround}
                      </td>

                    </tr>
                  )
                )}
              </tbody>

            </table>

            {/* AVERAGES */}
            <div className="cpu-stats">

              <div className="cpu-stat-card">
                <span>
                  Average Waiting Time
                </span>

                <strong>
                  {result.averageWaiting.toFixed(
                    2
                  )}
                </strong>
              </div>

              <div className="cpu-stat-card">
                <span>
                  Average Turnaround Time
                </span>

                <strong>
                  {result.averageTurnaround.toFixed(
                    2
                  )}
                </strong>
              </div>

            </div>
          </>
        )}

      </div>
    </>
  );
}

export default CpuScheduling;