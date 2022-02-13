import React, {FC} from 'react';
import {Avatar} from '@mui/material';
import {mutate} from '../../handlers/mutate';

type Props = {
  name?: string;
  color?: string;
  small?: boolean;
};

const UserAvatar: FC<Props> = props => {
  const {
    name,
    color,
    small = false,
  } = props;

  const renderOutput = () => {
    const initials = mutate.getNameInitials(name);
    return initials?.toUpperCase();
  };

  const getSize = () => {
    return small ? 32 : 64;
  };

  return (
    <Avatar
      sx={{
        width: getSize(),
        height: getSize(),
        bgcolor: color,
      }}
    >
      {renderOutput()}
    </Avatar>
  );
};

export default UserAvatar;
