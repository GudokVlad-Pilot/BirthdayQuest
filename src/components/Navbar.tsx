import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="navbar">
      <div className="pages">
        <span className={`navButton ${location.pathname === '/chest' ? 'active' : ''}`}>
          <Link className="link" to="/chest">
            <img className="iconLink" src="/pictures/chest.png" alt="chestLink" />
          </Link>
        </span>
        <span className={`navButton ${location.pathname === '/friends' ? 'active' : ''}`}>
          <Link className="link" to="/friends">
            <img className="iconLink" src="/pictures/friend.png" alt="friendLink" />
          </Link>
        </span>
        <span className={`navButton ${location.pathname === '/award' ? 'active' : ''}`}>
          <Link className="link" to="/award">
            <img className="iconLink" src="/pictures/award.png" alt="awardLink" />
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Navbar;