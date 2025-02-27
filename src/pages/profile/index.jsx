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
import SaveChangesProfileModal from '../../components/saveChangesProfileModal';

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

  const [toastData, setToastData] = useState(null); // Use null to indicate no toast

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

  const { openModal, setModal } = useModal();
  
  const showModal = () => {
    setModal('Save changes to profile?', <SaveChangesProfileModal toggleToast={toggleToast}/>); 

    // Open the modal!
    openModal();
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
        <form className="profile-form" onSubmit={(e) => {e.preventDefault()}}>
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
          <ContactInfoForm
            userData={user}
            userProfileForm={userForm}
            handleChange={handleUpdate}
            isDisabled={!isEditing}
          />
          <Bio userData={userForm} handleUpdate={handleUpdate} isEditMode={isEditing}></Bio>
          <hr className="divider" />
          <small>* Required</small>
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
              <>
               <button className="blue" onClick={toggleEdit}>
                Edit
              </button>
              <button className="blue" onClick={showModal}>
              Save
            </button>
              </>
            )}
          </div>
        </form>
        {toastData && <Toast text={toastData.text} linkText={toastData.linkText} />}
      </div>
    </>
  );
}

export default Profile;
