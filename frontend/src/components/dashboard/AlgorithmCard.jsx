import { Link } from "react-router-dom";

function AlgorithmCard({ algorithm }) {
  const Icon = algorithm.icon;

  return (
    <article className="algorithm-card">
      <div className="algorithm-card__top">
        <div className="algorithm-card__icon" aria-hidden="true">
          <Icon />
        </div>
        <span className="algorithm-card__tag">{algorithm.tag}</span>
      </div>

      <div>
        <h3>{algorithm.title}</h3>
        <p>{algorithm.description}</p>
      </div>

      <Link className="algorithm-card__button" to={algorithm.href}>
        Start Simulation
        <span aria-hidden="true">{"->"}</span>
      </Link>
    </article>
  );
}

export default AlgorithmCard;
