import { createSelector } from 'reselect';

const selectRoute = (state) => state.route;

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

export {
    makeSelectLocation,
    makeSelectPathname
};
