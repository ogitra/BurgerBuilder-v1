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

export const orderHandler = (order, token) => {
	return dispatch => {
		//'?auth' pq agr colocamos uma condição no firebase q exige isso para mostrar algumas coisas
		axios.post('/orders.json?auth=' + token, order).then(() => {
			dispatch(setOrderHandler(order));
		});
	};
};
