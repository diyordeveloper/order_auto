const initialState = {
    loading: false,
    moreLoading: false,
    error: null,
    total: null,
    firstLoading:true,
    moreError: null,
    data: [],
    like_id: [],
    isListEnd: false,
}

export const carsFlatListReduxer = (state = initialState, action) => {
    // console.log(action.type);
    switch (action.type) {
        case 'API_REQUEST':
            if (action.payload.page === 1) {
                return { 
                    ...state, 
                    data: [],
                    loading: true 
                }
            } else {
                return { 
                    ...state, 
                    moreLoading: true,
                    firstLoading:false
                }
            }

        case 'API_SUCCESS':
            return {
                ...state,
                data: [...state.data, ...action.payload.data],
                error: '',
                total:action.payload.total,
                loading: false,
                firstLoading: false,
                isListEnd: false,
                moreLoading: false
            }

        case 'API_FAILURE':
            return {
                ...state,
                error: action.error,
                firstLoading: false,
                loading: false,
                moreLoading: false
            }

        case 'API_LIST_END':
            return {
                ...state,
                isListEnd: true,
                firstLoading: false,
                loading: false,
                moreLoading: false
            }
        case 'actionCarLikeID':
            return {
                ...state,
                like_id:action.payload.ids
            }

        default: return state;
    }
}