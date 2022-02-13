import React, {FC, useRef, useState, Fragment, useEffect} from 'react';
import {Box} from '@mui/material';
import Input from './Input';
import Spacer from '../usable/Spacer';

type Props = {
  count: number;
  value: string;
  onValueChange: (value: string) => void;
};

const InputBlocks: FC<Props> = props => {
  const {
    count,
    value,
    onValueChange,
  } = props;

  const initValues = value ? value.split('') : Array(count).fill('');
  const [values, setValues] = useState<string[]>(initValues);

  const inputRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    onValueChange(values.join(''));
  }, [values]);

  const setValue = (value: string, index: number) => {
    setValues(prev => {
      prev[index] = value;
      return [...prev];
    });
  };

  const setRef = (element: HTMLDivElement | null, index: number) => {
    if (inputRefs.current && element) {
      inputRefs.current[index] = element;
    }
  };

  const focusInput = (index: number) => {
    if (inputRefs.current) {
      inputRefs.current[index].focus();
    }
  };

  const focusNext = (index: number) => {
    const isIndexValid = index < count - 1;
    if (isIndexValid) {
      focusInput(index + 1);
    }
  };

  const focusPrev = (index: number) => {
    const isIndexValid = index > 0;
    if (isIndexValid) {
      focusInput(index - 1);
    }
  };

  const onChange = (value: string, index: number) => {
    if (values[index] === '') {
      setValue(value, index);
      return focusNext(index);
    }
    if (value === '') {
      return setValue(value, index);
    }
    setValue(value[1], index);
    focusNext(index);
  };

  const onKeyPress = (key: string, index: number) => {
    const shouldMoveBackwards = key === 'Backspace' && values[index] === '';
    if (shouldMoveBackwards) {
      setTimeout(() => {
        focusPrev(index);
      }, 50);
    }
  };

  return (
    <Box display={'flex'}>
      {[...Array(count)].map((_, i) => {
        const isLast = i + 1 === count;
        return (
          <Fragment key={i}>
            <Input
              alignment={'center'}
              value={values[i].toUpperCase()}
              onChange={e => onChange(e.target.value, i)}
              onKeyDown={e => onKeyPress(e.key, i)}
              forwardRef={el => setRef(el, i)}
            />
            {!isLast && <Spacer horizontal />}
          </Fragment>
        );
      })}
    </Box>
  );
};

export default InputBlocks;
