import { useNavigate } from 'react-router-dom';
import Button from '../button';
import TextInput from '../form/textInput';

import './style.css';

function ContactInfoForm({ userProfileForm, handleChange, isDisabled, canChangePassword }) {
  // TODO: Handle Change password button click

  const navigate = useNavigate();

  const changePassword = (event) => {
    event.preventDefault();
    navigate('/change-password'); // Non-existing for now
  };

  return (
    <div className="basic-info-form">
      <h4>Contact Info</h4>
      <TextInput
        label={'Email*'}
        onChange={handleChange}
        value={userProfileForm.email}
        name={'email'}
        isDisabled={isDisabled}
      />
      <TextInput
        label={'Mobile*'}
        onChange={handleChange}
        value={userProfileForm.mobile}
        name={'mobile'}
        isDisabled={isDisabled}
      />
      {Boolean(canChangePassword) && (
        <div className="wide">
          <Button classes={'green wide'} text={'Change password'} onClick={changePassword} />
        </div>
      )}
    </div>
  );
}

export default ContactInfoForm;
