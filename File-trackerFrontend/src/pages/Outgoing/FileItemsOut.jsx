import "./fileItemsout.scss"
import {Fragment} from 'react';
const FileItemsOut = (props)=>{
  return <Fragment> 
  <tr>
  <td>{props.fileRef}</td> 
  <td>{props.subMatter}</td>
  <td>{props.purpose}</td>
  <td>{props.beneficiary}</td> 
  <td>{props.to}</td> 
  <td>{props.currentDate}</td>
</tr>
</Fragment>
 }
 
 export default FileItemsOut;