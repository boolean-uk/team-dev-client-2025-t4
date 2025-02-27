import LockedTextInput from '../form/lockedTextInput';

import './style.css';

function ProfessionalInfoForm({ userProfileForm, handleChange, isDisabled }) {
  return (
    <div className="basic-info-form">
      <h4>Professional Info</h4>

      <LockedTextInput
        label={'Role*'}
        onChange={handleChange}
        value={userProfileForm.role}
        name={'role'}
        isLocked={isDisabled}
      />
      <LockedTextInput
        label={'Specialism*'}
        onChange={handleChange}
        value={userProfileForm.specialism}
        name={'specialism'}
        isLocked={isDisabled}
      />
      <LockedTextInput
        isLocked={isDisabled}
        label={'Job Title*'}
        onChange={handleChange}
        value={userProfileForm.jobTitle}
        name={'jobTitle'}
      />
    </div>
  );
}

export default ProfessionalInfoForm;
