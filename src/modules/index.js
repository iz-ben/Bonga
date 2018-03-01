import { combineReducers } from 'redux'
import bonga from './bonga'
import {fromJS} from "immutable";
import { LOCATION_CHANGE } from 'react-router-redux';


// Initial routing state
const routeInitialState = fromJS({
    location: null,
});

/**
 * Merge route into the global application state
 */
const routeReducer = (state = routeInitialState, action) => {
    //console.log(action);
    switch (action.type)
    {
        case LOCATION_CHANGE:
            return {...state, location:action.payload};
        default:
            return state;
    }
};



/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
    return combineReducers({
        route: routeReducer,
        bonga,
        ...injectedReducers,
    });
}