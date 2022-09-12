import React from 'react';
import ReactDom from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import Backdrop from './Backdrop/Backdrop'

import './sideDrawer.scss';

const SideDrawer = props =>{
  const content = (<CSSTransition 
    in={props.show}
    timeout={200} 
    classNames="slide-in-left-enter" 
    mountOnEnter
    unmountOnExit
    >
    <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>
    </CSSTransition>);

  return <React.Fragment>
      <Backdrop onClick={props.onClick}/>
      {ReactDom.createPortal(content,document.getElementById("drawer-hook"))}
  </React.Fragment>

}; 
export default SideDrawer;