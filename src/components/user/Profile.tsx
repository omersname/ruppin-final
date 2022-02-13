import React, {FC} from 'react';
import PageLayout from '../layout/PageLayout';
import {UserProps} from '../../types/users';
import {withMapState} from '../../hoc/withMapState';
import {AdminState} from '../../state/reducers/admin';
import DetailsSection from './DetailsSection';
import PropertiesSection from './PropertiesSection';
import ColumnSpaces from '../usable/ColumnSpaces';

type Props = {
  user: UserProps;
  updateUser: (user: UserProps) => void;
  isLoading: boolean;
  admin?: AdminState;
};

const Profile: FC<Props> = props => {
  const {
    user,
    updateUser,
    admin,
  } = props;

  const isOwner = !!admin?.isLogged && admin?.userProps.id === user.id;
  const userOutputProps: UserProps = isOwner ? admin.userProps : user;

  const onNameSubmit = (name: string) => {
    if (admin && name !== admin.userProps.name) {
      updateUser({...admin.userProps, name});
    }
  };

  return (
    <PageLayout>
      <ColumnSpaces>
        <DetailsSection
          userProps={userOutputProps}
          onNameSubmit={onNameSubmit}
          shouldEdit={isOwner}
        />
        <PropertiesSection
          userProps={userOutputProps}
          shouldEdit={isOwner}
        />
      </ColumnSpaces>
    </PageLayout>
  );
};

export default withMapState(Profile, {
  extract: ['admin'],
  spread: false,
});
