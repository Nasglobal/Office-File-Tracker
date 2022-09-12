import {useRef, useState} from 'react';
import Footer from "../../components/Footer";
import Card from "../../components/shared/Card"
import LoadingSpinner from "../../components/shared/LoadingSpinner"
import Modal from "../../components/shared/Modal"
import "./registerStaff.scss";


 const RegisterStaff = ()=>{
   const [error, setError] = useState(true);
   const [errorMessage,setErrormessage] = useState();
   const [successM, setSuccessM] = useState("");
   const [loading, setLoading] = useState(false);

  
   const errormodalcloseHndler = ()=>{
    setError(true);
  }
  const successmodalcloseHndler = ()=>{
    setSuccessM("");
  }
   

   const staffOfficeRef = useRef();
   const staffEmailInputRef = useRef();
   const staffNameRef = useRef();
   const staffPasswordRef = useRef();

   const formSubmitHandler = async (event)=>{
     event.preventDefault();
      setLoading(true);
     const entererdOffice = staffOfficeRef.current.value;
     const entererdEmail = staffEmailInputRef.current.value;
     const entererdName = staffNameRef.current.value;
     const entererdPassword = staffPasswordRef.current.value;

     if(entererdOffice.trim().length === 0 || entererdEmail.trim().length === 0 ||
     entererdName.trim().length === 0 || entererdPassword.trim().length === 0){
       setErrormessage("OPPS....Pls fill in all fields")
       setError(false);
       setLoading(false);
       return;
       
      }
     
          let responseData;
          try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/staffs/registerstaff`,{
              method:"POST",
              headers:{
                'Content-Type':'application/json'
              },
              body: JSON.stringify({
               name:entererdName,
               email: entererdEmail,
               office:entererdOffice,
               password:entererdPassword,
              })
             });
            responseData= await response.json();
    
            if(!response.ok){
            setError(false);
            setLoading(false);
            throw new Error(responseData.message);
            
            }
        setSuccessM("Staff Registered Successfully...");
         staffOfficeRef.current.value = "";
         staffEmailInputRef.current.value = "";
         staffNameRef.current.value = "";
         staffPasswordRef.current.value = "";
        setLoading(false);
          }catch(err){
          setErrormessage(err.toString());
        setError(false);
        setLoading(false);
          }
    
   }
 return (
   <div>
      <div className="registerstaff">
      <Card>
        {!error && <Modal onClick={errormodalcloseHndler}><div className="errorMessage"><h4 >{errorMessage}</h4><button onClick={errormodalcloseHndler}>closex</button></div></Modal> } 
        {loading && <LoadingSpinner/>}
        {successM !== "" && <Modal onClick={successmodalcloseHndler}><div className="successMessage"><h4>{successM}</h4><button onClick={successmodalcloseHndler}>closex</button></div></Modal>}
        <h3>Register New Staff</h3>
      <form onSubmit={formSubmitHandler}>
    <input placeholder="Enter Staff Name" ref={staffNameRef} type="text"/>
    <select ref={staffOfficeRef}>
      <option value="">Select Office Of Staff</option>
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
    <input placeholder="Email" ref={staffEmailInputRef} type="email"/>
    <input placeholder="Password" ref={staffPasswordRef} type="password"/>
    <button>Register Staff</button>
    </form>
     </Card>
     </div>
     <Footer/>

   </div>
 );

 }
  
     
 
 


export default RegisterStaff;