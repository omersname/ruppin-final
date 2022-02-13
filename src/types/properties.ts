import {UserProps} from './users';

export type PropertyProps = {
  id: string;
  name: string;
  url: string;
  owner: UserProps['id'];
  likes: UserProps['id'][];
};
