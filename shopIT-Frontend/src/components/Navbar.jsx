import { Link } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaEnvelope, FaBox } from 'react-icons/fa';
import logo from '../assets/logo.png';

function Navbar() {
    return (
        <>
            <nav id='navbar'>
                <div id='logo'>
                    <img src={logo} alt='company logo' id='logo'/>
                </div>
                <Link id='nav-link' to={'/'}><FaHome size={20}/> Home</Link>
                <Link id='nav-link' to={'/about'}><FaInfoCircle size={20}/> About</Link>
                <Link id='nav-link' to={'/contact'}><FaEnvelope size={20}/> Contact</Link>
                <Link id='nav-link' to={'/orders'}><FaBox size={20}/> Orders</Link>
            </nav>
        </>
    );
}

export default Navbar;
