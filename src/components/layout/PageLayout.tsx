import React, {FC} from 'react';
import BoxCenter from '../usable/BoxCenter';
import {Container, Box} from '@mui/material';
import AppHeader from '../header/AppHeader';

type Props = {
  withHeader?: boolean;
};

const PageLayout: FC<Props> = props => {
  const {
    children,
    withHeader = true,
  } = props;


  const renderAppHeader = () => {
    if (withHeader) {
      return <AppHeader />;
    }
  };

  return (
    <Box>
      {renderAppHeader()}
      <Container>
        <BoxCenter
          flexDirection={'column'}
          paddingY={8}
        >
          {children}
        </BoxCenter>
      </Container>
    </Box>
  );
};

export default PageLayout;
