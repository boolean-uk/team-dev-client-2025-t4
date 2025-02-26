import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { user } from '../../service/mockData';
import ProfileCircle from '../../components/profileCircle';
import Bio from '../../components/bio';

import './style.css';

const uerObj = {
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
  bio: ''
};

function Profile({ isEditing = true }) {
  // const { user } = useContext(UserContext)

  const navigate = useNavigate();
  const [userForm, setUserForm] = useState({ ...defaultUserForm });

  if (!user) {
    return <div>Loading user...</div>;
  }
  // id: 1,
  // email: 'test@email.com',
  // cohortId: 1,
  // role: 'STUDENT',
  // firstName: 'Joe',
  // lastName: 'Bloggs',
  // bio: 'Lorem ipsum dolor sit amet.',
  // githubUrl: 'https://github.com/vherus'
  useEffect(() => {
    resetForm();
  }, []);

  const resetForm = () => {
    setUserForm({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      githubUrl: user.githubUrl,
      email: user.email,
      mobile: user.email,
      bio: user.bio
    });
  };

  const handleUpdate = (event) => {
    const { name, value } = event.target;
    setUserForm((prevFormData) => ({
        ...prevFormData,
        [name]: value,
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
        <form className="profile-form">
          {/* Components go here! */}
          <button disabled={isEditing} onClick={toggleEdit}>
            Hello world!
          </button>
          <button disabled={isEditing} onClick={toggleEdit}>
            Hello world!
          </button>
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
                  className="red"
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