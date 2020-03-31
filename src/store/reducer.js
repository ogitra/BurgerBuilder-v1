import * as actions from './actions';

const initialState = {
	ing: {
		salad: 0,
		cheese: 0,
		meat: 0,
		bacon: 0
	},
	ingPrices: {
		salad: 0.5,
		cheese: 0.7,
		meat: 1.5,
		bacon: 0.7
	},
	totalPrice: 4,
	disabledOrder: true
};

const reducer = (state = initialState, action) => {
	if (action.type === actions.ADD_ING) {
		return {
			...state,
			ing: {
				...state.ing,
				[action.ingred]: state.ing[action.ingred] + 1
			},
			totalPrice: state.totalPrice + state.ingPrices[action.ingred],
			disabledOrder: false
		};
	}

	if (action.type === actions.DEL_ING) {
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

		if (newPrice >= 4) {
			state.totalPrice = newPrice;
		}

		return {
			...state,
			ing: ingredient,
			disabledOrder: order === 0
		};
	}
	return state;
};

export default reducer;
