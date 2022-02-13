import React, {FC} from 'react';
import {Chip, Avatar} from '@mui/material';
import {mutate} from '../../handlers/mutate';
import {navigate} from '../../handlers/navigate';

type Props = {
  userId?: string;
  name?: string;
  color?: string;
};

const UserChip: FC<Props> = props => {
  const {
    userId,
    name,
    color,
  } = props;

  const onClick = () => {
    return userId && navigate.profile(userId);
  };

  const renderAvatar = () => {
    const initials = mutate.getNameInitials(name);
    return (
      <Avatar sx={{bgcolor: color}}>
        {initials?.toUpperCase()}
      </Avatar>
    );
  };

  return (
    <Chip
      label={name}
      avatar={renderAvatar()}
      onClick={onClick}
    />
  );
};

export default UserChip;
