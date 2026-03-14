import { Link } from "@tanstack/react-router";
import logo from "../../assets/logo.svg";

export default function Header() {
  return (
    <header className="navbar bg-base-100 shadow-sm">
      <Link to={"/"} className="navbar-start">
        <img src={logo} alt="logo" className="w-12 auto" />
      </Link>
      <div className="navbar-center">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/tools">Outils</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal px-1">
          <li className="btn btn-primary">
            <Link to="/auth/login">Connexion</Link>
          </li>
          <li className="btn btn-neutral">
            <Link to="/auth/register">Inscription</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
