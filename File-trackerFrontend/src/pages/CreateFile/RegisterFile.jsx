import {useRef, useState,useContext} from 'react';
import Footer from "../../components/Footer";
import Card from "../../components/shared/Card"
import LoadingSpinner from "../../components/shared/LoadingSpinner"
import Modal from "../../components/shared/Modal"
import { AuthContext } from '../../store/Auth-context';
import "./registerFile.scss";


 const RegisterFile = ()=>{
     
   //const fileCtx = useContext(FileContext);
   const [error, setError] = useState(true);
   const [errorMessage, seterrorMessage] = useState("");
   const [successM, setSuccessM] = useState("");
   const [loading, setLoading] = useState(false);
   const Auth = useContext(AuthContext);
   
   const errormodalcloseHndler = ()=>{
    setError(true);
  }
  const successmodalcloseHndler = ()=>{
    setSuccessM("");
  }

  const  dateFunction  = ()=> {
    var myCurrentDate = new Date();
    var date = myCurrentDate.getFullYear() + '-' + (myCurrentDate.getMonth()+1) + '-' + myCurrentDate.getDate() +' '+ myCurrentDate.getHours()+':'+ myCurrentDate.getMinutes()+':'+ myCurrentDate.getSeconds();
    const newCurrentDate = date;
    return newCurrentDate.toString();
  }
   

   const fileREfInputRef = useRef();
   const filesubmatterInputRef = useRef();
   const filePurposeInputRef = useRef();
   const fileFromInputRef = useRef();
   const fileBeneficiaryInputRef = useRef();

   const formSubmitHandler = async (event)=>{
     event.preventDefault();
      setLoading(true);
     const entererdFileRef = fileREfInputRef.current.value;
     const entererdSubMatter = filesubmatterInputRef.current.value;
     const enteredPurpose = filePurposeInputRef.current.value;
     const entererdFileFrom = fileFromInputRef.current.value;
     const entererdFileBeneficiary = fileBeneficiaryInputRef.current.value;

     if(entererdFileRef.trim().length === 0 || entererdSubMatter.trim().length === 0 || 
     enteredPurpose.trim().length === 0 ||
      entererdFileFrom.trim().length === 0 || entererdFileBeneficiary.trim().length === 0){
        seterrorMessage("OOPS....Please fill in all field");
       setError(false);
       setLoading(false);
       return;
       
      }
      let responseFile;
      try{
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/registerfile`,{
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            fileRef:entererdFileRef,
            subMatter: entererdSubMatter,
            purpose: enteredPurpose,
            currentOffice:"DFA",
            from:entererdFileFrom,
            beneficiary:entererdFileBeneficiary,
            currentDate:dateFunction(),
            paymentStatus:"pending",
            pendingDestination:"none",
            loggedinUser:Auth.loggedinUser
          })
         });
        responseFile = await response.json();

        if(!response.ok){
        seterrorMessage(responseFile.message);
        setError(false);
        setLoading(false);
        throw new Error(responseFile.message);
        }

        setSuccessM("File Entered Successfully...");
        fileREfInputRef.current.value = "";
        filePurposeInputRef.current.value = "";
        filesubmatterInputRef.current.value = "";
        fileFromInputRef.current.value = "";
        fileBeneficiaryInputRef.current.value = "";
        setLoading(false);
      }catch(err){
        seterrorMessage(err.message);
        setError(false);
        setLoading(false);
      }
   }
 return (
   <div>
      
      <div className="registerFile">
      <Card>
      <h2>Enter new file</h2>
        {!error && <Modal onClick={errormodalcloseHndler}><div className="errorMessage"><h4 >{errorMessage}</h4><button onClick={errormodalcloseHndler}>closex</button></div></Modal> } 
        {loading && <LoadingSpinner/>}
        {successM !== "" && <Modal onClick={successmodalcloseHndler}><div className="successMessage"><h4>{successM}</h4><button onClick={successmodalcloseHndler}>closex</button></div></Modal>}
      <form onSubmit={formSubmitHandler}>
     
    <input placeholder="Enter Ref" ref={fileREfInputRef} type="text"/>
    <textarea placeholder="Subject Matter" rows="2" cols="33"  ref={filesubmatterInputRef}></textarea>
    <textarea placeholder="Purpose" rows="2" cols="33"  ref={filePurposeInputRef}></textarea>
    <select ref={fileFromInputRef}>
      <option value="">Office File Is from</option>
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
    <input placeholder="Beneficiary" ref={fileBeneficiaryInputRef} type="text"/>
    <button>Register</button>
    </form>
     </Card>
     </div>
     <Footer/>

   </div>
 );

 }
  
     
 
 


export default RegisterFile;