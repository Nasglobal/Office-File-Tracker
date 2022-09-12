import {createContext} from 'react';

export const AuthContext = createContext({
  isLoggedIn:false,
  loggedinUser:null,
  officeOfStaff:null,
  login: () => {},
  logout: () => {}
});

