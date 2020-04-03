import * as actionTypes from './actionTypes';
import axios from '../../components/Axios/axios-orders';

export const addIng = ingredName => {
	return {
		type: actionTypes.ADD_ING,
		ingred: ingredName
	};
};

export const delIng = ingredName => {
	return {
		type: actionTypes.DEL_ING,
		ingred: ingredName
	};
};

//as duas abaixo sao ASYNC, e se complementam:

export const setIngredients = ingredients => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ingredients
	};
};

//lembrando que tem q disparar esta e não a de cima
export const initIngredients = () => {
	return dispatch => {
		axios.get('https://my-burger-3defc.firebaseio.com/ingredients.json').then(response => {
			dispatch(setIngredients(response.data));
		});
	};
};
