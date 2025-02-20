import {Link} from 'react-router-dom'
function Navbar(){
    return(
        <>
            <nav id='navbar'>
                <Link id='nav-link' to={'/'}>Home</Link>
                <Link id='nav-link' to={'/about'}>About</Link>
                <Link id='nav-link' to={'/contact'}>Contact</Link>
            </nav>
        </>
    )
}