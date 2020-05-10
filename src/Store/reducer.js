const initialState = {
	userName: null,
	password: null
}

const reducer = (state=initialState, action) => {
	switch(action.type){
		case 'USERNAME':
			return {
				...state,
				userName: action.event.target.value
			}
		case 'PASSWORD':
			return {
				...state,
				password: action.event.target.value
			}

		default :
			return state
	}
}

export default reducer;