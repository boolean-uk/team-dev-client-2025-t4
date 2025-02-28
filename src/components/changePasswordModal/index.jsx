import { useState } from 'react';
import useModal from '../../hooks/useModal';
import TextInput from '../form/textInput';
import Toast from '../toast';
import './style.css';
import Button from '../button';

const changePasswordModal = () => {
  const { closeModal } = useModal();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Check if current password is entered
    if (!currentPassword) {
      newErrors.currentPassword = 'Current password is required.';
    }

    // Check if new password meets criteria (e.g., minimum length)
    if (!newPassword || newPassword.length < 8) {
      newErrors.newPassword = 'New password must be at least 8 characters long.';
    }

    // Check if repeated password matches the new password
    if (newPassword !== repeatNewPassword) {
      newErrors.repeatNewPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const onCancel = () => {
    closeModal();
  };

  const onSave = () => {
    if (validateForm()) {
      closeModal();
    }
  };

  return (
    <>
      <section>
        <div className="register-form">
          <form>
            <TextInput
              label={'Current password*'}
              onChange={(e) => setCurrentPassword(e.target.value)}
              value={currentPassword}
              name={'currentPassword'}
              type="password"
            />
            {errors.currentPassword && (
              <small className="error-message">{errors.currentPassword}</small>
            )}
            <TextInput
              label={'New password*'}
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              name={'newPassword'}
              type="password"
            />
             {errors.newPassword && (
              <small className="error-message">{errors.newPassword}</small>
            )}
            <TextInput
              label={'Repeat new password*'}
              onChange={(e) => setRepeatNewPassword(e.target.value)}
              value={repeatNewPassword}
              name={'repeatNewPassword'}
              type="password"
            />
            {errors.repeatNewPassword && (
              <small className="error-message">{errors.repeatNewPassword}</small>
            )}
          </form>
        </div>
      </section>

      <small></small>

      <section className="save-profile-actions">
        <Button onClick={onCancel} text="Cancel" classes={`offwhite width-full`} />
        <Button onClick={onSave} text="Change password" classes={`blue width-full`} />
      </section>
    </>
  );
};

export default changePasswordModal;
