import {Fragment} from 'react'
import ReactDom from 'react-dom';
import Backdrop from './Backdrop/Backdrop'
import './Modal.scss';




const ModalOverlay = props =>{
  return <div className="modal">
    <div className="content">{props.children}</div>
  </div>
}
 const portalElement = document.getElementById("overlays");
const Modal = (props)=>{
  return (
   <Fragment>
     <Backdrop onClick={props.onClick}/>
     {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
   </Fragment>
  )
}
export default Modal;