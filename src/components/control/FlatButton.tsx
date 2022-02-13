import React, {FC} from 'react';
import {Box} from '@mui/material';
import {objectUtils} from '../../dev/objects';
import {LoadingButton, LoadingButtonProps} from '@mui/lab';

type Props = {
  label?: string;
  pushToEnd?: boolean;
} & Omit<LoadingButtonProps, 'variant'>;

export type FlatButtonProps = Props;

const FlatButton: FC<Props> = props => {
  const {
    label,
    pushToEnd = false,
  } = props;

  const renderCore = () => {
    const passProps = objectUtils.omitEntries(props, ['pushToEnd']);
    return (
      <LoadingButton
        {...passProps}
        variant={'contained'}
      >
        {label}
      </LoadingButton>
    );
  };

  if (pushToEnd) {
    return (
      <Box display={'flex'} justifyContent={'flex-end'}>
        {renderCore()}
      </Box>
    );
  }

  return renderCore();
};

export default FlatButton;
