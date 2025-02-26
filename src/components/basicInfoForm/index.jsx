import { getInitials } from '../../service/userServices';
import TextInput from '../form/textInput';
import { SimpleProfileCircle } from '../profileCircle';

import './style.css';

function BasicInfoForm({ userData, userProfileForm, handleChange, isDisabled }) {
  return (
    <>
      <h4>Basic info</h4>
      <div>
        <label>Photo</label>
        <div className="profile-image">
          <SimpleProfileCircle initials={getInitials(userData)} />
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
        label={'GitHub Username*'}
        onChange={handleChange}
        value={userProfileForm.githubUsername}
        name={'githubUsername'}
        isDisabled={isDisabled}
      />
    </>
  );
}

export default BasicInfoForm;
