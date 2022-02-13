import {PropertyProps} from './properties';

export type UserProps = {
  id?: string;
  email?: string;
  name?: string;
  avatarColor?: string;
  properties?: PropertyProps['id'][];
}
