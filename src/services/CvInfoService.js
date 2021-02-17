import axios from 'axios';

const cvInfoService = (id, setState) => {
  const jwt = localStorage.getItem(process.env.GATSBY_JWT_STORAGE);

  axios({
    method: 'get',
    url: `${process.env.GATSBY_API_URL}/api/cvinfo/${id}`,
    headers: { Authorization: jwt },
  })
    .then((response) => {
      setState({ status: response.status, data: response.data.data });
    })
    .catch(() => {
      setState({ status: 403, data: {} });
    });
};

export default cvInfoService;
