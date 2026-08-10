import { Link } from "react-router-dom";
import { useState } from "react";

function ModulePage({ eyebrow, title, description, inputLabel, inputPlaceholder, selectLabel, selectOptions, visualizationLabel }) {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState(selectOptions[0]);
  const [simulated, setSimulated] = useState(false);

  const reset = () => {
    setInputValue("");
    setSelected(selectOptions[0]);
    setSimulated(false);
  };

  return (
    <section className="module-page">
      <header className="module-page__header">
        <div><span className="dashboard__kicker">{eyebrow}</span><h2>{title}</h2><p>{description}</p></div>
        <Link className="back-button" to="/">← Back to Dashboard</Link>
      </header>
      <div className="module-grid">
        <section className="module-card module-card--input">
          <h3>Input section</h3><p>Configure the simulation inputs.</p>
          <label>{inputLabel}<input value={inputValue} onChange={(event) => setInputValue(event.target.value)} placeholder={inputPlaceholder} /></label>
          <label>{selectLabel}<select value={selected} onChange={(event) => setSelected(event.target.value)}>{selectOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
          <div className="module-actions"><button type="button" onClick={() => setSimulated(true)}>Simulate</button><button className="button--secondary" type="button" onClick={reset}>Reset</button></div>
        </section>
        <section className="module-card module-card--visual">
          <h3>{visualizationLabel}</h3><p>Visualization area</p>
          <div className={`placeholder-visual ${simulated ? "placeholder-visual--active" : ""}`} aria-label={`${title} visualization placeholder`}>
            <span /><span /><span /><span /><span />
          </div>
          <small>{simulated ? `${selected} preview is ready.` : "Run a simulation to populate this view."}</small>
        </section>
      </div>
      <section className="module-card module-card--output">
        <h3>Output section</h3>
        <div className="output-placeholder"><strong>{simulated ? "Simulation preview ready" : "Awaiting simulation"}</strong><span>{simulated ? `Selected mode: ${selected}` : "Results and metrics will appear here."}</span></div>
      </section>
    </section>
  );
}

export default ModulePage;
