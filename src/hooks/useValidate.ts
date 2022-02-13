import {useState, Dispatch, SetStateAction} from 'react';
import _ from 'lodash';
import {useUpdate} from './useUpdate';

const BOUNCE = 0;

export const useValidate = <T>(initValue: T, validateFn?: (evaluate: T) => Promise<boolean> | boolean) => {
  const [value, setValue] = useState<T>(initValue);
  const [error, setError] = useState<boolean | undefined>(undefined);

  const bouncer = _.debounce(setError, BOUNCE);

  useUpdate(() => {
    if (validateFn) {
      (async () => {
        const isValid = await validateFn(value);
        bouncer(!isValid);
      })();
    }
  }, [value]);

  return [value, setValue, error] as [T, Dispatch<SetStateAction<T>>, boolean | undefined];
};
