import React, {FC, ChangeEvent, useState} from 'react';
import Caption from '../typography/Caption';
import {lang} from '../../content';
import Input from '../control/Input';
import {Box} from '@mui/material';
import TextButton from '../control/TextButton';
import Spacer from '../usable/Spacer';
import FlatButton from '../control/FlatButton';
import ColumnSpaces from '../usable/ColumnSpaces';
import {userDatabase} from '../../database/users';
import {UserProps} from '../../types/users';
import {PropertyProps} from '../../types/properties';
import {useValidate} from '../../hooks/useValidate';
import {useUpdate} from '../../hooks/useUpdate';
import {arrayUtils} from '../../dev/arrays';
import {adminActions} from '../../state/actions/admin';
import {propertyDatabase} from '../../database/properties';
import SquareImg from '../layout/SquareImg';

type Props = {
  userProps: UserProps;
  imgPreview: string;
  uploadImg: (onDone: (imgUrl: string, imgName: string) => Promise<void>) => void;
  isLoading: boolean;
  onCancel: () => void;
};

const AddProperty: FC<Props> = props => {
  const {
    userProps,
    imgPreview,
    uploadImg,
    isLoading,
    onCancel,
  } = props;

  const [propertyName, setPropertyName, propertyNameError] = useValidate<string>('', v => v !== '');
  const [shouldAdd, setShouldAdd] = useState<boolean>(false);

  useUpdate(() => {
    const shouldAllowAdding = arrayUtils.isAllFalse([propertyNameError ?? false]);
    setShouldAdd(shouldAllowAdding);
  }, [propertyNameError]);

  const onUploadClick = () => {
    uploadImg(async (imgUrl: string, imgName: string) => {
      const property: PropertyProps = {
        id: imgName,
        name: propertyName,
        url: imgUrl,
        owner: userProps.id,
        likes: [],
      };
      const user: UserProps = {
        ...userProps,
        properties: [...(userProps.properties ?? []), property.id],
      };
      await propertyDatabase.addNew(property);
      await userDatabase.update(user);
      adminActions.setUserProps(user);
    });
  };

  const setPropertyNameValue = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    setPropertyName(value);
  };

  return (
    <ColumnSpaces>
      <Caption text={lang('PROFILE.PROPERTIES.ADD_NEW.CAPTION')} />
      <Input
        size={'small'}
        disabled={isLoading}
        label={lang('PROFILE.PROPERTIES.ADD_NEW.INPUT_NAME.LABEL')}
        value={propertyName}
        onChange={setPropertyNameValue}
        errorText={propertyNameError && lang('PROFILE.PROPERTIES.ADD_NEW.INPUT_NAME.LABEL')}
      />
      <Box display={'flex'} justifyContent={'flex-end'}>
        <TextButton
          size={'small'}
          label={lang('GLOBAL.BUTTON.LABEL.CANCEL')}
          onClick={onCancel}
          disabled={isLoading}
        />
        <Spacer horizontal />
        <FlatButton
          size={'small'}
          label={lang('GLOBAL.BUTTON.LABEL.ADD')}
          onClick={onUploadClick}
          loading={isLoading}
          disabled={!shouldAdd}
        />
      </Box>
      <SquareImg src={imgPreview} />
    </ColumnSpaces>
  );
};

export default AddProperty;
