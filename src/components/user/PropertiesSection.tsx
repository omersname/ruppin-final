import React, {FC, useState, useEffect} from 'react';
import PageCard from '../layout/PageCard';
import {arrayUtils} from '../../dev/arrays';
import FlatButton from '../control/FlatButton';
import {lang} from '../../content';
import {Add} from '@mui/icons-material';
import Text from '../typography/Text';
import BoxCenter from '../usable/BoxCenter';
import Spacer from '../usable/Spacer';
import AddProperty from './AddProperty';
import {useUploader} from '../../hooks/useUploader';
import {UserProps} from '../../types/users';
import {Box, Grid, CircularProgress} from '@mui/material';
import Caption from '../typography/Caption';
import TextButton from '../control/TextButton';
import SquareImg from '../layout/SquareImg';
import {navigate} from '../../handlers/navigate';
import {PropertyProps} from '../../types/properties';
import {propertyDatabase} from '../../database/properties';

type Props = {
  userProps: UserProps;
  shouldEdit: boolean;
};

const PropertiesSection: FC<Props> = props => {
  const {
    userProps,
    shouldEdit,
  } = props;

  const [items, setItems] = useState<PropertyProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isItemExist = arrayUtils.isNonEmpty(items);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (userProps.properties) {
        const result: PropertyProps[] = [];
        for (const propertyId of userProps.properties) {
          const res = await propertyDatabase.getById(propertyId);
          result.push(res);
        }
        setItems([...result]);
      }
      setIsLoading(false);
    })();
  }, [userProps.properties]);

  const {
    imgPreview,
    openImgPicker,
    uploadImg,
    isLoading: isImgLoading,
    reset: resetImg,
  } = useUploader();

  const renderEmpty = () => (
    <BoxCenter flexDirection={'column'}>
      <Text text={lang('PROFILE.PROPERTIES.EMPTY.TEXT')} />
      <Spacer />
      <FlatButton
        label={lang('PROFILE.PROPERTIES.ADD_BUTTON.LABEL')}
        startIcon={<Add />}
        onClick={openImgPicker}
      />
    </BoxCenter>
  );

  const onImgClick = (imgId: string) => {
    return navigate.property(imgId);
  };

  const renderLoader = () => (
    <BoxCenter>
      <CircularProgress />
    </BoxCenter>
  );

  const renderContent = () => {
    return (
      <Box>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Caption text={'Properties'} />
          {shouldEdit && <TextButton onClick={openImgPicker} label={'Add'} size={'small'} startIcon={<Add />} />}
        </Box>
        <Spacer divider />
        <Grid container spacing={2}>
          {items.map(item => item && (
            <Grid
              item
              key={item.id}
              xs={4}
              onClick={() => onImgClick(item.id)}
              style={{cursor: 'pointer'}}
            >
              <SquareImg src={item.url} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  return (shouldEdit || isItemExist) ? (
    <PageCard>
      {imgPreview ?
        <AddProperty
          userProps={userProps}
          imgPreview={imgPreview}
          uploadImg={uploadImg}
          isLoading={isImgLoading}
          onCancel={resetImg}
        /> :
        isLoading ? renderLoader() :
          isItemExist ?
            renderContent() :
            renderEmpty()}
    </PageCard>
  ) : null;
};

export default PropertiesSection;
