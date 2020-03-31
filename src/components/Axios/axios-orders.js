import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://my-burger-3defc.firebaseio.com/'
});

export default instance;
