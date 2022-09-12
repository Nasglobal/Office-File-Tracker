import {Fragment,useRef,useState,useContext} from 'react';
import {Link} from 'react-router-dom';
import "./fileitemAval.scss"
import LoadingSpinner from "../../components/shared/LoadingSpinner"
import Modal from "../../components/shared/Modal"
import EditIcon from '@mui/icons-material/Edit';
import {AuthContext} from "../../store/Auth-context";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const FileItemsAval = (props)=>{
      const [nerror, setnError] = useState();
      const [loadin, setLoadin] = useState(false);
      const [updating, setupdating] = useState(false);
      const [showUpdate, setShowUpdate] = useState(false);
      const Auth = useContext(AuthContext);

      
      const fileREfInputRef = useRef();
      const filesubmatterInputRef = useRef();
      const filePurposeInputRef = useRef();
      const fileFromInputRef = useRef();
      const fileBeneficiaryInputRef = useRef();
      const destinationOfficeInputRef = useRef();

  const errormodalcloseHndler = ()=>{
    setnError();
  }
  const closeEditModal = ()=>{
    setShowUpdate(false);
    setupdating(false);
  }
  const clickUdateToOpen = ()=>{
    setShowUpdate(true);
  }
  const sendFilesHandler=  async(e)=>{
    e.preventDefault();
    setLoadin(true);
    const destinationOfficeInput = destinationOfficeInputRef.current.value;
    if(destinationOfficeInput.trim().length === 0){
       setnError("OOPS....Please select office to send file to");
      setLoadin(false);
      return;
     }
     let responseFile;
     try{
       const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sendfile/${props.id}`,{
         method:"PATCH",
         headers:{
           'Content-Type':'application/json'
         },
         body: JSON.stringify({
          pendingDestination:destinationOfficeInput,
         })
        });
       responseFile = await response.json();
       setLoadin(false);
       if(!response.ok){
        setnError(responseFile.message);
         setLoadin(false);
         throw new Error(responseFile.message);
         }
         const allFilesFetch = await fetch(`${process.env.REACT_APP_BACKEND_URL}/availableFiles/${Auth.officeOfStaff}`);
         const responseData = await allFilesFetch.json();
         props.loadedData(responseData.files);
     }catch(err){
      setLoadin(false);
       setnError("OOPS.......sorry something went wrong"); 
     }
   
  }
  const updateFileHandler = async (event)=>{
    event.preventDefault();
    setupdating(true);
   const entererdFileRef = fileREfInputRef.current.value;
   const enteredPurpose = filePurposeInputRef.current.value;
   const entererdSubMatter = filesubmatterInputRef.current.value;
   const entererdFileFrom = fileFromInputRef.current.value;
   const entererdFileBeneficiary = fileBeneficiaryInputRef.current.value;

   if(entererdFileRef.trim().length === 0 || entererdSubMatter.trim().length === 0 ||
   enteredPurpose.trim().length === 0 ||
    entererdFileFrom.trim().length === 0 || entererdFileBeneficiary.trim().length === 0){
      setnError("OOPS....Please fill in all field");
     setupdating(false);
     return;
     
    }
    let responseFile;
    try{
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/update/${props.id}`,{
        method:"PATCH",
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          fileRef:entererdFileRef,
          subMatter: entererdSubMatter,
          purpose: enteredPurpose,
          from:entererdFileFrom,
          beneficiary:entererdFileBeneficiary
        })
       });
      responseFile = await response.json();

     
      if(!response.ok){
        setnError(responseFile.message);
        setupdating(false);
        throw new Error(responseFile.message);
        }
      const allFilesFetch = await fetch(`${process.env.REACT_APP_BACKEND_URL}/availableFiles/${Auth.officeOfStaff}`);
      const responseData = await allFilesFetch.json();
      props.loadedData(responseData.files);
     setShowUpdate(false);
     setupdating(false);
    }catch(err){
      setnError("OOPS.......sorry something went wrong");
      setupdating(false);
    }
  }
    const deleteFileHandler = async () =>{
        setLoadin(true);
            try{
              const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}delete/${props.id}`,{
              method:"DELETE"});
              const resonsedata = await response.json();
                if(!response.ok){
              setnError(resonsedata.message);
              setLoadin(false);
                }
              props.onDelete(props.id);
               setLoadin(false);
            }catch(err){
               setnError(err.message+  "....cannot delete file");
              setLoadin(false);
            }
    }

  return (
       <Fragment> 
           {loadin && <LoadingSpinner/>}
           {nerror && <Modal onClick={errormodalcloseHndler}><div className="errorMessage"><h4>{nerror}</h4><button onClick={errormodalcloseHndler}>closex</button></div></Modal> }
        
        <tr>
          <td>{props.fileRef}</td> 
          <td>{props.subMatter}</td>
          <td>{props.purpose}</td>
          <td>{props.beneficiary}</td> 
          <td>{props.from}</td> 
     <td> 
     <form onSubmit={sendFilesHandler}>
      <select ref={destinationOfficeInputRef}>
        <option  value="">Select Office</option>
        <option  value="INTERNAL AUDIT">INTERNAL AUDIT</option>
        <option value="PERM SEC">PERM SEC</option>
        <option value="CPO">CPO</option>
        <option value="REGISTRY">REGISTRY</option>
        <option value="CHECKING">CHECKING</option>
        <option value="DD ACCOUNT">DD ACCOUNT</option>
        <option value="DFA">DFA</option>
        <option value="EXP 2ND FLOOR">EXP 2ND FLOOR</option>
        <option value="EXP 4TH FLOOR">EXP 4TH FLOOR</option>
        <option value="HUMAN RESOURCE">HUMAN RESOURCE</option>
        <option value="DD BUDGET">DD BUDGET</option>
        <option value="AD REVENUE MOBILIZATION">AD REVENUE MOBILIZATION</option>
        <option value="AD AID AND GRANTS">AD AID AND GRANTS</option>
        <option value="AD FINAL AND FISCAL ACCOUNTS">AD FINAL AND FISCAL ACCOUNTS</option>
        <option value="AD ASSETS MGT AND ACCOUNTING">AD ASSETS MGT AND ACCOUNTING</option>
      </select>
      <button>Send</button>
      </form></td> 
      {Auth.officeOfStaff.toString() === "DFA" && <td><Link className="editbutton" onClick={clickUdateToOpen}>Edit<EditIcon/></Link></td>
    }
    {Auth.officeOfStaff.toString() === "DFA" &&
    <td><button className="deleteBtn" onClick={deleteFileHandler}><DeleteForeverIcon/></button></td> 
    }  
  </tr>
  {showUpdate && <Modal onClick={closeEditModal}>
  <form onSubmit={updateFileHandler} className="formEdit">
  <h2>Update file</h2>
    <input placeholder="Enter Ref" defaultValue={props.fileRef} ref={fileREfInputRef} type="text"/>
    <textarea placeholder="Subject Matter" rows="2" cols="33" defaultValue={props.subMatter}  ref={filesubmatterInputRef}></textarea>
    <textarea placeholder="Purpose" rows="2" cols="33" defaultValue={props.purpose}  ref={filePurposeInputRef}></textarea>
    <select ref={fileFromInputRef}>
      <option Value={props.from}>{props.from}</option>
      <option  value="INTERNAL AUDIT">INTERNAL AUDIT</option>
        <option value="PERM SEC">PERM SEC</option>
        <option value="CPO">CPO</option>
        <option value="REGISTRY">REGISTRY</option>
        <option value="CHECKING">CHECKING</option>
        <option value="DD ACCOUNT">DD ACCOUNT</option>
        <option value="DFA">DFA</option>
        <option value="EXP 2ND FLOOR">EXP 2ND FLOOR</option>
        <option value="EXP 4TH FLOOR">EXP 4TH FLOOR</option>
        <option value="HUMAN RESOURCE">HUMAN RESOURCE</option>
        <option value="DD BUDGET">DD BUDGET</option>
        <option value="AD REVENUE MOBILIZATION">AD REVENUE MOBILIZATION</option>
        <option value="AD AID AND GRANTS">AD AID AND GRANTS</option>
        <option value="AD FINAL AND FISCAL ACCOUNTS">AD FINAL AND FISCAL ACCOUNTS</option>
        <option value="AD ASSETS MGT AND ACCOUNTING">AD ASSETS MGT AND ACCOUNTING</option>
      </select>
    <input placeholder="Beneficiary" defaultValue={props.beneficiary} ref={fileBeneficiaryInputRef} type="text"/>
    <button>{updating ? "Updating ......" : "Update File"}</button>
    </form>
  </Modal>}
  </Fragment>)
 }
 
 export default FileItemsAval;