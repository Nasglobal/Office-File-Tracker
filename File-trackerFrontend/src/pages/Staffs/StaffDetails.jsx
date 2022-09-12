import './staffDetails.scss';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const StaffDetails = (props)=>{
return(
  <tr>
    <td><h3>{props.name}</h3></td>
    <td><h3>{props.email}</h3></td>
    <td><h3>{props.office}</h3></td>
    <td><button className="edit">Edit<EditIcon/></button></td>
    <td><button className="delete">Delete<DeleteForeverIcon/></button></td>
  </tr>
)
}
export default StaffDetails;