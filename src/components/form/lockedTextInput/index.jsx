import './style.css';
import TextInput from '../textInput';
import LockIcon from '../../../assets/icons/lockIcon';

function LockedTextInput({ isLocked, label, name, value, onChange }) {
  return (
    <div className="right-aligned-icon">
      <TextInput
        label={label}
        onChange={onChange}
        value={value}
        name={name}
        isDisabled={isLocked}
      />
      {isLocked && <LockIcon />}
    </div>
  );
}

export default LockedTextInput;
