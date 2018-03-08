import {
    FETCH_STORIES_API_ENDPOINT, NOTIFICATIONS, SLOGANS, STORY_RECAPTCHA_ERROR, STORY_SUBMITTED_ERROR,
    STORY_SUBMITTED_SUCCESSFULLY,
    WHATS_ON_YOUR_MIND
} from "../constants";
import {displayNotification, uniqueArray} from "../utils/helpers";
import { animateScroll as scroll } from 'react-scroll';

export const SELECT_EDITOR = 'bonga/SELECT_EDITOR';
export const TYPE_TEXT = 'bonga/TYPE_TEXT';
export const CLOSE_EDITOR = 'bonga/CLOSE_EDITOR';
export const SUBMIT_STORY = 'bonga/SUBMIT_STORY';
export const SUBMIT_STORY_VALIDATION_ERROR = 'bonga/SUBMIT_STORY_VALIDATION_ERROR';
export const SUBMIT_STORY_SUCCESS = 'bonga/SUBMIT_STORY_SUCCESS';
export const SUBMIT_STORY_ERROR = 'bonga/SUBMIT_STORY_ERROR';
export const SUBMIT_REPLY = 'bonga/SUBMIT_REPLY';
export const FETCH_SHARES = 'bonga/FETCH_SHARES';
export const FETCH_SHARES_SUCCESSFUL = 'bonga/FETCH_SHARES_SUCCESSFUL';
export const FETCH_SHARES_ERROR = 'bonga/FETCH_SHARES_ERROR';
export const PAGINATION_CHANGE =  'bonga/PAGINATION_CHANGE';
export const RECAPTCHA_CHANGE =  'bonga/RECAPTCHA_CHANGE';
export const RECAPTCHA_ERROR =  'bonga/RECAPTCHA_ERROR';

export const CHANGE_SLOGAN =  'bonga/CHANGE_SLOGAN';

/**
 * It's sort of redundant to have editorContent and replyEditorContent fields,
 * but there's is a bug with resetting tinymce which forces me to have this type of usage
 *
 * @type Object
 * */
const initialState = {
    loading:false,
    editorActive:false,
    editorContent:'',
    replyEditorContent:'',
    replyTo:null,
    placeholder:WHATS_ON_YOUR_MIND,
    shares:[],
    error:null,
    currentPage:1,
    currentStories:[],
    perPage:10,
    total:0,
    pageIndex:{1:[0,10]},
    recaptcha:'',
    slogan:SLOGANS.pop()
};

export default (state = initialState, action) => {

    switch (action.type) {
        case FETCH_SHARES:
            return {
                ...state,
                loading: true
            };
        case FETCH_SHARES_SUCCESSFUL:

            //console.log(newState)
            scroll.scrollToTop(0);
            return {
                ...state,
                ...action.meta,
                loading: false,
                shares:uniqueArray([...state.shares, ...action.data], 'id'),
                currentStories:[...action.data]
            };
        case FETCH_SHARES_ERROR:
            return {
                ...state,
                loading: false,
                error:action.error
            };
        case SUBMIT_STORY:
            //console.log(SUBMIT_STORY, action);
            return {
                ...state,
                loading: true,
            };
        case SUBMIT_STORY_SUCCESS:
            displayNotification(STORY_SUBMITTED_SUCCESSFULLY);
            return {
                ...state,
                loading: false,
                editorActive:false,
                editorContent:'',
                shares:uniqueArray([...[action.story], ...state.shares ], 'id')
            };
        case SUBMIT_STORY_ERROR:
            return {
                ...state,
                loading: false,
                error:action.error
            };
        case SUBMIT_STORY_VALIDATION_ERROR:
            displayNotification(STORY_SUBMITTED_ERROR, NOTIFICATIONS.ERROR);
            return {
                ...state
            };
        case SUBMIT_REPLY:
            return {
                ...state,
                loading: true,
            };
        case RECAPTCHA_ERROR:
            displayNotification(STORY_RECAPTCHA_ERROR, NOTIFICATIONS.ERROR);
            return {
                ...state
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
            console.log(TYPE_TEXT, action.content);
            return {
                ...state,
                editorContent:action.content
            };
        case PAGINATION_CHANGE:
            //console.log(action)
            return {
                ...state,
                currentPage:action.page
            };
        case RECAPTCHA_CHANGE:
            //console.log('recaptcha',action);
            return{
                ...state,
                recaptcha:action.value
            };

        case CHANGE_SLOGAN:
            return {
                ...state,
                slogan:action.text
            };

        default:
            //console.log(state)
            return state
    }
}

export const fetchShares = ( url = FETCH_STORIES_API_ENDPOINT ) => {
    return {
        type: FETCH_SHARES,
        url:url
    };
};

/**
 *
 * @param data
 * @param meta
 * @returns {{type: string, data: *}}
 */
export const fetchSharesSuccessful = ( {data, meta} ) => {
    return {
        type: FETCH_SHARES_SUCCESSFUL,
        data:data,
        meta:{
            currentPage:meta.current_page,
            perPage:meta.per_page,
            total:meta.total
        }
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

export const submitStory = ( text, recaptcha ) => {

    //console.log(typeof text, text)
    if(text==='')
    {
        return {
            type:SUBMIT_STORY_VALIDATION_ERROR
        }
    }
    //console.log(typeof recaptcha, recaptcha)

    if (recaptcha==='')
    {
        return {
            type:RECAPTCHA_ERROR
        }
    }
    //console.log(recatpcha)
    return {
        type: SUBMIT_STORY,
        content: text,
        recaptcha:recaptcha
    }
};

/**
 * TODO: Remember to reintroduce recaptcha
 * @param text
 * @param storyID
 * @param recaptcha
 */
export const submitReply = (text, storyID, recaptcha = null)=>
{
    //console.log(SUBMIT_REPLY,storyID, text);
    if(text==='')
    {
        return {
            type:SUBMIT_STORY_VALIDATION_ERROR
        }
    }

    return {
        type:SUBMIT_REPLY,
        in_reply_to:storyID,
        content:text,
        recaptcha:recaptcha
    }
};

export const submitStorySuccess = ( story ) => {
    return {
        type: SUBMIT_STORY_SUCCESS,
        story: {...story}
    }
};

export const submitStoryError = ( error ) => {
    return {
        type: SUBMIT_STORY_ERROR,
        error: error
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

export const recaptchaChange = (value) => {
    return {
        type: RECAPTCHA_CHANGE,
        value:value
    }
};

export const selectPaginationPage = (page)=> {

    return {
        type: PAGINATION_CHANGE,
        page: page
    }
};

export const changeSlogan = (text)=> {

    return {
        type: CHANGE_SLOGAN,
        text: text
    }
};