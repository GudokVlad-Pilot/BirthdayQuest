import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar" >
            <span className="homeButton"><Link className="linkHome" to="/" >Home</Link></span>
            <div className="pages">
                <span className="navButton"><Link className="link" to="/chest">Chest</Link></span>
                <span className="navButton"><Link className="link" to="/numbers">Numbers</Link></span>
                <span className="navButton"><Link className="link" to="/users">Users</Link></span>
            </div>
        </div>
    )
}

export default Navbar;