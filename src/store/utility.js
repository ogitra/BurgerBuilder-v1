//func para deixar o switch do reducer mais limpo

export const updateObjects = (oldState, newState) => {
	return {
		...oldState,
		...newState
	};
};
