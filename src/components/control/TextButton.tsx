import React, {FC} from 'react';
import {ButtonProps, Button} from '@mui/material';

type Props = {
  label: string;
} & Omit<ButtonProps, 'label'>;

export type TextButtonProps = Props;

const TextButton: FC<Props> = props => {
  const {
    label,
  } = props;

  return (
    <Button
      {...props}
      variant={'text'}
    >
      {label}
    </Button>
  );
};

export default TextButton;
