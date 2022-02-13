import React, {FC} from 'react';
import BoxCenter from '../usable/BoxCenter';
import UserAvatar from './UserAvatar';
import Spacer from '../usable/Spacer';
import Caption from '../typography/Caption';
import ColumnSpaces from '../usable/ColumnSpaces';
import EditableField from './EditableField';
import {lang} from '../../content';
import PageCard from '../layout/PageCard';
import {UserProps} from '../../types/users';

type Props = {
  userProps: UserProps;
  onNameSubmit: (name: string) => void;
  shouldEdit: boolean;
};

const DetailsSection: FC<Props> = props => {
  const {
    userProps,
    onNameSubmit,
    shouldEdit,
  } = props;

  return (
    <PageCard>
      <BoxCenter flexDirection={'column'}>
        <UserAvatar
          name={userProps.name}
          color={userProps.avatarColor}
        />
        <Spacer />
        <Caption text={userProps.name} />
      </BoxCenter>
      <Spacer divider />
      <ColumnSpaces>
        <EditableField
          editable={shouldEdit}
          label={lang('GLOBAL.INPUT.LABEL.NAME')}
          value={userProps.name}
          onSubmit={onNameSubmit}
        />
        <EditableField
          editable={false}
          label={lang('GLOBAL.INPUT.LABEL.EMAIL')}
          value={userProps.email}
        />
      </ColumnSpaces>
    </PageCard>
  );
};

export default DetailsSection;
