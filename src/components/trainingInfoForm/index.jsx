import { getInitials } from '../../service/userServices';
import LockedTextInput from '../form/lockedTextInput';
import { SimpleProfileCircle } from '../profileCircle';
import LockIcon from '../../assets/icons/lockIcon';

import './style.css';

function TrainingInfoForm({ cohortData, userProfileForm, handleChange, isDisabled }) {
  return (
    <div className="basic-info-form">
      <h4>Training info</h4>

      <LockedTextInput
        label={'Role*'}
        onChange={handleChange}
        value={userProfileForm.role}
        name={'role'}
        isLocked={true}
      />
      <LockedTextInput
        label={'Specialism*'}
        onChange={handleChange}
        value={cohortData.specialism}
        name={'specialism'}
        isLocked={true}
      />
      <LockedTextInput
        label={'Cohort*'}
        onChange={handleChange}
        value={cohortData.cohortName}
        name={'cohort'}
        isLocked={isDisabled}
      />
      <LockedTextInput
        label={'Start Date*'}
        onChange={handleChange}
        value={cohortData.startDate}
        name={'startDate'}
        isLocked={true}
      />
      <LockedTextInput
        label={'End Date*'}
        onChange={handleChange}
        value={cohortData.endDate}
        name={'endDate'}
        isLocked={true}
      />
    </div>
  );
}

export default TrainingInfoForm;
