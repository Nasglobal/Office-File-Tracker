import {useState,useEffect,useContext} from 'react';
import AwaitingFilesItem from "./AwaitingFilesItem";
import Card from "../../components/shared/Card";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import { AuthContext } from '../../store/Auth-context';
import "./awaitingFiles.scss";


const AwaitingFiles = props =>{

  const [loadedFiles, setLoadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const Auth = useContext(AuthContext);
   
  const loadedDataH = (loadedeFiles)=>{
    setLoadedFiles(loadedeFiles);
   }
  useEffect(()=>{
    const sendRequest =  async ()=>{
      setLoading(true);
      try{
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/awaitingfiles/${Auth.officeOfStaff}`);
        const responseData = await response.json();
        if(!response.ok){
          throw new Error(responseData.message);
        }
        setLoadedFiles(responseData.files);
      }catch(err){
        //setError(err.message);
      }
      setLoading(false);
      
    }
    sendRequest();
  },[]);
  
 
 return (
  <div className="awaitingfiles">
  {loadedFiles.length !== 0 &&
      <Card>
        {loading && <LoadingSpinner/>}
        <div className="tablediv">
     <table>
       <thead>
         <td colSpan="7">you Have <button className="red">{loadedFiles.length}</button> Incoming File{loadedFiles.length > 1 && <span>s</span>}</td>
       </thead>
       <tbody>
       <tr>
          <td className="theading">FileRef</td> 
          <td className="theading">Subject Matter</td>
          <td className="theading">Purpose</td>
          <td className="theading">Beneficiary</td> 
          <td className="theading">Office From</td> 
      <td className="theading" colSpan="2">Actions</td>  
      </tr>  
     {loadedFiles.map(file=>{
        return <AwaitingFilesItem
          key={file._id}
          id = {file._id}
          fileRef = {file.fileRef}
          subMatter = {file.subMatter}
          purpose = {file.purpose}
          beneficiary = {file.beneficiary}
          currentOffice = {file.currentOffice}
          loadedData = {loadedDataH}
        />
      })}
      </tbody>
     </table>
     </div>
     </Card>
  }
     </div>
 )
}

export default AwaitingFiles;