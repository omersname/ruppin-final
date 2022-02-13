import {NextPage} from 'next';
import {useSelector} from 'react-redux';
import {AppState} from '../state/store';

type Options = {
  extract?: (keyof AppState)[];
  spread?: boolean;
};

export const withMapState = <T extends {}>(Component: NextPage<T>, options: Options = {}) => {
  const {extract, spread = true} = options;

  const select = (state: AppState) => {
    if (extract) {
      return extract.reduce((acc: AppState, k: keyof AppState) => {
        return {...acc, [k]: state[k]};
      }, {} as AppState);
    }
    return state;
  };

  return (props: T) => {
    const state = useSelector(select);

    let passState = state;
    if (spread) {
      const keys = Object.keys(state) as (keyof AppState)[];
      passState = keys.reduce((acc: AppState, k: keyof AppState) => {
        return {...acc, ...state[k]};
      }, {} as AppState);
    }

    const passProps = {
      ...props,
      ...passState,
    };

    return <Component {...passProps} />;
  };
};
