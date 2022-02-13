import _ from 'lodash';

const isAllTrue = (values: boolean[]) => {
  return values.every(Boolean);
};

const isAllFalse = (values: boolean[]) => {
  return !isOneTrue(values);
};

const isOneTrue = (values: boolean[]) => {
  return values.some(Boolean);
};

const isEmpty = (arr: any[]) => {
  return !arr || _.isEmpty(arr);
};

const isNonEmpty = (arr: any[]) => {
  return !isEmpty(arr);
};

const dropItem = <T>(arr: T[], item: T) => {
  const clone = [...arr];
  const index = clone.indexOf(item);
  (index >= 0) && clone.splice(index, 1);
  return clone;
};

const dropItemInplace = <T>(arr: T[], item: T) => {
  const index = arr.indexOf(item);
  index && arr.splice(index, 1);
};

export const arrayUtils = {
  isAllTrue,
  isAllFalse,
  isOneTrue,
  isEmpty,
  isNonEmpty,
  dropItem,
  dropItemInplace,
};
