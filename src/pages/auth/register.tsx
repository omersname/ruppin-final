import React, {useState} from 'react';
import {navigate} from '../../handlers/navigate';
import {NextPage} from 'next';
import AuthLayout from '../../components/auth/AuthLayout';
import {lang} from '../../content';
import {CatchError} from '../../types/utils';
import {firebaseErrorToStr} from '../../config/errors';
import {systemActions} from '../../state/actions/system';
import {http} from '../../services/http';
import {API_ENDPOINT} from '../../config/endpoints';
import {userDatabase} from '../../database/users';
import {mutate} from '../../handlers/mutate';
import {adminActions} from '../../state/actions/admin';
import {UserProps} from '../../types/users';
import {styleUtils} from '../../dev/styles';

type Props = {};

const RegisterPage: NextPage<Props> = props => {
  const {} = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmitClick = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const {data: {uid: id}} = await http.post(API_ENDPOINT.REGISTER(), {email, password});
      if (id) {
        const avatarColor = styleUtils.getRandomColor();
        const name = mutate.getEmailPrefix(email);
        const userData: UserProps = {id, email, name, avatarColor};
        await userDatabase.addNew(userData);
        adminActions.setUserProps(userData);
        return navigate.profile(id);
      }
    } catch (err: CatchError) {
      const {code} = err?.response?.data;
      const message = firebaseErrorToStr[code] ?? lang('AUTH.REGISTER.GENERAL.ERROR');
      systemActions.setTopNotification(message);
      setIsLoading(false);
    }
  };

  const onGoToLoginClick = () => {
    return navigate.login();
  };

  return (
    <AuthLayout
      cardTitle={lang('AUTH.REGISTER.CARD.TITLE')}
      onSubmition={onSubmitClick}
      submitButton={{
        label: lang('AUTH.REGISTER.BUTTON.SUBMIT'),
        loading: isLoading,
      }}
      bottomTextButton={{
        label: lang('AUTH.REGISTER.BUTTON.GO_TO_LOGIN'),
        onClick: onGoToLoginClick,
      }}
    />
  );
};

export default RegisterPage;
