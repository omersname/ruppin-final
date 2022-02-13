import React, {FC, MouseEventHandler} from 'react';
import {Chip} from '@mui/material';
import {FavoriteBorder, Favorite} from '@mui/icons-material';
import {red} from '@mui/material/colors';

type Props = {
  count: number;
  isLiked: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  disabled: boolean;
};

const LikeChip: FC<Props> = props => {
  const {
    count,
    isLiked,
    onClick,
    disabled,
  } = props;

  const renderIcon = () => (
    isLiked ?
      <Favorite fontSize={'small'} style={{fill: red[500]}} /> :
      <FavoriteBorder fontSize={'small'} />
  );

  return (
    <Chip
      icon={renderIcon()}
      variant={'outlined'}
      label={count}
      onClick={disabled ? undefined : onClick}
    />
  );
};

export default LikeChip;
