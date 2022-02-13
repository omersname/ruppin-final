import React, {FC, useRef, useEffect, useState} from 'react';
import Image from 'next/image';
import {Box, CircularProgress} from '@mui/material';
import BoxCenter from '../usable/BoxCenter';
import {grey} from '@mui/material/colors';

type Props = {
  src: string;
};

const SquareImg: FC<Props> = props => {
  const {
    src,
  } = props;

  const [height, setHeight] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const boxRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (boxRef.current) {
      setHeight(boxRef.current.clientWidth);
    }
  }, []);

  const onImgLoaded = () => {
    setIsLoading(false);
  };

  const renderLoader = () => (
    <BoxCenter height={'100%'} bgcolor={grey[800]}>
      <CircularProgress />
    </BoxCenter>
  );

  const renderImg = () => (
    <Image
      src={src}
      alt={''}
      layout={'fill'}
      objectFit={'cover'}
      objectPosition={'center'}
      onLoadingComplete={onImgLoaded}
    />
  );

  return (
    <Box
      position={'relative'}
      ref={boxRef}
      height={height}
    >
      {isLoading && renderLoader()}
      {renderImg()}
    </Box>
  );
};

export default SquareImg;
