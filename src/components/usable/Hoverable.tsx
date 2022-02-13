import React, {FC} from 'react';
import {Box, BoxProps} from '@mui/material';
import {objectUtils} from '../../dev/objects';

type Props = {
  onHover: (isHover: boolean) => void;
  disabled?: boolean;
} & BoxProps;

const Hoverable: FC<Props> = props => {
  const {
    onHover,
    onClick,
    children,
    disabled,
  } = props;

  const passProps = objectUtils.omitEntries(props, ['onHover']);

  const onMouseIn = () => {
    !disabled && onHover(true);
  };

  const onMouseOut = () => {
    !disabled && onHover(false);
  };

  return (
    <Box
      {...passProps}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={onMouseIn}
      onMouseLeave={onMouseOut}
      style={{
        cursor: (onClick && !disabled) ? 'pointer' : 'auto',
      }}
    >
      {children}
    </Box>
  );
};

export default Hoverable;
