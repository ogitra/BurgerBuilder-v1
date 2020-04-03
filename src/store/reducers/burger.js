import * as actionTypes from '../actions/actionTypes';
import { updateObjects } from '../utility'; //func pra diminuir quando tem q atualizar state (ver arquivo)

const initialState = {
	ing: {},
	ingPrices: {
		salad: 0.5,
		cheese: 0.7,
		meat: 1.5,
		bacon: 0.7
	},
	loadBurgerPage: false,
	totalPrice: 4,
	disabledOrder: true
};
//embaixo uma 'utility' (delIng)fora do arquivo utility pq é específica
const delIng = (state, action) => {
	const ingredient = state.ing;
	const newIngredient = ingredient[action.ingred] - 1;
	if (newIngredient < 0) {
		return;
	}
	ingredient[action.ingred] = newIngredient;
	const order = Object.keys(ingredient).map(item => ingredient[item]).reduce((total, prox) => {
		return total + prox;
	}, 0);

	const oldPrice = state.totalPrice;
	let newPrice = oldPrice - state.ingPrices[action.ingred];
	return updateObjects(state, {
		ing: ingredient,
		totalPrice: newPrice,
		disabledOrder: order === 0
	});
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_ING:
			return updateObjects(state, {
				ing: {
					...state.ing,
					[action.ingred]: state.ing[action.ingred] + 1
				},
				totalPrice: state.totalPrice + state.ingPrices[action.ingred],
				disabledOrder: false
			});
		case actionTypes.DEL_ING:
			return delIng(state, action);

		case actionTypes.SET_INGREDIENTS:
			return {
				...state,
				ing: action.ingredients,
				totalPrice: 4,
				loadBurgerPage: true
			};

		default:
			return state;
	}
};

export default reducer;
