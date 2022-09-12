import {useState,Fragment,useContext} from 'react';
import "./awaitingFiles.scss"
import LoadingSpinner from "../../components/shared/LoadingSpinner"
import Modal from "../../components/shared/Modal"
import { AuthContext } from '../../store/Auth-context';
import './AwaitingFilesItem.scss'


const AwaitingFilesItem = (props)=>{
       const [nerror, setnError] = useState();
       const [loadin, setLoadin] = useState(false);
       const Auth = useContext(AuthContext);

       const errormodalcloseHndler = ()=>{
        setnError();
      }

     const acceptFileHandler =  async()=>{
        setLoadin(true);
        const currentOffice = Auth.officeOfStaff;
        const pendingDestination = "none"
        if(currentOffice.trim().length === 0 || pendingDestination.trim().length === 0 ){
           setnError("OOPS....No current office destination found");
          setLoadin(false);
          return;
         }
         let responseFile;
         try{
           const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/acceptfile/${props.id}`,{
             method:"PATCH",
             headers:{
               'Content-Type':'application/json'
             },
             body: JSON.stringify({
              currentOffice:currentOffice,
              pendingDestination:pendingDestination,
              loggedinUser:Auth.loggedinUser
             })
            });
           responseFile = await response.json();
           const newResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/awaitingfiles/${Auth.officeOfStaff}`);
            const responseData = await newResponse.json();
           props.loadedData(responseData.files)
           setLoadin(false);
           if(!response.ok){
            setnError(responseFile.message);
             setLoadin(false);
             throw new Error(responseFile.message);
             }
          
         }catch(err){
          setLoadin(false);
           setnError("OOPS.......sorry something went wrong"); 
         }
       
      }
      const rejectFileHandler =  async()=>{
        setLoadin(true);
         let responseFile;
         try{
           const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/rejectfile/${props.id}`,{
             method:"PATCH",
             headers:{
               'Content-Type':'application/json'
             },
            });
           responseFile = await response.json();
           const newResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/awaitingfiles/${Auth.officeOfStaff}`);
            const responseData = await newResponse.json();
           props.loadedData(responseData.files)
           setLoadin(false);
           if(!response.ok){
            setnError(responseFile.message);
             setLoadin(false);
             throw new Error(responseFile.message);
             }
          
         }catch(err){
          setLoadin(false);
           setnError("OOPS.......sorry something went wrong"); 
         }
       
      }
  return ( 
       <Fragment> 
          {loadin && <LoadingSpinner/>}
           {nerror && <Modal onClick={errormodalcloseHndler}><div className="errorMessage"><h4>{nerror}</h4><button onClick={errormodalcloseHndler}>closex</button></div></Modal>}
        <tr>
          <td>{props.fileRef}</td> 
          <td>{props.subMatter}</td>
          <td>{props.purpose}</td>
          <td>{props.beneficiary}</td> 
          <td>{props.currentOffice}</td> 
      <td><button className="accept" onClick={acceptFileHandler}>Accept File</button></td>  
      <td><button className="reject" onClick={rejectFileHandler}>Reject File</button></td>
      </tr>
     </Fragment>
  )

  }
 export default AwaitingFilesItem;