import * as actionTypes from './actionTypes';
import axios from 'axios';

//começa com init, dispara spinner, dispara o post, pega response do post, dispara sucess e apaga spinner

export const signUpFail = error => {
	return {
		type: actionTypes.SIGNUP_FAIL,
		error: error
	};
};

export const authSpinner = () => {
	return {
		type: actionTypes.AUTH_SPINNER
	};
};

//Async

export const authLogOut = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('localId');
	return {
		type: actionTypes.AUTH_LOGOUT
	};
};

export const checkAuthTimeout = expiresIn => {
	//desloga o usuario apos alguns segundos
	return dispatch => {
		setTimeout(() => {
			dispatch(authLogOut());
		}, expiresIn * 1000); //desloga em 1hora
	};
};

export const signUpSuccess = (localId, idToken) => {
	return {
		type: actionTypes.SIGNUP_SUCCESS,
		localId: localId,
		idToken: idToken
	};
};

export const signUpInit = (email, password) => {
	return dispatch => {
		dispatch(authSpinner());
		const authDataBackRequires = {
			email: email,
			password: password,
			returnSecureToken: true
		};
		axios
			.post(
				'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAuJ4Qy7-pWyhps3gyZQNoqsObgI87Idc4',
				authDataBackRequires
			)
			.then(response => {
				dispatch(signUpSuccess(response.data.localId, response.data.idToken));
				dispatch(checkAuthTimeout(response.data.expiresIn));
			})
			.catch(error => {
				dispatch(signUpFail(error.response.data.error.message));
			});
	};
};

export const loginSuccess = (localId, idToken) => {
	return {
		type: actionTypes.LOGIN_SUCCESS,
		localId: localId,
		idToken: idToken
	};
};

export const loginInit = (email, password) => {
	return dispatch => {
		dispatch(authSpinner());
		const loginData = {
			email: email,
			password: password,
			returnSecureToken: true
		};
		axios
			.post(
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAuJ4Qy7-pWyhps3gyZQNoqsObgI87Idc4',
				loginData
			)
			.then(response => {
				//ler sobre as 3 form abaixo no fim do arquivo:
				const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
				localStorage.setItem('token', response.data.idToken);
				localStorage.setItem('localId', response.data.localId);
				localStorage.setItem('expirationDate', expirationDate);
				dispatch(loginSuccess(response.data.localId, response.data.idToken));
				dispatch(checkAuthTimeout(response.data.expiresIn));
			})
			.catch(error => {
				dispatch(signUpFail(error.response.data.error.message));
			});
	};
};

export const initAppCheckIfLogin = () => {
	return dispatch => {
		const localIdFromLocalStorage = localStorage.getItem('localId');
		const tokenFromLocalStorage = localStorage.getItem('token');

		if (!tokenFromLocalStorage) {
			dispatch(authLogOut());
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			if (expirationDate < new Date()) {
				dispatch(authLogOut()); //se o tempo que tem logado for menor q agora, desloga
			} else {
				//se o usuario tiver logado, exec authSucess toda vez q der f5 e nao perde o login:
				dispatch(loginSuccess(localIdFromLocalStorage, tokenFromLocalStorage));
				//se o usuario tiver logado, exec checkauthtimeout contando qto tempo sobra com aquele login:
				dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
			}
		}
	};
};

/* 
//Aqui pegou a resposta do post e usou para armazenar no browser (localStorage.setItem)os dados do usuario para
quando mudar de tela por exemplo, permanecer logado se ja tiver feito login

.then(response => {
				
	//const para calcular apos ter feito login, quanto tempo pode ficar no site com aquele login
	const expirationDate= new Date(new Date().getTime() + response.data.expiresIn * 1000) //data de agora + o tempo que pode ficar
	localStorage.setItem('token',response.data.idToken) //grava no browser o obj token: o token que vier
	localStorage.setItem('expirationDate',expirationDate) //grava no browser o obj expirationDate: a const criada acima


	*/
