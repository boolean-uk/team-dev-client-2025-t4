import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { user as userData, cohort as cohortData } from '../../service/mockData';
import useModal from '../../hooks/useModal';
import ProfileCircle from '../../components/profileCircle';
import Bio from '../../components/bio';
import Toast from '../../components/toast';

import './style.css';
import BasicInfoForm from '../../components/basicInfoForm';
import TrainingInfoForm from '../../components/trainingInfoForm';
import ProfessionalInfoForm from '../../components/professionalInfoForm';
import ContactInfoForm from '../../components/ContactInfoForm';
import useAuth from '../../hooks/useAuth';
import { jwtDecode } from 'jwt-decode';
import { getUser } from '../../service/apiClient';
import { getInitials } from '../../service/userServices';
import SaveChangesProfileModal from '../../components/saveChangesProfileModal';

const userObj = {
  firstName: '',
  lastName: '',
  email: '',
  biography: '',
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
  biography: '',
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
  const { openModal, setModal } = useModal();
  const [toastData, setToastData] = useState(null); // Use null to indicate no toast

  useEffect(() => {
    getUser(id).then(setUser);
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
      biography: user.biography,
      role: user.role
    });
  };
  useEffect(() => {
    resetForm();
  }, [user]);

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

  const toggleToast = (saved) => {
    if (saved) {
      setToastData({ text: 'Profile saved', linkText: 'Edit' }); // Show the toast with data
      setTimeout(() => {
        setToastData(null); // Hide the toast after 2 seconds
      }, 3000);
    }
    else{
      setToastData({ text: 'Changes discarded', linkText: 'Undo' }); // Show the toast with data
      setTimeout(() => {
        setToastData(null); // Hide the toast after 2 seconds
      }, 3000);
    }
  };
  
  const showModal = () => {
    setModal('Save changes to profile?', <SaveChangesProfileModal toggleToast={toggleToast}/>); 

    // Open the modal!
    openModal();
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
            <button className="blue" onClick={showModal}>Save</button>
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
        
          {/* Components go here! */}
          <form className="profile-form" onSubmit={(e) => {e.preventDefault()}}>
          <BasicInfoForm
            userData={user}
            userProfileForm={userForm}
            handleChange={handleUpdate}
            isDisabled={!isEditing}
          />

          {user.role == 'TEACHER' ? (
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
              isDisabled={!((currentUser.role == 'TEACHER') & isEditing)}
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
        {toastData && <Toast text={toastData.text} linkText={toastData.linkText} />}
      </div>
    </>
  );
}

export default Profile;
