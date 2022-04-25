import { Outlet, Link, Routes} from "react-router-dom";
import Chat from './Chat'
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
            <Link to="/logout">Salir</Link>
          </li>
        </ul>
      </nav>
      <div><Chat /></div>
      <Outlet />
     
    </>
  )
};

export default Layout;