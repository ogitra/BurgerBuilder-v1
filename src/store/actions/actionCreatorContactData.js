import * as actionTypes from './actionTypes';
import axios from '../../components/Axios/axios-orders';

export const setModalHandler = () => {
	return { type: actionTypes.SET_MODAL_HANDLER };
};

export const setOrderHandler = order => {
	return {
		type: actionTypes.SET_ORDER_HANDLER,
		order: order
	};
};

export const orderHandler = order => {
	return dispatch => {
		axios.post('/orders.json', order).then(() => {
			dispatch(setOrderHandler(order));
		});
	};
};
