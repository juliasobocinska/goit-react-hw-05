import { NavLink } from 'react-router-dom';


const Navigation = () => {
  return (
    <nav>
      <NavLink to="/" className="nav">
        Home
      </NavLink>
      <NavLink to="/movies" className="nav">
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
