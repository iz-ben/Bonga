import {WHATS_ON_YOUR_MIND} from "../constants";
import {uniqueArray} from "../utils/helpers";

export const SELECT_EDITOR = 'bonga/SELECT_EDITOR';
export const TYPE_TEXT = 'bonga/TYPE_TEXT';
export const CLOSE_EDITOR = 'bonga/CLOSE_EDITOR';
export const SUBMIT_SHARE = 'bonga/SUBMIT_SHARE';
export const SUBMIT_SHARE_SUCCESS = 'bonga/SUBMIT_SHARE_SUCCESS';
export const SUBMIT_SHARE_ERROR = 'bonga/SUBMIT_SHARE_ERROR';
export const FETCH_SHARES = 'bonga/FETCH_SHARES';
export const FETCH_SHARES_SUCCESSFUL = 'bonga/FETCH_SHARES_SUCCESSFUL';
export const FETCH_SHARES_ERROR = 'bonga/FETCH_SHARES_ERROR';

const initialState = {
    loading:false,
    editorActive:false,
    editorContent:'',
    replyTo:null,
    placeholder:WHATS_ON_YOUR_MIND,
    shares:[],
    error:null,
    currentPage:1
};

export default (state = initialState, action) => {

    switch (action.type) {
        case FETCH_SHARES:
            return {
                ...state,
                loading: true
            };
        case FETCH_SHARES_SUCCESSFUL:
            return {
                ...state,
                loading: false,
                shares:uniqueArray([...state.shares, ...action.data], 'id')
            };
        case FETCH_SHARES_ERROR:
            return {
                ...state,
                loading: false,
                error:action.error
            };
        case SELECT_EDITOR:
            return {
                ...state,
                editorActive: true
            };

        case CLOSE_EDITOR:
            return {
                ...state,
                editorActive: false
            };

        case TYPE_TEXT:
            return {
                ...state,
                editorContent:action.content
            };

        default:
            //console.log(state)
            return state
    }
}

export const fetchShares = ( page = 1 ) => {
    return {
        type: FETCH_SHARES,
        page:page
    };
};

export const fetchSharesSuccessful = ( shares ) => {
    return {
        type: FETCH_SHARES_SUCCESSFUL,
        data:shares
    }
};

export const fetchSharesError = ( error ) => {
    return {
        type: FETCH_SHARES_ERROR,
        error:error
    }
};

export const typeText = ( text ) => {
    return {
        type: TYPE_TEXT,
        content:text
    }
};


export const selectEditor = () => {
    return {
        type: SELECT_EDITOR
    }
};


export const closeEditor = () => {
    return {
        type: CLOSE_EDITOR
    }
};