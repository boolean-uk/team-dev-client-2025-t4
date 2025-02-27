import Button from '../button';
import TextInput from '../form/textInput';

import './style.css';

function ContactInfoForm({ userProfileForm, handleChange, isDisabled }) {
  // TODO: Handle Change password button click
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
      <div className="wide">
        <Button classes={'green wide'} text={'Change password'} />
      </div>
    </div>
  );
}

export default ContactInfoForm;
