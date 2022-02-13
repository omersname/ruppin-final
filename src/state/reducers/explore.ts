import {AnyAction} from 'redux';
import {PropertyProps} from '../../types/properties';

export type ExploreState = {
  properties: PropertyProps[];
};

const initState: ExploreState = {
  properties: [],
};

export enum EXPLORE_ACTION {
  PROPERTIES = 'PROPERTIES'
}

export const exploreReducer = (state: ExploreState = initState, action: AnyAction) => {
  const {type, payload} = action;
  switch (type as EXPLORE_ACTION) {
    case EXPLORE_ACTION.PROPERTIES:
      return {...state, properties: payload};
  }
  return state;
};
