import Modal from './shared/Modal';
import './login.scss';
import {useContext,useRef,useState} from 'react';
import { AuthContext } from '../store/Auth-context';
import LoadingSpinner from "../components/shared/LoadingSpinner"

const Login = (props)=>{

  const [errorMessage, seterrorMessage] = useState();
   const [loading, setLoading] = useState(false);
   const Auth = useContext(AuthContext);
   const email = useRef();
   const password = useRef();

  const onSubmitHandler = async (action)=>{
       action.preventDefault();
       setLoading(true);
      const inputEmail = email.current.value;
      const inputPassword = password.current.value;
     if(inputEmail.trim().length === 0 || inputPassword.trim().length === 0){
       seterrorMessage("OOPS....Please fill in all field");
      setLoading(false);
      return;
     }
     let responseData;
     try{
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/staffs/login`,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
         email: inputEmail,
         password:inputPassword
        })
       });
      responseData= await response.json();

      if(!response.ok){
      seterrorMessage(responseData.message);
      setLoading(false);
      throw new Error(responseData.message);
      }
        Auth.login(responseData.existingStaff.name.toString(),responseData.existingStaff.office.toString());
       props.closeModal();
       setLoading(false); 
     }catch(err){
       seterrorMessage(err.toString()+" Could not login");
       setLoading(false);
     }
     
  }

  return <div>
    <Modal onClick={props.closeModal}>
   {loading && <LoadingSpinner/>}
    <form className="formdiv" onSubmit={onSubmitHandler}>
    {errorMessage && <h4 className="errorMessageLogin">{errorMessage}</h4>}
    <input placeholder="Email" type="email" ref={email}/>
    <input placeholder="Password" type="password" ref={password}/>
    <button>Sign In</button>
    </form>
    <button className="closebutton" onClick={props.closeModal}>Closex</button>
    </Modal>
  </div>
}
export default Login;