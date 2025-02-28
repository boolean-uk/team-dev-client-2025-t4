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

  const profile = user.profile;
  useEffect(() => {
    getUser(id).then(setUser);
  }, [id]);

  useEffect(() => {
    getUser(currentUserId).then(setCurrentUser);
  }, [currentUserId]);

  const resetForm = () => {
    let data = {
      email: user.email,
      role: user.role
    };
    if (user.profile) {
      data = {
        ...data,
        firstName: user.profile?.firstName,
        lastName: user.profile?.lastName,
        username: user.profile?.username,
        githubUrl: user.profile?.githubUrl,
        mobile: user.profile?.mobile,
        biography: user.profile.bio
      };
    }
    setUserForm({
      ...defaultUserForm,
      ...data
    });
  };

  useEffect(() => {
    resetForm();
  }, [user]);

  if (!user || !currentUser || !profile) {
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
    } else {
      setToastData({ text: 'Changes discarded', linkText: 'Undo' }); // Show the toast with data
      setTimeout(() => {
        setToastData(null); // Hide the toast after 2 seconds
      }, 3000);
    }
  };

  const showSaveModal = () => {
    setModal(
      'Save changes to profile?',
      <SaveChangesProfileModal toggleToast={toggleToast} resetForm={resetForm} />
    );
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
            <button className="blue" onClick={showSaveModal}>
              Save
            </button>
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
          <ProfileCircle initials={getInitials(profile)} />
          <div className="profile-header-title">
            <h4>
              {profile.firstName} {profile.lastName}
            </h4>
            <small>{profile.role}</small>
          </div>
        </div>
        <hr className="divider" />

        {/* Components go here! */}
        <form
          className="profile-form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
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
