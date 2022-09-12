

const FileItemSearch = (props)=>{

  return(
  <tr>
  <td>The File Ref:<span>{props.fileRef}</span></td> 
  <td>with Subject Matter: <span>{props.subMatter}</span></td>
  <td>Is currently at :<span> {props.currentOffice}.</span></td>
  <td>Beneficiary name:<span> {props.beneficiary}</span></td>
  <td>Payment Status:<span> {props.paymentStatus}</span></td>    
</tr>
  )
}
export default FileItemSearch;