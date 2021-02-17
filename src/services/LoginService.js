import axios from 'axios';

const loginService = (password, successCb, failureCb) => {
  axios({
    method: 'post',
    url: `${process.env.GATSBY_API_URL}/api/login`,
    data: { username: process.env.GATSBY_API_USER, password },
  })
    .then((response) => {
      localStorage.setItem(process.env.GATSBY_JWT_STORAGE, response.data.token);
      successCb();
    })
    .catch(() => {
      localStorage.removeItem(process.env.GATSBY_JWT_STORAGE);
      failureCb();
    });
};

export default loginService;
