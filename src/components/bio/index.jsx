import { useEffect, useState } from 'react';
import './style.css';

const Bio = ({ userData, handleUpdate, isEditMode }) => {
  const charLimit = 300;

  const [bioText, setBioText] = useState('');

  useEffect(() => {
    if (userData.biography) {
      setBioText(userData.biography);
    }
  }, [userData.biography]);

  const onChange = (e) => {
    const inputText = e.target.value;
    // Limit the input to 300 characters
    if (inputText.length <= 300) {
      setBioText(inputText);
      handleUpdate(e);
    }
  };

  return (
    <div className="basic-info-form">
      <h4>Bio</h4>
      <section>
        <label htmlFor="bio">Bio</label>
        <textarea
          name="biography"
          onChange={onChange}
          value={bioText}
          placeholder="Tell us about yourself, your professional and educational highlights to date..."
          className={isEditMode ? 'edit-mode' : ''}
          readOnly={!isEditMode} // Make textarea read-only when not in edit mode
        />
        {isEditMode && (
          <small className={'char-limit' + (bioText.length === charLimit ? 'limit-reached' : '')}>
            {bioText.length}/{charLimit} characters
          </small>
        )}
      </section>
    </div>
  );
};

export default Bio;
