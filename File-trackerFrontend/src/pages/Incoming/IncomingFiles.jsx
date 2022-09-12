import {useContext, useEffect, useState} from 'react';
import FileItems from "./FileItems";
import Card from "../../components/shared/Card"
import { AuthContext } from '../../store/Auth-context';
import "./incomingFiles.scss";
import LoadingSpinner from "../../components/shared/LoadingSpinner"

const IncomingFiles = props =>{
  const [error, setError] = useState();
   const [loadedFiles, setLoadedFiles] = useState([]);
   const [loading, setLoading] = useState(false);
   const Auth = useContext(AuthContext);
    
  useEffect(()=>{
    const sendRequest =  async ()=>{
      setLoading(true);
      try{
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/incomingfiles/${Auth.officeOfStaff}`);
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
<div className="incomingFiles">
 {loading && <LoadingSpinner/>}
 <Card>
   <div className="tabledivIn">
<table>
  <thead>
    <td>File Ref</td>
    <td>Subject Matter</td>
    <td>Purpose</td>
    <td>Beneficiary</td>
    <td>Office From</td>
    <td>Date Accepted</td>
    <td>Received By</td> 
  </thead>
  <tbody>
  {error && <tr><td colspan="6"> {error}</td></tr>}
{loadedFiles.map(file=>{
   return <FileItems
     key={file._id}
     fileRef = {file.fileRef}
     subMatter = {file.subMatter}
     purpose = {file.purpose}
     beneficiary = {file.beneficiary}
     from = {file.from}
     currentDate = {file.currentDate}
     acceptedBy = {file.acceptedBy}
   />
 })}
 </tbody>
</table>
</div>
</Card>
</div>
 )
}

export default IncomingFiles;