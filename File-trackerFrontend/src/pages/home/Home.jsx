import {useContext,useState,useEffect} from 'react';
import './home.scss';
import Footer from '../../components/Footer'
import Card from '../../components/shared/Card'
import Typical from 'react-typical';
import AwaitingFiles from '../PendingFiles/AwaitingFiles';
import FileItemSearch from "./FileItemSearch";
import SearchIcon from '@mui/icons-material/Search';
import { AuthContext } from '../../store/Auth-context';


const Home = (props)=>{
  const Auth = useContext(AuthContext);
  const [loadedFiles, setLoadedFiles] = useState([]);
  const [searchedFile, setSearchedFile] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);



  useEffect(()=>{
    const sendRequest =  async ()=>{
      //setLoading(true);
      try{
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/searchfile`);
        const responseData = await response.json();
        if(!response.ok){
          throw new Error(responseData.message);
        }
        setLoadedFiles(responseData.files);
      }catch(err){
        setError(".....Check Internet Connection before searching for File");
      }
      //setLoading(false);
      
    }
    sendRequest();
  },[]);

  const searchHandler = (e)=>{
    setLoading(true);
    const inputSearch  = e.currentTarget.value;
    const fileResult = loadedFiles.filter(file=> file.subMatter.toLowerCase().includes(inputSearch.toLowerCase()));
    if(!fileResult){
     setError("File not found... check internet connection");
     setLoading(false);
    }
    setSearchedFile(fileResult);
    //setLoading(false);
  }

  const removeSearch = ()=>{
    setLoading(false)
    setSearchedFile([]);
  }
  //
  //error && <p>{error}</p>}
return <div className="home">
 {Auth.isLoggedIn && <AwaitingFiles/>}
  <div className="wrapper">
  {searchedFile.length === 0 && loading && !error && <p>Searching for File.....</p>}
  {error && <p><h4>{error}</h4></p>}
  
  {searchedFile.length > 0 && <Card className="searchdiv">
 <table>
 {searchedFile.map(file =>{
   return <FileItemSearch
   key={file._id}
   fileRef = {file.fileRef}
   subMatter = {file.subMatter}
   currentOffice = {file.currentOffice}
   beneficiary = {file.beneficiary}
   paymentStatus = {file.paymentStatus}
  
 />
   
 })}
 </table>
 
 </Card>}
  <h1 className="typical">
     <Typical
     loop={Infinity}
     steps={[
       "Welcome To FMHADMSD",
       2000,
       "Finance & Accounting",
       2000,
     ]}
     />
  </h1>
  <div className="formdiv">
  <input type="text" placeholder="Search File" onChange={searchHandler} onBlur={removeSearch}/>
  <button><SearchIcon/></button>
  </div>
  </div>
  <Footer/>
</div>
}
export default Home;