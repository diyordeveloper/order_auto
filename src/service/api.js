import axios from '.';

const Api = {
  registerApi: data => axios.post('/user/add', data),
  verfyApi: data => axios.post('/user/verify', data),
  loginApi: data => axios.post('/user/login', data),
  getUser: user_id => axios.get('/user/' + user_id),

  addCarsApi: data =>
    axios.post(
      '/car/add',
      {
        photo: data.photo,
        madel: data.madel,
        madelru: data.madel,
        marka: data.marka,
        markaru: data.marka,
        color: data.color,
        colorru: data.color,
        yili: data.yili,
        divigitelru: data.divigitel,
        divigitel: data.divigitel,
        yoqilgiru: data.yoqilgi,
        yoqilgi: data.yoqilgi,
        transmissionru: data.transmission,
        transmission: data.transmission,
        kuzuvru: data.kuzuv,
        kuzuv: data.kuzuv,
        perevodru: data.perevod,
        perevod: data.perevod,
        yurgani: data.yurgani,
        narxi: data.narxi,
        aksiya: data.aksiya,
        opisaniya: data.opisaniya,
        opisaniyaru: data.opisaniya,
        credit: data.credit,
        region: data.region,
        number: data.number,
      },
      {
        headers: {'Content-Type': 'multipart/form-data'},
      },
    ),

  carsApiFlatList: (page, user_id) =>
    axios.get(`/car/allPage?page=${page}&limit=10&userId=${user_id}`),
  videoApi: page => axios.get(`/video/all?page=${page}&limit=10`),
  videoShow: id => axios.get('/video/' + id),
  carsApi: () => axios.get('/car/all'),
  carQuery: data => axios.get('/car/query?' + data),
  carsShow: id => axios.get('/car/' + id),

  deleteLike: id => axios.delete('/like/' + id),
  addLike: (id, userId) => axios.post('/like/add', {likes: id, userId: userId}),
  likeAllList: userId =>
    axios.get(`/like/all?page=1&limit=9999999&userId=${userId}`),
};
export default Api;
