import * as actionTypes from '../actions/actionTypes';

const initialState = {
	orders: []
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_ORDERS:
			const orders = [];
			for (let item in action.orders) {
				orders.push({ ...action.orders[item], id: item }); //add assim pra pegar oq ja tinha e criar uma categoria a mais( 'id')
			}

			return {
				...state,
				orders: state.orders.concat(orders)
			};

		default:
			return state;
	}
};

export default reducer;
