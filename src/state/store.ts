import {createStore, combineReducers} from '@reduxjs/toolkit';
import {adminReducer, AdminState} from './reducers/admin';
import {SystemState, systemReducer} from './reducers/system';
import {PropertyState, propertyReducer} from './reducers/property';
import {exploreReducer, ExploreState} from './reducers/explore';

export type AppState = {
  admin: AdminState;
  system: SystemState;
  property: PropertyState;
  explore: ExploreState;
};

const rootReducer = combineReducers({
  admin: adminReducer,
  system: systemReducer,
  property: propertyReducer,
  explore: exploreReducer,
});

export const store = createStore(rootReducer);
