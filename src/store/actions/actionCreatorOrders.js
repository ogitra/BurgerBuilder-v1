import * as actionTypes from './actionTypes';
import axios from '../../components/Axios/axios-orders';

export const setOrders = response => {
	return {
		type: actionTypes.SET_ORDERS,
		orders: response
	};
};

export const initOrders = (token, localId) => {
	return dispatch => {
		//filtro do firebase 'orderBy', poe isso no firebase tbm como parametro para filtro
		const queryParams = '?auth=' + token + '&orderBy="localId"&equalTo="' + localId + '"';
		axios.get('/orders.json' + queryParams).then(response => {
			dispatch(setOrders(response.data));
		});
	};
};
