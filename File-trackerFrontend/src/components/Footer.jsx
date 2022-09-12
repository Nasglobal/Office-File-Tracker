import './footer.scss';
import img2 from '../Resources/coat-of-arms-of-nigeria-logo-1BB4D7976C-seeklogo.com.png';

const Footer = ()=>{
  return (
    <div className="footer">
    <div className="footer-container">
      <img src={img2} alt=""/>
       <h5><span>@</span> Federal Ministry of Humanitarian Affairs, Disaster Management and Social Development</h5>
       </div>
    </div>
  )
}
export default Footer;