import React, {FC} from 'react';
import {Typography} from '@mui/material';

type Props = {
  text?: string;
};

const Caption: FC<Props> = props => {
  const {
    text,
  } = props;

  return (
    <Typography
      display={'flex'}
    >
      {text}
    </Typography>
  );
};

export default Caption;
