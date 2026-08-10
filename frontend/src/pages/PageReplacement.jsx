import { useState } from "react";

function parseReferences(value) {
  const parts = value
    .split(",")
    .map((reference) => reference.trim());

  if (
    !value.trim() ||
    parts.some((reference) => !/^-?\d+$/.test(reference))
  ) {
    return null;
  }

  return parts.map(Number);
}

/* ---------------- FIFO ---------------- */

function runFifo(references, frameCount) {
  const frames = Array(frameCount).fill(null);
  const steps = [];

  let pointer = 0;
  let faults = 0;

  references.forEach((reference) => {
    const hit = frames.includes(reference);
    let changedIndex = null;

    if (!hit) {
      faults += 1;

      changedIndex = frames.indexOf(null);

      if (changedIndex === -1) {
        changedIndex = pointer;
        pointer = (pointer + 1) % frameCount;
      }

      frames[changedIndex] = reference;
    }

    steps.push({
      reference,
      frames: [...frames],
      changedIndex,
      hit,
      replacedPage: null,
    });
  });

  return {
    steps,
    faults,
    finalFrames: frames,
  };
}

/* ---------------- LRU ---------------- */

function runLru(references, frameCount) {
  const frames = Array(frameCount).fill(null);
  const lastUsed = new Map();
  const steps = [];

  let faults = 0;

  references.forEach((reference, stepIndex) => {
    const existingIndex = frames.indexOf(reference);
    const hit = existingIndex !== -1;

    let changedIndex = null;
    let replacedPage = null;

    if (hit) {
      lastUsed.set(reference, stepIndex);
    } else {
      faults += 1;

      changedIndex = frames.indexOf(null);

      if (changedIndex === -1) {
        changedIndex = frames.reduce(
          (leastRecentIndex, frame, index) => {
            const currentLastUsed = lastUsed.get(frame);
            const leastLastUsed = lastUsed.get(
              frames[leastRecentIndex]
            );

            return currentLastUsed < leastLastUsed
              ? index
              : leastRecentIndex;
          },
          0
        );

        replacedPage = frames[changedIndex];

        lastUsed.delete(frames[changedIndex]);
      }

      frames[changedIndex] = reference;
      lastUsed.set(reference, stepIndex);
    }

    steps.push({
      reference,
      frames: [...frames],
      changedIndex,
      hit,
      replacedPage,
    });
  });

  return {
    steps,
    faults,
    finalFrames: frames,
  };
}

/* ---------------- OPTIMAL ---------------- */

function runOptimal(references, frameCount) {
  const frames = Array(frameCount).fill(null);
  const steps = [];

  let faults = 0;

  references.forEach((reference, stepIndex) => {
    const existingIndex = frames.indexOf(reference);
    const hit = existingIndex !== -1;

    let changedIndex = null;
    let replacedPage = null;

    if (!hit) {
      faults += 1;

      changedIndex = frames.indexOf(null);

      if (changedIndex === -1) {
        changedIndex = frames.reduce(
          (replacementIndex, frame, index) => {
            const nextUse = references.indexOf(
              frame,
              stepIndex + 1
            );

            const replacementNextUse =
              references.indexOf(
                frames[replacementIndex],
                stepIndex + 1
              );

            const distance =
              nextUse === -1 ? Infinity : nextUse;

            const replacementDistance =
              replacementNextUse === -1
                ? Infinity
                : replacementNextUse;

            return distance > replacementDistance
              ? index
              : replacementIndex;
          },
          0
        );

        replacedPage = frames[changedIndex];
      }

      frames[changedIndex] = reference;
    }

    steps.push({
      reference,
      frames: [...frames],
      changedIndex,
      hit,
      replacedPage,
    });
  });

  return {
    steps,
    faults,
    finalFrames: frames,
  };
}

/* ---------------- MAIN COMPONENT ---------------- */

function PageReplacement() {
  const [referenceInput, setReferenceInput] = useState("");

  const [frameInput, setFrameInput] = useState("");

  const [algorithm, setAlgorithm] = useState("FIFO");

  const [result, setResult] = useState(null);

  /* ---------------- SIMULATE ---------------- */

  const simulate = () => {
    const references = parseReferences(referenceInput);

    const frameCount = Number(frameInput);

    if (
      !references ||
      !Number.isInteger(frameCount) ||
      frameCount <= 0
    ) {
      setResult({
        error:
          "Enter a comma-separated reference string containing integers and a frame count greater than zero.",
      });

      return;
    }

    let simulation;

    if (algorithm === "FIFO") {
      simulation = runFifo(
        references,
        frameCount
      );
    } else if (algorithm === "LRU") {
      simulation = runLru(
        references,
        frameCount
      );
    } else {
      simulation = runOptimal(
        references,
        frameCount
      );
    }

    const hits =
      references.length - simulation.faults;

    setResult({
      ...simulation,
      hits,
      total: references.length,
    });
  };

  /* ---------------- RESET ---------------- */

  const reset = () => {
    setReferenceInput("");
    setFrameInput("");
    setAlgorithm("FIFO");
    setResult(null);
  };

  return (
    <>
      {/* PAGE HEADER */}

      <header className="cpu-page__header">
        <div>
          <span className="dashboard__kicker">
            Virtual memory
          </span>

          <h2>Page Replacement</h2>

          <p>
            Simulate page references with FIFO,
            LRU, or Optimal replacement.
          </p>
        </div>
      </header>

      {/* MAIN WORKSPACE */}

      <div className="module-grid">

        {/* INPUT SECTION */}

        <section className="module-card module-card--input">
          <h3>Input section</h3>

          <p>
            Configure the page reference string
            and frame count.
          </p>

          <label>
            Page reference string

            <input
              value={referenceInput}
              onChange={(event) =>
                setReferenceInput(
                  event.target.value
                )
              }
              placeholder="Example: 7, 0, 1, 2, 0, 3"
            />
          </label>

          <label>
            Number of frames

            <input
              type="number"
              min="1"
              step="1"
              value={frameInput}
              onChange={(event) =>
                setFrameInput(
                  event.target.value
                )
              }
              placeholder="Example: 3"
            />
          </label>

          <label>
            Replacement algorithm

            <select
              value={algorithm}
              onChange={(event) =>
                setAlgorithm(
                  event.target.value
                )
              }
            >
              <option value="FIFO">
                FIFO
              </option>

              <option value="LRU">
                LRU
              </option>

              <option value="Optimal">
                Optimal
              </option>
            </select>
          </label>

          <div className="module-actions">
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
        </section>

        {/* VISUALIZATION SECTION */}

        <section className="module-card module-card--visual">
          <h3>
            Page frame visualization
          </h3>

          <p>
            Frame state after each page
            reference.
          </p>

          <div
            className="placeholder-visual"
            aria-live="polite"
            aria-label="Page replacement frame updates"
            style={{
              alignItems: "stretch",
              display: "block",
              maxHeight: "430px",
              overflowY: "auto",
              padding: "12px",
            }}
          >
            {!result ? (
              <p>
                Run a simulation to populate
                this view.
              </p>
            ) : result.error ? (
              <strong>
                {result.error}
              </strong>
            ) : (
              result.steps.map(
                (step, stepIndex) => (
                  <div
                    key={`${step.reference}-${stepIndex}`}
                    style={{
                      borderBottom:
                        "1px solid var(--border)",
                      display: "grid",
                      gap: "7px",
                      padding: "10px 0",
                    }}
                  >
                    <strong
                      style={{
                        color: "var(--text)",
                        fontSize: "12px",
                      }}
                    >
                      Reference:{" "}
                      {step.reference} ·{" "}
                      {step.hit
                        ? "Hit"
                        : "Fault"}

                      {step.replacedPage !==
                        null &&
                        step.replacedPage !==
                          undefined &&
                        ` · Replaced: ${step.replacedPage}`}
                    </strong>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "6px",
                      }}
                    >
                      {step.frames.map(
                        (
                          frame,
                          frameIndex
                        ) => (
                          <div
                            key={`${stepIndex}-${frameIndex}`}
                            style={{
                              background:
                                frameIndex ===
                                step.changedIndex
                                  ? "var(--primary)"
                                  : "var(--surface)",
                              border:
                                "1px solid var(--border)",
                              borderRadius:
                                "8px",
                              color:
                                frameIndex ===
                                step.changedIndex
                                  ? "#ffffff"
                                  : "var(--text)",
                              fontSize: "11px",
                              minWidth: "72px",
                              padding: "7px",
                            }}
                          >
                            Frame{" "}
                            {frameIndex + 1}:{" "}
                            {frame ?? "-"}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </section>
      </div>

      {/* OUTPUT SECTION */}

      <section className="module-card module-card--output">
        <h3>Output section</h3>

        {!result ? (
          <>
            <h4>
              Awaiting simulation
            </h4>

            <p>
              Results and metrics will appear
              here.
            </p>
          </>
        ) : result.error ? (
          <>
            <h4>
              Invalid Input
            </h4>

            <p>
              {result.error}
            </p>
          </>
        ) : (
          <div className="output-placeholder">
            <strong>
              Total Page Faults:{" "}
              {result.faults}
            </strong>

            <span>
              Total Page Hits:{" "}
              {result.hits}
            </span>

            <span>
              Hit Ratio:{" "}
              {(
                result.hits /
                result.total
              ).toFixed(2)}
            </span>

            <span>
              Fault Ratio:{" "}
              {(
                result.faults /
                result.total
              ).toFixed(2)}
            </span>

            <span>
              Final Frame State:{" "}
              {result.finalFrames
                .map(
                  (frame) =>
                    frame ?? "-"
                )
                .join(", ")}
            </span>
          </div>
        )}
      </section>
    </>
  );
}

export default PageReplacement;