import { Outlet, Link} from "react-router-dom";
import Chat from './Chat'
import Logout from '../components/Logout'
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
            <Logout />
          </li>
        </ul>
      </nav>
      <div><Chat /></div>
      <Outlet />
     
    </>
  )
};

export default Layout;