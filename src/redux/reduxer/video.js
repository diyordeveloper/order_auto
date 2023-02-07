const initialState = {
    loading: false,
    moreLoading: false,
    firstLoading:true,
    showLoading:true,
    error: null,
    moreError: null,
    data: [],
    showData: [],
    isListEnd: false,
}

export const videoReduxer = (state = initialState, action) => {
    // console.log(action.type);
    switch (action.type) {
        case 'VIDEO_API_REQUEST':
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

        case 'VIDEO_API_SUCCESS':
            return {
                ...state,
                data: [...state.data, ...action.payload.data],
                error: '',
                loading: false,
                firstLoading: false,
                isListEnd: false,
                moreLoading: false
            }

        case 'VIDEO_API_FAILURE':
            return {
                ...state,
                error: action.error,
                loading: false,
                moreLoading: false
            }

        case 'VIDEO_API_LIST_END':
            return {
                ...state,
                isListEnd: true,
                loading: false,
                moreLoading: false,
                firstLoading: false
            }
        case 'VIDEO_API_REQUEST_SHOW':
            return {
                ...state,
                ...action.payload
                // showLoading: action.payload.loading,
                // showData: action.payload.data,
            }

        default: return state;
    }
}