import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { user as userData, cohort as cohortData } from '../../service/mockData';
import ProfileCircle from '../../components/profileCircle';
import Bio from '../../components/bio';

import './style.css';
import BasicInfoForm from '../../components/basicInfoForm';
import TrainingInfoForm from '../../components/trainingInfoForm';
import ProfessionalInfoForm from '../../components/professionalInfoForm';
import ContactInfoForm from '../../components/ContactInfoForm';
import useAuth from '../../hooks/useAuth';
import { jwtDecode } from 'jwt-decode';
import { getUser } from '../../service/apiClient';
import { getInitials } from '../../service/userServices';

const userObj = {
  firstName: '',
  lastName: '',
  email: '',
  bio: '',
  githubUrl: '',
  password: '',
  cohortId: '',
  role: '',
  id: ''
};

const defaultUserForm = {
  firstName: '',
  lastName: '',
  username: '',
  githubUrl: '',
  email: '',
  mobile: '',
  bio: '',
  specialism: '',
  jobTitle: '',
  role: ''
};

function Profile({ isEditing = false }) {
  const { token } = useAuth();
  const { userId: currentUserId } = jwtDecode(token);
  const { id } = useParams();

  const [user, setUser] = useState(userData.user);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const [userForm, setUserForm] = useState({ ...defaultUserForm });

  useEffect(() => {
    // Fetch user profile based on ID
  }, [id]);

  useEffect(() => {
    getUser(currentUserId).then(setCurrentUser);
  }, [currentUserId]);

  const resetForm = () => {
    setUserForm({
      ...defaultUserForm,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      githubUrl: user.githubUrl,
      email: user.email,
      mobile: user.mobile,
      bio: user.bio,
      role: user.role
    });
  };
  useEffect(() => {
    resetForm();
  }, [user]);

  // if (!user) {
  if (!user || !currentUser) {
    return <div>Loading user...</div>;
  }
  const canEdit =
    (currentUserId == id) | ((user.role == 'STUDENT') & (currentUser.role == 'TEACHER')) | true;

  const handleUpdate = (event) => {
    const { name, value } = event.target;
    setUserForm((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const toggleEdit = (event) => {
    event.preventDefault();
    navigate('edit'); // /profile/<id>/edit
  };

  function renderEditButtons() {
    if (!canEdit) return null;

    return (
      <div className="profile-edit-buttons">
        {isEditing ? (
          <>
            <button
              onClick={(event) => {
                event.preventDefault();
                resetForm();
                navigate(-1);
              }}
              className="offwhite"
            >
              Cancel
            </button>
            <button className="blue">Save</button>
          </>
        ) : (
          <button className="blue" onClick={toggleEdit}>
            Edit
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="profile-container">
        <div className="profile-header">
          <ProfileCircle initials={getInitials(user)} />
          <div className="profile-header-title">
            <h4>
              {user.firstName} {user.lastName}
            </h4>
            <small>{user.role}</small>
          </div>
        </div>
        <hr className="divider" />
        <form className="profile-form">
          <BasicInfoForm
            userData={user}
            userProfileForm={userForm}
            handleChange={handleUpdate}
            isDisabled={!isEditing}
          />

          {user.role.toUpperCase() == 'TEACHER' ? (
            <ProfessionalInfoForm
              userData={user}
              userProfileForm={userForm}
              handleChange={handleUpdate}
              isDisabled={!isEditing}
            />
          ) : (
            <TrainingInfoForm
              cohortData={cohortData}
              userProfileForm={userForm}
              handleChange={handleUpdate}
              isDisabled={true}
            />
          )}
          <ContactInfoForm
            userData={user}
            userProfileForm={userForm}
            handleChange={handleUpdate}
            isDisabled={!isEditing}
            canChangePassword={canEdit}
          />
          <Bio userData={userForm} handleUpdate={handleUpdate} isEditMode={isEditing}></Bio>
          <hr className="divider" />
          <small>* Required</small>
          {renderEditButtons()}
        </form>
      </div>
    </>
  );
}

export default Profile;
