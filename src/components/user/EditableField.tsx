import React, {FC, useState} from 'react';
import Mention from '../typography/Mention';
import Text from '../typography/Text';
import {Box} from '@mui/material';
import {Edit} from '@mui/icons-material';
import EditableInput from '../control/EditableInput';
import Caption from '../typography/Caption';
import {useValidate} from '../../hooks/useValidate';
import IconPress from '../control/IconPress';

type Props = {
  label?: string;
  value?: string;
  onSubmit?: (value: string) => void;
  editable?: boolean;
  asCaption?: boolean;
  validate?: (value: string) => boolean;
};

const EditableField: FC<Props> = props => {
  const {
    label,
    value,
    onSubmit,
    editable,
    asCaption,
    validate,
  } = props;

  const [inputValue, setInputValue, inputValueError] = useValidate<string>(value ?? '', validate);
  const [isEditEnabled, setIsEditEnabled] = useState<boolean>(false);

  const onSubmitClick = () => {
    onSubmit?.(inputValue);
    setIsEditEnabled(false);
  };

  const onCancelClick = () => {
    setIsEditEnabled(false);
  };

  const renderEditIcon = () => {
    return editable && (
      <IconPress
        Icon={Edit}
        onClick={() => setIsEditEnabled(true)}
      />
    );
  };

  const renderField = () => {
    return (
      <Box display={'flex'} alignItems={'center'}>
        {asCaption ? <Caption text={value} /> : <Text text={value} />}
        {renderEditIcon()}
      </Box>
    );
  };

  const renderInput = () => {
    return (
      <EditableInput
        onSubmit={onSubmitClick}
        onCancel={onCancelClick}
        inputProps={{
          value: inputValue,
          onChange: e => setInputValue(e.target.value),
          errorText: inputValueError && (label || inputValue),
          isError: inputValueError,
        }}
      />
    );
  };

  return (
    <Box>
      {label && <Mention text={label} />}
      {isEditEnabled ? renderInput() : renderField()}
    </Box>
  );
};

export default EditableField;
