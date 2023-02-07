const initialState = {
    loading: true,
    moreLoading: false,
    error: null,
    moreError: null,
    data: [],
    isListEnd: false,
}

export const allCarsListReduxer = (state = initialState, action) => {
    // console.log(action.type);
    switch (action.type) {
        case 'ALL_CARS_API_REQUEST':
            if (action.payload.page === 1) {
                return { 
                    ...state, 
                    data: [],
                    loading: true 
                }
            } else {
                return { 
                    ...state,
                    moreLoading: true 
                }
            }

        case 'ALL_CARS_API_SUCCESS':
            return {
                ...state,
                data: [...state.data, ...action.payload],
                error: '',
                loading: false,
                isListEnd: false,
                moreLoading: false
            }

        case 'ALL_CARS_API_FAILURE':
            return {
                ...state,
                error: action.error,
                loading: false,
                moreLoading: false
            }

        case 'ALL_CARS_API_LIST_END':
            return {
                ...state,
                isListEnd: true,
                loading: false,
                moreLoading: false
            }

        default: return state;
    }
}