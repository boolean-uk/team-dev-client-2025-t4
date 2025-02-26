import './style.css';

const Bio = ({ text, setText, isEditMode }) => {
  const onChange = (e) => {
    const inputText = e.target.value;
    // Limit the input to 300 characters
    if (inputText.length <= 300) {
      setText(inputText);
    }
  };

  return (
    <>
      <h1 className="credentials-title h3">Bio</h1>
      <section>
        <small className="bio-smalltext">Bio</small>
        <textarea
          onChange={onChange}
          value={text}
          placeholder="Tell us about yourself, your professional and educational highlights to date..."
          className={isEditMode ? 'edit-mode' : ''}
          readOnly={!isEditMode} // Make textarea read-only when not in edit mode
        />
        {isEditMode && (
          <small className={`char-limit ${text.length === 300 ? 'limit-reached' : ''}`}>
            {text.length}/300 characters
          </small>
        )}
      </section>
    </>
  );
};

export default Bio;
