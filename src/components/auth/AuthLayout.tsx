import React, {FC, ChangeEvent, useState} from 'react';
import Caption from '../typography/Caption';
import ColumnSpaces from '../usable/ColumnSpaces';
import FlatButton, {FlatButtonProps} from '../control/FlatButton';
import {ArrowForward, ArrowBack} from '@mui/icons-material';
import TextButton, {TextButtonProps} from '../control/TextButton';
import Spacer from '../usable/Spacer';
import Input from '../control/Input';
import {lang} from '../../content';
import {useValidate} from '../../hooks/useValidate';
import {validation} from '../../services/validation';
import {useUpdate} from '../../hooks/useUpdate';
import {arrayUtils} from '../../dev/arrays';
import PageLayout from '../layout/PageLayout';
import PageCard from '../layout/PageCard';
import {navigate} from '../../handlers/navigate';

type Props = {
  cardTitle: string;
  submitButton: FlatButtonProps;
  bottomTextButton: TextButtonProps;
  onSubmition: (email: string, password: string) => void;
};

const AuthLayout: FC<Props> = props => {
  const {
    cardTitle,
    submitButton,
    bottomTextButton,
    onSubmition,
  } = props;

  const [email, setEmail, emailError] = useValidate<string>('', validation.checkEmail);
  const [password, setPassword, passwordError] = useValidate<string>('', validation.checkPassword);
  const [shouldSubmit, setShouldSubmit] = useState<boolean>(false);

  useUpdate(() => {
    const allErrors = [emailError ?? true, passwordError ?? true];
    const shouldAllowSubmit = !arrayUtils.isOneTrue(allErrors);
    setShouldSubmit(shouldAllowSubmit);
  }, [emailError, passwordError]);

  const setEmailValue = async ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    setEmail(value);
  };

  const setPasswordValue = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    setPassword(value);
  };

  const onSubmitClick = () => {
    onSubmition(email, password);
  };

  return (
    <PageLayout withHeader={false}>
      <PageCard>
        <ColumnSpaces>
          <TextButton
            label={lang('AUTH.BACK_HOME.BUTTON.LABEL')}
            startIcon={<ArrowBack />}
            color={'inherit'}
            size={'small'}
            onClick={() => navigate.home()}
          />
          <Caption text={cardTitle} />
          <Input
            label={lang('GLOBAL.INPUT.LABEL.EMAIL')}
            value={email}
            onChange={setEmailValue}
            errorText={emailError && lang('GLOBAL.ERROR.EMAIL_INVALID')}
          />
          <Input
            label={lang('GLOBAL.INPUT.LABEL.PASSWORD')}
            value={password}
            onChange={setPasswordValue}
            type={'password'}
            errorText={passwordError && lang('GLOBAL.ERROR.PASSWORD_INVALID')}
          />
          <FlatButton
            {...submitButton}
            pushToEnd
            onClick={onSubmitClick}
            endIcon={<ArrowForward />}
            disabled={!shouldSubmit}
          />
        </ColumnSpaces>
      </PageCard>
      <Spacer />
      <TextButton {...bottomTextButton} />
    </PageLayout>
  );
};

export default AuthLayout;
