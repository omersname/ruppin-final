import React, {FC} from 'react';
import {Box, BoxProps} from '@mui/material';

type Props = Omit<BoxProps, 'display' | 'justifyContent' | 'alignItems'>;

const BoxCenter: FC<Props> = props => {
  const {
    children,
  } = props;

  return (
    <Box
      {...props}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      {children}
    </Box>
  );
};

export default BoxCenter;
