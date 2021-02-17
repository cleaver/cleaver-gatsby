import React, { useEffect, useState } from 'react';
import cvInfoService from '../services/CvInfoService';
import loginService from '../services/LoginService';
import Password from './password';

const CvInfo = () => {
  // state
  const [cvState, setCvState] = useState({ status: 0, data: {} });
  const [password, setPassword] = useState();
  const [isOpen, setIsOpen] = useState(true);
  const [message, setMessage] = useState();

  // close modal
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  // open modal
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  // handle form state
  const handleChange = (event) => {
    if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
  };

  // submit password form
  const handleSubmit = (event) => {
    event.preventDefault();
    loginService(password, handleLoginSuccess, handleLoginFailure);
  };

  // handle login result: success
  const handleLoginSuccess = () => {
    cvInfoService(process.env.GATSBY_API_RESOURCE, setCvState);
  };

  // handle login result: failure
  const handleLoginFailure = () => {
    setCvState({ status: 403, data: {} });
  };
  // retrieve data
  useEffect(() => {
    cvInfoService(process.env.GATSBY_API_RESOURCE, setCvState);
  }, []);

  switch (cvState.status) {
    case 0:
      return <div>Loading...</div>;

    case 200:
      return <div dangerouslySetInnerHTML={{ __html: cvState.data }} />;

    case 403:
      if (isOpen) {
        return (
          <Password
            isOpen={isOpen}
            handleCloseModal={handleCloseModal}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
        );
      }
      // Ensure modal can be reopened if user has closed it.
      return (
        <div className="flex items-center justify-center">
          <div className="cbinfobox">
            <div className="mb-4">Restricted access</div>
            <button
              type="button"
              onClick={handleOpenModal}
              className="cbinfobox__button"
            >
              Log in
            </button>
          </div>
        </div>
      );

    default:
      return <div>API Error.</div>;
  }
};

export default CvInfo;
