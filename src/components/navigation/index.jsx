import { NavLink } from 'react-router-dom';
import CohortIcon from '../../assets/icons/cohortIcon';
import HomeIcon from '../../assets/icons/homeIcon';
import ProfileIcon from '../../assets/icons/profileIcon';
import useAuth from '../../hooks/useAuth';
import './style.css';
import { jwtDecode } from 'jwt-decode';

const Navigation = () => {
  const { token } = useAuth();
  let userId;
  try {
    const decoded = token ? jwtDecode(token) : {};
    userId = decoded.userId ?? 1; // TODO: If there is no valid id in the token, assume it is invalid and redirect to login.
  } catch (error) {
    userId = 1;
  }

  if (!token) {
    return null;
  }

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">
            <HomeIcon colour="#000046" />
            <p>Home</p>
          </NavLink>
        </li>
        <li>
          <NavLink to={`/profile/${userId}`}>
            <ProfileIcon />
            <p>Profile</p>
          </NavLink>
        </li>
        <li>
          <NavLink to={`/cohort/${userId}`}>
            <CohortIcon />
            <p>Cohort</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
