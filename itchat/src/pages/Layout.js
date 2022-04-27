import { Outlet, Link} from "react-router-dom";
import Chat from './Chat'
import Logout from '../components/Logout'

import Layout_styl from '../styles/Layout_style.css'
const Layout = () => {
  return (
    <>
    <main>
      <div>
        <div className="Layout__button"><Logout /></div>
        <div className="Layout__title"><h1>iT - Chat</h1></div>
      </div>
      <Chat />
    </main>
      <Outlet />
     
    </>
  )
};

export default Layout;