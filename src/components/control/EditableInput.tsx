import React, {FC, useRef, useEffect} from 'react';
import {Box} from '@mui/material';
import Input, {InputProps} from './Input';
import {Check, Clear} from '@mui/icons-material';
import Spacer from '../usable/Spacer';
import IconPress from './IconPress';

type Props = {
  onSubmit: () => void;
  onCancel: () => void;
  inputProps?: InputProps;
};

const EditableInput: FC<Props> = props => {
  const {
    onSubmit,
    onCancel,
    inputProps,
  } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Box display={'flex'} alignItems={'center'}>
      <Input
        {...inputProps}
        size={'small'}
        forwardRef={el => inputRef.current = el}
      />
      <Spacer horizontal />
      <IconPress disabled={inputProps?.isError} Icon={Check} onClick={onSubmit} />
      <IconPress Icon={Clear} onClick={onCancel} />
    </Box>
  );
};

export default EditableInput;
