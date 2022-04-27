import { Outlet, Link} from "react-router-dom";
import Chat from './Chat'
import Logout from '../components/Logout'

import Layout_styl from '../styles/Layout_styl.css'
const Layout = () => {
  return (
    <>

    <h1>iT - Chat</h1>
      <nav className="menu">
        <ul>
          <li>
            <Link to="/">Chat</Link>
          </li>
          <li>
            <Logout />
          </li>
        </ul>
      </nav>
      <div> <Chat /></div>
      <Outlet />
     
    </>
  )
};

export default Layout;