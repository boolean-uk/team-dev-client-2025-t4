import { useNavigate } from 'react-router-dom';
import Button from '../button';
import TextInput from '../form/textInput';
import ChangePasswordModal from '../changePasswordModal';
import useModal from '../../hooks/useModal';

import './style.css';

function ContactInfoForm({ userProfileForm, handleChange, isDisabled, canChangePassword }) {
  // TODO: Handle Change password button click
  const { openModal, setModal } = useModal();

  const navigate = useNavigate();

  const changePassword = (event) => {
    event.preventDefault();
    setModal('Change password', <ChangePasswordModal/>); 
    openModal();

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
