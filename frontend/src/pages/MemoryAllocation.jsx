import { useState } from "react";
import { Link } from "react-router-dom";

const algorithms = ["First Fit", "Best Fit", "Worst Fit"];

function parseBlocks(value) {
  if (!value.trim()) return [];
  return value.split(",").map((block) => Number(block.trim()));
}

function findBlock(blocks, processSize, algorithm) {
  const eligible = blocks
    .map((size, index) => ({ size, index }))
    .filter((block) => block.size >= processSize);

  if (!eligible.length) return null;
  if (algorithm === "First Fit") return eligible[0];
  if (algorithm === "Best Fit") return eligible.reduce((best, block) => block.size < best.size ? block : best);
  return eligible.reduce((worst, block) => block.size > worst.size ? block : worst);
}

function MemoryAllocation() {
  const [blocksInput, setBlocksInput] = useState("");
  const [processSize, setProcessSize] = useState("");
  const [algorithm, setAlgorithm] = useState("First Fit");
  const [result, setResult] = useState(null);

  const simulate = () => {
    const blocks = parseBlocks(blocksInput);
    const size = Number(processSize);
    const validBlocks = blocks.length > 0 && blocks.every((block) => Number.isFinite(block) && block > 0);

    if (!validBlocks || !Number.isFinite(size) || size <= 0) {
      setResult({ status: "Invalid input", message: "Enter positive comma-separated memory blocks and a positive process size.", blocks: [] });
      return;
    }

    const allocated = findBlock(blocks, size, algorithm);
    if (!allocated) {
      setResult({ status: "Not allocated", message: "No memory block is large enough for this process.", blocks, processSize: size });
      return;
    }

    setResult({
      status: "Allocated",
      message: `Process allocated to Block ${allocated.index + 1}.`,
      blocks,
      processSize: size,
      allocatedIndex: allocated.index,
      remaining: allocated.size - size,
    });
  };

  const reset = () => {
    setBlocksInput("");
    setProcessSize("");
    setAlgorithm("First Fit");
    setResult(null);
  };

  return (
    <section className="module-page">
      <header className="module-page__header">
        <div>
          <span className="dashboard__kicker">Memory allocation</span>
          <h2>Memory Management</h2>
          <p>Allocate a process to the most suitable available memory block.</p>
        </div>
        <Link className="back-button" to="/">← Back to Dashboard</Link>
      </header>

      <div className="module-grid">
        <section className="module-card module-card--input">
          <h3>Input section</h3>
          <p>Configure the memory blocks and process size.</p>
          <label>
            Memory blocks
            <input value={blocksInput} onChange={(event) => setBlocksInput(event.target.value)} placeholder="Example: 100, 200, 300" />
          </label>
          <label>
            Process size
            <input type="number" min="1" value={processSize} onChange={(event) => setProcessSize(event.target.value)} placeholder="Example: 120" />
          </label>
          <label>
            Allocation strategy
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
          <h3>Memory map</h3>
          <p>Available memory blocks and allocation state.</p>
          <div className="placeholder-visual" aria-label="Memory map visualization" aria-live="polite" style={{ flexWrap: "wrap" }}>
            {result?.blocks?.map((block, index) => {
              const isAllocated = index === result.allocatedIndex;
              const memoryLeft = isAllocated ? result.remaining : block;
              return (
                <div
                  key={`${block}-${index}`}
                  title={`Block ${index + 1}: ${isAllocated ? "Allocated" : "Free"}`}
                  style={{
                    alignSelf: "stretch",
                    background: isAllocated ? "var(--primary)" : "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    color: isAllocated ? "#ffffff" : "var(--text)",
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    fontSize: "11px",
                    gap: "5px",
                    justifyContent: "center",
                    minWidth: "105px",
                    padding: "10px",
                  }}
                >
                  <strong>Block {index + 1}</strong>
                  <div>Original: {block}</div>
                  <div>Remaining: {memoryLeft}</div>
                  <div>{isAllocated ? "Allocated" : "Free"}</div>
                </div>
              );
            })}
          </div>
          {result?.blocks?.length > 0 && <small>{result.status === "Allocated" ? `Block ${result.allocatedIndex + 1}: ${result.remaining} units remaining` : result.message}</small>}
        </section>
      </div>

      <section className="module-card module-card--output">
        <h3>Output section</h3>
        {result && <div className="output-placeholder">
          <strong>Allocation status: {result.status}</strong>
          <span>{result.message}</span>
          {result.status === "Allocated" && <span>Allocated block: Block {result.allocatedIndex + 1} · Remaining memory: {result.remaining} units</span>}
        </div>}
      </section>
    </section>
  );
}

export default MemoryAllocation;
