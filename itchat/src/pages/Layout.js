import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
    
    <h1>iT - Chat</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Chat</Link>
          </li>
          <li>
            <Link to="/myaccount">Mi cuenta</Link>
          </li>
          <li>
            <Link to="/logout">Salir</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;