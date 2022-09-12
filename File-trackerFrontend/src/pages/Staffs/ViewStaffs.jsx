import './viewStaffs.scss';
import StaffDetails from './StaffDetails';
import {useEffect,useState} from 'react';
import Card from "../../components/shared/Card";
import LoadingSpinner from "../../components/shared/LoadingSpinner"



const ViewStaffs  = ()=>{

  const [loadedStaffs, setLoadedStaffs] = useState([]);
  const [loading, setLoading] = useState(false);

  
 useEffect(()=>{
   const sendRequest =  async ()=>{
     setLoading(true);
     try{
       const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/staffs`);
       const responseData = await response.json();
       if(!response.ok){
         throw new Error(responseData.message);
       }
       setLoadedStaffs(responseData.staffs);
     }catch(err){
       //setError(err.message);
     }
     setLoading(false);
     
   }
   sendRequest();
 },[]);


 
     return(
         <div className="viewstaffs">
         {loading && <LoadingSpinner/>}
       <Card>
        <div className="tablediv">
       <table>
       <thead>
         <td>Name</td>
         <td>Email</td>
         <td>Office</td>
         <td>Edit Action</td>
         <td>Delete Action</td>
       </thead>
       {loadedStaffs.map((staff)=>{
         return <StaffDetails
          key = {staff.id}
          id = {staff.id}
          name = {staff.name}
          email = {staff.email}
          office = {staff.office}
          password = {staff.password}
         />
       })}
       </table>
       </div>
       </Card>
       </div>
      
     )
}
export default ViewStaffs;