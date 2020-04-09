import * as actionTypes from '../actions/actionTypes';

const initialState = {
	orders: [],
	showModal: false,
	redirect: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_ORDER_HANDLER:
			return {
				...state,
				orders: state.orders.concat(action.order),
				showModal: true,
				redirect: false
			};

		case actionTypes.SET_MODAL_HANDLER:
			return {
				...state,
				showModal: false,
				redirect: true
			};

		default:
			return state;
	}
};

export default reducer;
