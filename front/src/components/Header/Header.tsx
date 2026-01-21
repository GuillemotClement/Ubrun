import {Link} from "@tanstack/react-router";

export default function Header(){
  return <header className="flex items-center justify-between shadow py-4 px-5">
    <div className="">
      <p>UbRun</p>
    </div>

    <ul>
      <li>
        <Link to="/tools">Outils</Link>
      </li>
    </ul>


    <div className="flex gap-x-3">
      <li className="btn">
        <Link to="/">Acceuil</Link>
      </li>
      <li className="btn">
        <Link to="/tools">Outils</Link>
      </li>
    </div>
  </header>
}