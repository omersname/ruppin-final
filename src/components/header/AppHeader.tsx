import React, {FC} from 'react';
import {AppBar, Toolbar, Box, Stack} from '@mui/material';
import {withMapState} from '../../hoc/withMapState';
import {AdminState} from '../../state/reducers/admin';
import HeaderAvatar from './HeaderAvatar';
import TextButton from '../control/TextButton';
import {lang} from '../../content';
import {navigate} from '../../handlers/navigate';
import FlatButton from '../control/FlatButton';
import Spacer from '../usable/Spacer';

type Props = {} & Partial<AdminState>;

const AppHeader: FC<Props> = props => {
  const {
    userProps,
    isLogged,
  } = props;

  const renderMenu = () => {
    return (
      <Stack direction={'row'} flex={1} spacing={1}>
        <TextButton
          label={lang('HEADER.MENU_ITEM.HOME.LABEL')}
          size={'small'}
          color={'inherit'}
          onClick={() => navigate.home()}
        />
        <TextButton
          label={lang('HEADER.MENU_ITEM.EXPLORE.LABEL')}
          size={'small'}
          color={'inherit'}
          onClick={() => navigate.explore()}
        />
      </Stack>
    );
  };

  const renderActions = () => {
    if (isLogged) {
      return <HeaderAvatar user={userProps} />;
    }
    return (
      <Box display={'flex'}>
        <TextButton
          label={lang('HEADER.ACTIONS.LOGIN.LABEL')}
          size={'small'}
          onClick={() => navigate.login()}
        />
        <Spacer horizontal />
        <FlatButton
          label={lang('HEADER.ACTIONS.REGISTER.LABEL')}
          size={'small'}
          onClick={() => navigate.register()}
        />
      </Box>
    );
  };

  return (
    <AppBar position={'relative'}>
      <Toolbar>
        {renderMenu()}
        {renderActions()}
      </Toolbar>
    </AppBar>
  );
};

export default withMapState(AppHeader, {extract: ['admin']});
