const initialState = {
    loading: true,
    moreLoading: false,
    error: null,
    moreError: null,
    firstLoading: true,
    data: [],
    isListEnd: false,
}

export const carsMyAnonsReduxer = (state = initialState, action) => {
    // console.log(action.type);
    switch (action.type) {
        case 'MY_ANONS_API_REQUEST':
            if (action.payload.page === 1) {
                return { 
                    ...state, 
                    data: [],
                    loading: true,
                    firstLoading: true, 
                }
            } else {
                return { 
                    ...state,
                    moreLoading: true,
                    firstLoading: false,
                }
            }

        case 'MY_ANONS_API_SUCCESS':
            return {
                ...state,
                data: [...state.data, ...action.payload],
                error: '',
                loading: false,
                isListEnd: false,
                firstLoading: false,
                moreLoading: false
            }

        case 'MY_ANONS_API_FAILURE':
            return {
                ...state,
                error: action.error,
                loading: false,
                moreLoading: false
            }

        case 'MY_ANONS_API_LIST_END':
            return {
                ...state,
                isListEnd: true,
                loading: false,
                moreLoading: false
            }

        default: return state;
    }
}