import * as actionTypes from './actionTypes';
import axios from '../../components/Axios/axios-orders';

export const setOrders = response => {
	return {
		type: actionTypes.SET_ORDERS,
		orders: response
	};
};

export const initOrders = () => {
	return dispatch => {
		axios.get('/orders.json').then(response => {
			dispatch(setOrders(response.data));
		});
	};
};
