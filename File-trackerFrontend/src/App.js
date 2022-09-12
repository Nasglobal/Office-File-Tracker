import React, {useState, useCallback} from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import Home from './pages/home/Home';
import RegisterStaff from './pages/Staffs/RegisterStaff';
import ViewStaffs from './pages/Staffs/ViewStaffs';
import IncomingFiles from "./pages/Incoming/IncomingFiles";
import OutgoingFiles from "./pages/Outgoing/OutgoingFiles";
import Availablefiles from "./pages/AvailableFiles/Availablefiles"
import RegisterFile from "./pages/CreateFile/RegisterFile";
import {AuthContext} from "./store/Auth-context"
import './App.scss';
import Navbar from "./components/Navbar"

const App = () => {
  const[isLoggedIn, setIsLoggedIn] = useState(false);
  const[staffname,setStaff] = useState("");
  const[officeOfStaff,setofficeOfStaff] = useState("");

  const login = useCallback((staffN,staffOffice) => {
    setIsLoggedIn(true);
    setStaff(staffN);
    setofficeOfStaff(staffOffice)
  },[]);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  },[]);

  let routes;
  if(isLoggedIn){
    routes = (
      <React.Fragment>
        <Route path="/" exact>
        <Home />
        </Route>
      <Route path="/outgoingfiles" exact>
      <OutgoingFiles/>
      </Route>
      <Route path="/incomingfiles" exact>
      <IncomingFiles/>
      </Route>
      <Route path="/availablefiles" exact>
      <Availablefiles/>
      </Route>
      <Route path="/registerstaff" exact>
      <RegisterStaff/>
      </Route>
      <Route path="/viewstaffs" exact>
      <ViewStaffs/>
      </Route>
      <Route path="/registerfile" exact>
      <RegisterFile/>
      </Route>
      <Route path="*" >
        <Redirect to="/" exact/>
        </Route>
      </React.Fragment>
    )
  }
  else
  {
    routes = (
      <React.Fragment>
        <Route path="/" exact>
        <Home />
        </Route>
        <Route path="*" exact>
        <Redirect to="/" />
        </Route>
        </React.Fragment>
      )
  }
  return(
    <AuthContext.Provider value={{isLoggedIn:isLoggedIn, login:login, officeOfStaff:officeOfStaff, loggedinUser:staffname, logout:logout }} >
    <Navbar/>
    <main>
    <Switch>
    {routes}
    </Switch>
    </main>
    </AuthContext.Provider>
  )
};

export default App;
