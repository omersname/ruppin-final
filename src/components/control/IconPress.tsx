import React, {FC} from 'react';
import {IconButton, IconButtonProps} from '@mui/material';
import {objectUtils} from '../../dev/objects';

type Props = {
  Icon: any;
} & IconButtonProps;

const IconPress: FC<Props> = props => {
  const {
    Icon,
  } = props;

  const passProps = objectUtils.omitEntries(props, ['Icon']);

  return (
    <IconButton
      {...passProps}
      size={'small'}
    >
      <Icon fontSize={'small'} />
    </IconButton>
  );
};

export default IconPress;
