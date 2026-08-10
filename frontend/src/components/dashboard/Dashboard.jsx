import { algorithms } from "../../data/algorithms";
import AlgorithmCard from "./AlgorithmCard";

function Dashboard() {
  return (
    <section className="dashboard">
      <div className="dashboard__header">
        <div>
          <span className="dashboard__kicker">Simulation Workspace</span>
          <h2>Choose an OS algorithm to simulate</h2>
          <p>
            Explore core operating system concepts through focused, visual modules designed for quick learning.
          </p>
        </div>

        <div className="dashboard__summary" aria-label="Dashboard summary">
          <strong>{algorithms.length}</strong>
          <span>Algorithms Ready</span>
        </div>
      </div>

      <div className="dashboard__grid">
        {algorithms.map((algorithm) => (
          <AlgorithmCard key={algorithm.title} algorithm={algorithm} />
        ))}
      </div>
    </section>
  );
}

export default Dashboard;
