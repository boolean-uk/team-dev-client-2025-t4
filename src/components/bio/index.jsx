import { useState } from 'react';
import './style.css';

const Bio = ({ userData, handleUpdate, isEditMode }) => {
  const [bioText, setBioText] = useState(userData.bio || '');
  const onChange = (e) => {
    const inputText = e.target.value;
    // Limit the input to 300 characters
    if (inputText.length <= 300) {
      setBioText(inputText)
      handleUpdate(e);
    }
  };

  return (
    <div>
      <h1 className="credentials-title h3">Bio</h1>
      <section>
        <small className="bio-smalltext">Bio</small>
        <textarea
          onChange={onChange}
          value={bioText}
          placeholder="Tell us about yourself, your professional and educational highlights to date..."
          className={isEditMode ? 'edit-mode' : ''}
          readOnly={!isEditMode} // Make textarea read-only when not in edit mode
        />
        {isEditMode && (
          <small className={`char-limit ${bioText.length === 300 ? 'limit-reached' : ''}`}>
            {bioText.length}/300 characters
          </small>
        )}
      </section>
    </div>
  );
};

export default Bio;