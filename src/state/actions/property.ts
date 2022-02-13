import {store} from '../store';
import {PropertyProps} from '../../types/properties';
import {PROPERTY_ACTION} from '../reducers/property';

const setPropertyProps = (propertyProps: PropertyProps) => {
  if (propertyProps) {
    store.dispatch({type: PROPERTY_ACTION.PROPERTY_PROPS, payload: propertyProps});
  }
};

export const propertyActions = {
  setPropertyProps,
};
