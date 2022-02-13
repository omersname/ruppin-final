import {AnyAction} from 'redux';
import {PropertyProps} from '../../types/properties';

export type PropertyState = Partial<PropertyProps>;

const initState: PropertyState = {};

export enum PROPERTY_ACTION {
  PROPERTY_PROPS = 'PROPERTY_PROPS'
}

export const propertyReducer = (state: PropertyState = initState, action: AnyAction) => {
  const {type, payload} = action;
  switch (type as PROPERTY_ACTION) {
    case PROPERTY_ACTION.PROPERTY_PROPS:
      return {...state, ...payload};
  }
  return state;
};
