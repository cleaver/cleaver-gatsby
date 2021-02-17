import React from 'react';
import ReactModal from 'react-modal';

const Password = ({ isOpen, handleCloseModal, handleChange, handleSubmit }) => {
  ReactModal.setAppElement('.cbcontainer');
  return (
    <div>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={handleCloseModal}
        className="cbmodal"
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="password" className="font-display text-primary">
            Password
            <input
              id="password"
              name="password"
              onChange={(e) => handleChange(e)}
              type="password"
              className="cbmodal__input"
            />
          </label>
          <button type="submit" className="cbmodal__button">
            Log in
          </button>
        </form>
      </ReactModal>
    </div>
  );
};

export default Password;
