import React, {FC} from 'react';
import {CARD_LAYOUT_WIDTH} from '../../config/layout';
import {Box, Paper} from '@mui/material';

type Props = {
  fluid?: boolean;
};

const PageCard: FC<Props> = props => {
  const {
    children,
    fluid = false,
  } = props;

  return (
    <Paper elevation={4}>
      <Box
        width={fluid ? undefined : CARD_LAYOUT_WIDTH}
        padding={4}
      >
        {children}
      </Box>
    </Paper>
  );
};

export default PageCard;
