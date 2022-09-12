import {useState,Fragment,useContext} from 'react';
import { NavLink,useHistory } from 'react-router-dom';
import SideDrawer from '../components/shared/SideDrawer';
import {AuthContext} from '../store/Auth-context';
import Login from "./Login"
import './Navbar.scss';
import img1 from '../Resources/HMPRESS.jpg';

const Navbar = (props)=>{
  const Auth = useContext(AuthContext);
  const pageHistory = useHistory();
  const[iscrolled, setiscrolled] = useState(false)
  window.onscroll = ()=>{
    setiscrolled(window.pageYOffset === 0 ? false : true);
    return ()=>(window.onscroll = null);
  }
  const [drawerisOpen, setDrawerisOpen] = useState(false);

  const [modalisOpen, setModalisOpen] = useState(false);
  const openModalHandler = ()=>{
    setModalisOpen(true);
  }
  const closeModalHandler = ()=>{
    setModalisOpen(false);
  }


  const drawerOpenHandler = ()=>{
  setDrawerisOpen(true);
  }
  const drawerCloseHandler = ()=>{
    setDrawerisOpen(false);
    }

    const logoutHandler = ()=>{
      Auth.logout();
      pageHistory.push("/")
    }

return (
  <Fragment>
   {modalisOpen && <Login closeModal={closeModalHandler}/>}
   {drawerisOpen && <SideDrawer show={drawerisOpen} onClick={drawerCloseHandler}>
  <nav className="main-navigation__drawer-nav" >
  <ul>
      <l1>
        <img src={img1} alt="header"/>
        </l1>
        {Auth.isLoggedIn && <li>
         <NavLink to="/" exact>Home</NavLink>
       </li>}
       {Auth.isLoggedIn && <li>
         <NavLink to="/availablefiles" exact>Available Files</NavLink>
       </li>}
       {Auth.isLoggedIn && <li>
         <NavLink to="/incomingfiles" exact>All incomings</NavLink>
       </li>}
       {Auth.isLoggedIn && <li>
         <NavLink to="/outgoingfiles" exact>All Outgoings</NavLink>
       </li>}
       {Auth.isLoggedIn && Auth.officeOfStaff.toString() === "DFA" && <li>
         <NavLink to="/registerfile" exact>Register New File</NavLink>
       </li>}
       {Auth.isLoggedIn && Auth.officeOfStaff.toString() === "DFA" && <li>
         <NavLink to="/registerstaff" exact>Register Staff</NavLink>
       </li>}
       {Auth.isLoggedIn && Auth.officeOfStaff.toString() === "DFA" && <li>
         <NavLink to="/viewstaffs" exact>View Staffs</NavLink>
       </li>}
       {Auth.isLoggedIn && <li><button onClick = {logoutHandler}>Logout</button></li>}
       {!Auth.isLoggedIn && <li><button onClick={openModalHandler}>Login</button></li>}
       </ul>
    </nav>
   </SideDrawer>}
  <div className={iscrolled ? "navbar scrolled" : "navbar"}>
  <div className="container">
  <div className="left">
  <img src={img1} alt="header"/>
  </div>
  <nav className="right" >
  <ul>
  <li>
  {Auth.isLoggedIn && <NavLink to="/" exact>Home</NavLink>}
       </li>
       {Auth.isLoggedIn && <li>
         <NavLink to="/availablefiles" exact>Available Files</NavLink>
       </li>}
       {Auth.isLoggedIn && <li>
         <NavLink to="/incomingfiles" exact>All incomings</NavLink>
       </li>}
       {Auth.isLoggedIn && <li>
         <NavLink to="/outgoingfiles" exact>All Outgoings</NavLink>
       </li>}
       {Auth.isLoggedIn &&  Auth.officeOfStaff.toString() === "DFA" &&<li>
         <NavLink to="/registerfile" exact>Register New File</NavLink>
       </li>}
       {Auth.isLoggedIn && Auth.officeOfStaff.toString() === "DFA" && <li>
         <NavLink to="/registerstaff" exact>Register Staff</NavLink>
       </li>}
       {Auth.isLoggedIn && Auth.officeOfStaff.toString() === "DFA" && <li>
         <NavLink to="/viewstaffs" exact>View Staffs</NavLink>
       </li>}
       {Auth.isLoggedIn && <li><button onClick = {logoutHandler}>Logout</button></li>}
       {!Auth.isLoggedIn && <li><button onClick={openModalHandler}>Login</button></li>}
       </ul>
    </nav>
    
    <button className="main-navigation__menu-btn" onClick={drawerOpenHandler} >
        <span />
        <span />
        <span />
      </button>
      </div>
  </div>
  </Fragment>
)
}
export default Navbar;