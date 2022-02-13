import React, {FC, useState, useRef} from 'react';
import UserAvatar from '../user/UserAvatar';
import {IconButton, Menu, MenuItem} from '@mui/material';
import {UserProps} from '../../types/users';
import {lang} from '../../content';
import {CatchError} from '../../types/utils';
import {API_ENDPOINT} from '../../config/endpoints';
import {http} from '../../services/http';
import {systemActions} from '../../state/actions/system';
import {navigation} from '../../services/navigation';
import {navigate} from '../../handlers/navigate';

type Props = {
  user?: UserProps;
};

const HeaderAvatar: FC<Props> = props => {
  const {
    user,
  } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const wrapperRef = useRef(null);

  const onAvatarClick = () => {
    setIsOpen(prev => !prev);
  };

  const onProfileClick = () => {
    const userId = user?.id;
    if (userId) {
      return navigate.profile(userId);
    }
  }

  const onLogoutClick = async () => {
    try {
      const endpoint = API_ENDPOINT.LOGOUT();
      await http.get(endpoint);
      navigation.refresh();
    } catch (err: CatchError) {
      const message = lang('AUTH.LOGOUT.GENERAL.ERROR');
      systemActions.setTopNotification(message);
    }
  };

  const renderMenu = () => {
    return (
      <Menu
        open={isOpen}
        anchorEl={wrapperRef.current}
      >
        <MenuItem onClick={onProfileClick}>
          {lang('HEADER.USER_SETTING.PROFILE.LABEL')}
        </MenuItem>
        <MenuItem onClick={onLogoutClick}>
          {lang('HEADER.USER_SETTING.LOGOUT.LABEL')}
        </MenuItem>
      </Menu>
    );
  };

  return (
    <IconButton
      size={'small'}
      ref={wrapperRef}
      onClick={onAvatarClick}
    >
      {renderMenu()}
      <UserAvatar
        small
        name={user?.name}
        color={user?.avatarColor}
      />
    </IconButton>
  );
};

export default HeaderAvatar;
