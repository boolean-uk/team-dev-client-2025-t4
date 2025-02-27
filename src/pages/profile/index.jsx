import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { user as userData, cohort as cohortData } from '../../service/mockData';
import ProfileCircle from '../../components/profileCircle';
import Bio from '../../components/bio';

import './style.css';
import BasicInfoForm from '../../components/basicInfoForm';
import TrainingInfoForm from '../../components/trainingInfoForm';
import ProfessionalInfoForm from '../../components/professionalInfoForm';

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
  // const { user } = useContext(UserContext) // TODO: Actually fetch user data from either backend or a user context instead of using mock data.
  const user = userData.user;
  const navigate = useNavigate();
  const [userForm, setUserForm] = useState({ ...defaultUserForm });

  if (!user) {
    return <div>Loading user...</div>;
  }
  useEffect(() => {
    resetForm();
  }, []);

  const resetForm = () => {
    setUserForm({
      ...defaultUserForm,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      githubUrl: user.githubUrl,
      email: user.mobile,
      mobile: user.email,
      bio: user.bio,
      role: user.role
    });
  };

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
  return (
    <>
      <div className="profile-container">
        <div className="profile-header">
          <ProfileCircle initials={'RR'} />
          <div className="profile-header-title">
            <h4>{user.firstName}First name</h4>
            <small>Role</small>
          </div>
        </div>
        <hr className="divider" />
        <form className="profile-form">
          {/* Components go here! */}
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

          <button disabled={isEditing} onClick={toggleEdit}>
            Hello world!
          </button>
          <Bio userData={userForm} handleUpdate={handleUpdate} isEditMode={isEditing}></Bio>
          <small>* Required</small>
          <div>
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
        </form>
      </div>
    </>
  );
}

export default Profile;
