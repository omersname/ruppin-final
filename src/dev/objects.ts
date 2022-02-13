import {Prefix} from './types';

const omitEntries = <T extends {}>(obj: T, drops: (keyof T)[]) => {
  const clone = {...obj};
  for (const drop of drops) {
    delete clone[drop];
  }
  return clone;
};

const localizeKeys = <T extends {}>(obj: T) => {
  const keys = Object.keys(obj);
  return keys.reduce((acc, key) => ({
    ...acc, [`_${key}`]: obj[key as keyof T],
  }), {} as Record<Prefix<keyof T, '_'>, any>);
};

export const objectUtils = {
  omitEntries,
  localizeKeys,
};
