import React, {FC, useState} from 'react';
import {PropertyProps} from '../../types/properties';
import PageLayout from '../layout/PageLayout';
import PageCard from '../layout/PageCard';
import SquareImg from '../layout/SquareImg';
import ColumnSpaces from '../usable/ColumnSpaces';
import {UserProps} from '../../types/users';
import {navigate} from '../../handlers/navigate';
import EditableField from '../user/EditableField';
import {withMapState} from '../../hoc/withMapState';
import {AdminState} from '../../state/reducers/admin';
import FlatButton from '../control/FlatButton';
import {Delete} from '@mui/icons-material';
import {Box, Stack} from '@mui/material';
import Spacer from '../usable/Spacer';
import {systemActions} from '../../state/actions/system';
import {lang} from '../../content';
import UserChip from '../user/UserChip';
import LikeChip from './LikeChip';
import {PropertyState} from '../../state/reducers/property';
import {arrayUtils} from '../../dev/arrays';

type Props = {
  property?: Required<PropertyState>;
  admin?: AdminState;
  ownerProps: Required<UserProps>;
  updateProperty: (propertyProps: PropertyProps) => void;
  deleteProperty: () => void;
};

const Property: FC<Props> = props => {
  const {
    property,
    ownerProps,
    updateProperty,
    admin,
    deleteProperty,
  } = props;

  const isOwner = !!admin?.isLogged && admin.userProps.id === ownerProps.id;

  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const onPropertyNameSubmit = (name: string) => {
    const propertyProps = {...property, name};
    updateProperty(propertyProps as PropertyProps);
  };

  const onDeleteProperty = async () => {
    setIsDeleting(true);
    await deleteProperty();
    const message = lang('PROPERTY.DELETED_SUCCESS.MESSAGE');
    systemActions.setTopNotification(message);
    return navigate.home();
  };

  const renderDeleteButton = () => isOwner && (
    <>
      <Spacer />
      <Box display={'flex'} justifyContent={'flex-end'}>
        <FlatButton
          label={lang('PROPERTY.DELETED_BUTTON.LABEL')}
          startIcon={<Delete />}
          size={'small'}
          color={'error'}
          onClick={onDeleteProperty}
          loading={isDeleting}
        />
      </Box>
    </>
  );

  const onLikeChipClick = () => {
    const userId = admin?.userProps.id;
    if (property) {
      const isAlreadyLiked = property.likes.includes(userId);
      const newLikes = (
        isAlreadyLiked ?
          arrayUtils.dropItem(property.likes, userId) :
          [...property.likes, userId]
      );
      const newProps = {...property, likes: newLikes};
      updateProperty(newProps);
    }
  };

  const renderActions = () => {
    if (property) {
      const isLiked = admin?.isLogged && property.likes.includes(admin.userProps.id);
      return (
        <Stack direction={'row'} spacing={1}>
          <UserChip
            name={ownerProps.name}
            userId={ownerProps.id}
            color={ownerProps.avatarColor}
          />
          <LikeChip
            count={property.likes.length}
            isLiked={!!isLiked}
            onClick={onLikeChipClick}
            disabled={!admin?.isLogged}
          />
        </Stack>
      );
    }
  };

  return (
    <PageLayout>
      <ColumnSpaces>
        <PageCard>
          <EditableField
            asCaption
            editable={isOwner}
            value={property?.name}
            validate={v => v !== ''}
            onSubmit={onPropertyNameSubmit}
          />
          <Spacer />
          {renderActions()}
        </PageCard>
        <PageCard>
          {property && <SquareImg src={property.url} />}
          {renderDeleteButton()}
        </PageCard>
      </ColumnSpaces>
    </PageLayout>
  );
};

export default withMapState(Property, {
  extract: ['admin', 'property'],
  spread: false,
});
