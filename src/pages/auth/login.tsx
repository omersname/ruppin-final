import React, {useState} from 'react';
import {navigate} from '../../handlers/navigate';
import {NextPage} from 'next';
import AuthLayout from '../../components/auth/AuthLayout';
import {lang} from '../../content';
import {userDatabase} from '../../database/users';
import {adminActions} from '../../state/actions/admin';
import {firebaseErrorToStr} from '../../config/errors';
import {systemActions} from '../../state/actions/system';
import {CatchError} from '../../types/utils';
import {http} from '../../services/http';
import {API_ENDPOINT} from '../../config/endpoints';
import {navigation} from '../../services/navigation';

type Props = {};

const LoginPage: NextPage<Props> = props => {
  const {} = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmitClick = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const {data: {uid: id}} = await http.post(API_ENDPOINT.LOGIN(), {email, password});
      if (id) {
        const userData = await userDatabase.getById(id);
        await userDatabase.addNew(userData);
        adminActions.setUserProps(userData);
        return navigation.goBack();
      }
    } catch (err: CatchError) {
      const {response: {data: {code}}} = err;
      const message = firebaseErrorToStr[code] ?? lang('AUTH.LOGIN.GENERAL.ERROR');
      systemActions.setTopNotification(message);
      setIsLoading(false);
    }
  };

  const onGoToRegisterClick = () => {
    return navigate.register();
  };

  return (
    <AuthLayout
      cardTitle={lang('AUTH.LOGIN.CARD.TITLE')}
      onSubmition={onSubmitClick}
      submitButton={{
        label: lang('AUTH.LOGIN.BUTTON.SUBMIT'),
        loading: isLoading,
      }}
      bottomTextButton={{
        label: lang('AUTH.LOGIN.BUTTON.GO_TO_LOGIN'),
        onClick: onGoToRegisterClick,
      }}
    />
  );
};

export default LoginPage;
