import {useContext, useEffect, useState} from 'react';
import FileItemsOut from "./FileItemsOut";
import Card from "../../components/shared/Card"
import "./outgoingFiles.scss";
import { AuthContext } from '../../store/Auth-context';
import LoadingSpinner from "../../components/shared/LoadingSpinner"


const OutgoingFiles = props =>{
   
  const [error, setError] = useState();
  const [loadedFiles, setLoadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const Auth = useContext(AuthContext);
   
 useEffect(()=>{
   const sendRequest =  async ()=>{
     setLoading(true);
     try{
       const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/outgoingfiles/${Auth.officeOfStaff}`);
       const responseData = await response.json();
       if(!response.ok){
         throw new Error(responseData.message);
       }
       setLoadedFiles(responseData.files);
     }catch(err){
       setError(err.message);
     }
     setLoading(false);
     
   }
   sendRequest();
 },[Auth.officeOfStaff]);

return (  
<div className="outgoingFiles">
{loading && <LoadingSpinner/>}
<Card>
{loadedFiles.length === 0 && <p>No Outgoing Files</p>}
  <div className="tabledivIn">
<table>
 <thead>
   <td>File Ref</td>
   <td>Subject Matter</td>
   <td>Purpose</td>
   <td>Beneficiary</td>
   <td>Destination office</td>
   <td>Date of dispatch</td>
 </thead>
 <tbody>
 {error && <tr><td colspan="6"> {error}</td></tr>}
{loadedFiles.map(file=>{
  return <FileItemsOut
    key={file._id}
    fileRef = {file.fileRef}
    subMatter = {file.subMatter}
    purpose = {file.purpose}
    beneficiary = {file.beneficiary}
    to = {file.to}
    currentDate = {file.currentDate}
  />
})}
</tbody>
</table>
</div>
</Card>
</div>
)
}

export default OutgoingFiles;