import * as actionTypes from '../actions/actionTypes';

const initialState = {
	localId: null,
	idToken: null,
	spinner: false,
	logStatus: null
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_SPINNER:
			return {
				...state,
				spinner: true,
				logStatus: null
			};
		case actionTypes.SIGNUP_SUCCESS:
			return {
				...state,
				localId: action.localId,
				idToken: action.idToken,
				spinner: false,
				logStatus: 'USUÁRIO CADASTRADO COM SUCESSO'
			};

		case actionTypes.SIGNUP_FAIL:
			return {
				...state,
				spinner: false,
				logStatus: action.error
			};

		case actionTypes.LOGIN_SUCCESS:
			return {
				...state,
				localId: action.localId,
				idToken: action.idToken,
				spinner: false,
				logStatus: 'USUÁRIO AUTENTICADO'
			};

		case actionTypes.AUTH_LOGOUT:
			return {
				...state,
				localId: null,
				idToken: null,
				logStatus: null
			};

		default:
			return state;
	}
};

export default reducer;
