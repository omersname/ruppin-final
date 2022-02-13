import React, {FC, useState, useEffect} from 'react';
import {Snackbar} from '@mui/material';
import {withMapState} from '../../hoc/withMapState';
import {SystemState} from '../../state/reducers/system';
import {systemActions} from '../../state/actions/system';

type Props = {} & Partial<SystemState>;

const TopNotifier: FC<Props> = props => {
  const {
    topNotification,
  } = props;

  const [shouldShow, setShouldShow] = useState<boolean>(false);

  useEffect(() => {
    setShouldShow(!!topNotification);
  }, [topNotification]);

  const onClose = () => {
    setShouldShow(false);
    systemActions.setTopNotification('');
  };

  return (
    <Snackbar
      open={shouldShow}
      message={topNotification}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    />
  );
};

export default withMapState(TopNotifier, {extract: ['system']});
