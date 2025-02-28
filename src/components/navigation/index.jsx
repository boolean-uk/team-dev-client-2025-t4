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
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            {({ isActive }) => (
              <>
                <HomeIcon colour={isActive ? '#000046' : '#64648C'} />
                <p>Home</p>
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/profile/${userId}`}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            {({ isActive }) => (
              <>
                <ProfileIcon colour={isActive ? '#000046' : '#64648C'} />
                <p>Profile</p>
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/cohort/${userId}`}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            {({ isActive }) => (
              <>
                <CohortIcon colour={isActive ? '#000046' : '#64648C'} />
                <p>Cohort</p>
              </>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;