import React, {FC} from 'react';
import {Typography} from '@mui/material';

type Props = {
  text: string;
  onClick?: () => void;
};

const Caption: FC<Props> = props => {
  const {
    text,
  } = props;

  return (
    <Typography
      display={'inline-flex'}
      style={{
        opacity: .5,
      }}
    >
      {text}
    </Typography>
  );
};

export default Caption;
