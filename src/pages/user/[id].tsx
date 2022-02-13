import React, {useState} from 'react';
import {NextPage, NextPageContext} from 'next';
import Profile from '../../components/user/Profile';
import {UserProps} from '../../types/users';
import {userDatabase} from '../../database/users';
import {adminActions} from '../../state/actions/admin';

type Props = {
  user: UserProps;
};

const ProfilePage: NextPage<Props> = props => {
  const {
    user,
  } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateUser = async (user: UserProps) => {
    setIsLoading(true);
    adminActions.setUserProps(user);
    await userDatabase.update(user);
    setIsLoading(false);
  };

  return (
    <Profile
      user={user}
      updateUser={updateUser}
      isLoading={isLoading}
    />
  );
};

ProfilePage.getInitialProps = async (context: NextPageContext): Promise<Props> => {
  const {query: {id}} = context;
  const user = await userDatabase.getById(id as string);
  return {user};
};

export default ProfilePage;
