import {useState,useEffect,useContext} from 'react';
import FileItemsAval from "./FileItemsAval";
import Card from "../../components/shared/Card";
import { AuthContext } from '../../store/Auth-context';
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import "./availablefiles.scss";



const Availablefiles = props =>{

  const [error, setError] = useState();
  const [loadedFiles, setLoadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const Auth = useContext(AuthContext);

   const deleteFileH = (deleteId) =>{
      setLoadedFiles(prevFiles => prevFiles.filter(file => file.id!== deleteId))
 }
 const loadedDataHandler = (loadedeFiles)=>{
  setLoadedFiles(loadedeFiles);
 }

  useEffect(()=>{
    const sendRequest =  async ()=>{
      setLoading(true);
      try{
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/availableFiles/${Auth.officeOfStaff}`);
        const responseData = await response.json();
        if(!response.ok){
          throw new Error(responseData.message);
        }
        setLoadedFiles(responseData.files);
      }catch(err){
        setError(err.message + " check internet connection");
      }
      setLoading(false);
      
    }
    sendRequest();
  },[Auth.officeOfStaff]);
  
 
 return (
    
      <div className="availablefiles">
      {loading && <LoadingSpinner/>}
    
      <Card>
        {loadedFiles.length === 0 && <p>No Available Files</p>}
        <div className="tablediv">
     <table>
       <thead>
         <td>File Ref</td>
         <td>Subject Matter</td>
         <td>Purpose</td>
         <td>Beneficiary</td>
         <td>Office From</td>
         <td>Send</td>
         {Auth.officeOfStaff.toString() === "DFA" &&<td>Actions </td>}
         {Auth.officeOfStaff.toString() === "DFA" && <td>Delete File</td>}
         
       </thead>
       <tbody>
         {error && <tr><td colspan="7"> {error}</td></tr>}
         
     {loadedFiles.map(file=>{
        return <FileItemsAval
          key={file._id}
          id = {file._id}
          fileRef = {file.fileRef}
          subMatter = {file.subMatter}
          purpose = {file.purpose}
          beneficiary = {file.beneficiary}
          from = {file.from}
          paymentStatus = {file.paymentStatus}
          onDelete = {deleteFileH}
          loadedData = {loadedDataHandler}
        />
      })}
      </tbody>
     </table>
     </div>
     </Card>
     </div>
 )
}

export default Availablefiles;