import React, {FC} from 'react';
import {Box, Divider} from '@mui/material';

type Props = {
  space?: number;
  horizontal?: boolean;
  divider?: boolean;
};

const Spacer: FC<Props> = props => {
  const {
    space = 1,
    horizontal = false,
    divider,
  } = props;

  const getSpaceVal = () => 2 * space;

  const passProps = {[horizontal ? 'paddingRight' : 'paddingBottom']: getSpaceVal()};

  if (divider) {
    return (
      <Box paddingY={getSpaceVal()}>
        <Divider />
      </Box>
    );
  }

  return <Box {...passProps} />;
};

export default Spacer;
