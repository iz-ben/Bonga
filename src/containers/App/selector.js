import { createSelector } from 'reselect';

const selectRoute = (state) => state.route;
const selectStories = (state) => state.bonga.shares;
const selectCurrentPage = (state) => state.bonga.currentPage;
const numPageItems = (state) => state.bonga.perPage;
const bonga = (state) => state.bonga;

const makeSelectLocation = createSelector(
    selectRoute,
    (routeState) => {
        //console.log(routeState, routeState.location)
        return routeState ? routeState.location:null
    }
);

const makeSelectPathname = createSelector(
    makeSelectLocation,
    (locationState) =>
    {
        //console.log(locationState.get('pathname'));
        return locationState ? locationState.pathname:null;
    }
);
//console.log(((state)=>state)())
const getVisibleStories = createSelector(
    selectStories,
    selectCurrentPage,
    numPageItems,
    (stories, currentPage, numItems)=>
    {
        //console.log(stories, currentPage, numItems)
    }
);

const getStories = createSelector(
    bonga,
    (stories)=>stories.shares
);

const getCurrentStories = createSelector(
    bonga,
    (stories)=>stories.currentStories
);

const getSelectedStory = (uuid)=> createSelector(
    getStories,
    (stories)=>stories.find((story)=>story.uuid===uuid)
);

export {
    makeSelectLocation,
    makeSelectPathname,
    getVisibleStories,
    getCurrentStories,
    getSelectedStory
};
