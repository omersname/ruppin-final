import React, {FC, CSSProperties} from 'react';
import {TextField, TextFieldProps} from '@mui/material';
import {objectUtils} from '../../dev/objects';

type Props = {
  label?: string;
  alignment?: CSSProperties['textAlign'];
  forwardRef?: (el: HTMLInputElement | null) => void;
  errorText?: string | false;
  isError?: boolean;
} & Omit<TextFieldProps, 'variant' | 'fullWidth'>;

export type InputProps = Props;

const Input: FC<Props> = props => {
  const {
    label,
    alignment = 'left',
    forwardRef,
    errorText,
    isError,
  } = props;

  const passProps = objectUtils.omitEntries(props, ['forwardRef', 'errorText', 'isError']);

  return (
    <TextField
      {...passProps}
      fullWidth
      label={!!errorText ? errorText : label}
      autoComplete={'off'}
      variant={'outlined'}
      inputRef={forwardRef}
      error={!!errorText || isError}
      inputProps={{
        style: {
          textAlign: alignment,
        },
      }}
    />
  );
};

export default Input;
