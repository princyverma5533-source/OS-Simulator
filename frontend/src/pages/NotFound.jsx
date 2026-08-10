import { Link } from "react-router-dom";

function NotFound() {
  return <section className="module-page"><span className="dashboard__kicker">404</span><h2>Page not found</h2><p>The page you requested does not exist.</p><Link className="navbar__button" to="/">Return to Dashboard</Link></section>;
}
export default NotFound;
