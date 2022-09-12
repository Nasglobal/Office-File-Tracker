import {Fragment} from 'react';
import "./fileItems.scss"
const FileItems = (props)=>{
  return <Fragment> 
  <tr>
  <td>{props.fileRef}</td> 
  <td>{props.subMatter}</td>
  <td>{props.purpose}</td>
  <td>{props.beneficiary}</td> 
  <td>{props.from}</td> 
  <td>{props.currentDate}</td>
  <td>{props.acceptedBy}</td>
</tr>
</Fragment>
 }
 
 export default FileItems;