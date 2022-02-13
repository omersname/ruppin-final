import {store} from '../store';
import {PropertyProps} from '../../types/properties';
import {EXPLORE_ACTION} from '../reducers/explore';

const setProperties = (properties: PropertyProps[]) => {
  if (properties) {
    store.dispatch({type: EXPLORE_ACTION.PROPERTIES, payload: properties});
  }
};

export const exploreActions = {
  setProperties,
};
