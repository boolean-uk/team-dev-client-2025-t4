import { getInitials } from '../../service/userServices';
import TextInput from '../form/textInput';
import { SimpleProfileCircle } from '../profileCircle';

import './style.css';

function BasicInfoForm({ userData, userProfileForm, handleChange, isDisabled }) {
  // TODO: Add support for image submission
  return (
    <div className="basic-info-form">
      <h4>Basic info</h4>
      <div className="headshot">
        <label>Photo</label>
        <div className="profile-image">
          <SimpleProfileCircle initials={getInitials(userData.profile)} />
          <p>Add headshot</p>
        </div>
      </div>

      <TextInput
        label={'First name*'}
        onChange={handleChange}
        value={userProfileForm.firstName}
        name={'firstName'}
        isDisabled={isDisabled}
      />
      <TextInput
        label={'Last name*'}
        onChange={handleChange}
        value={userProfileForm.lastName}
        name={'lastName'}
        isDisabled={isDisabled}
      />
      <TextInput
        label={'Username*'}
        onChange={handleChange}
        value={userProfileForm.username}
        name={'username'}
        isDisabled={isDisabled}
      />
      <TextInput
        label={'GitHub Url*'}
        onChange={handleChange}
        value={userProfileForm.githubUrl}
        name={'githubUrl'}
        isDisabled={isDisabled}
      />
    </div>
  );
}

export default BasicInfoForm;
