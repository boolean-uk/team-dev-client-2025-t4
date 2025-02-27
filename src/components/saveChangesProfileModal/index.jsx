import { useState } from 'react';
import useModal from '../../hooks/useModal';
import Toast from '../../components/toast';
import './style.css';
import Button from '../button';

const SaveChangesProfileModal = ({toggleToast}) => {
  // Use the useModal hook to get the closeModal function so we can close the modal on user interaction
  const { closeModal } = useModal();

  const [message, setMessage] = useState(null);
  const [text, setText] = useState('');

  const onNoSave = (e) => {
    closeModal();
    toggleToast(false);
  };

  const onCancel = () => {
    closeModal();
  };

  const onSave = () => {
    closeModal();
    toggleToast(true);
  };
  return (
    <>
      <section>
          <small>Do you want to save the updates to your profile?</small>
      </section>

      <section className="save-profile-actions">
        <Button
          onClick={onNoSave}
          text="Don't save"
          classes={`offwhite width-full`}
        />
         <Button
          onClick={onCancel}
          text="Cancel"
          classes={`offwhite width-full`}
        />
         <Button
          onClick={onSave}
          text="Save"
          classes={`blue width-full`}
        />
      </section>
    </>
  );
};

export default SaveChangesProfileModal;
