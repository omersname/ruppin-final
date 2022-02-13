import {ThemeProvider, CssBaseline} from '@mui/material';
import App, {AppProps, AppContext} from 'next/app';
import {Provider} from 'react-redux';
import {store} from '../state/store';
import TopNotifier from '../components/layout/TopNotifier';
import {APP_THEME} from '../config/layout';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {UserProps} from '../types/users';
import {userDatabase} from '../database/users';
import {API_ROUTE} from '../config/routes';
import {ServerResponse} from 'http';
import {adminActions} from '../state/actions/admin';

type Props = {
  admin: UserProps;
  passPageProps: any;
} & AppProps;

class AppRoot extends App<Props> {
  constructor(props: Props) {
    super(props);
    const {props: {admin}} = this;
    adminActions.setUserProps(admin);
  }

  render() {
    const {props: {Component, pageProps, passPageProps}} = this;

    return (
      <ThemeProvider theme={APP_THEME}>
        <CssBaseline />
        <Provider store={store}>
          <TopNotifier />
          <Component {...{
            ...pageProps,
            ...passPageProps,
          }} />
        </Provider>
      </ThemeProvider>
    );
  }
}

const navigateToRootIfNeeded = async (pathname: string, res?: ServerResponse) => {
  if (res && [API_ROUTE.REGISTER(), API_ROUTE.LOGIN()].includes(pathname)) {
    return res.writeHead(302, {Location: '/'}).end();
  }
};

AppRoot.getInitialProps = async ({Component, ctx: context}: AppContext) => {
  const {pathname, res} = context;
  let props = {};
  let userId = undefined;
  await onAuthStateChanged(getAuth(), res => userId = res?.uid);
  Component.getInitialProps?.(context);
  if (userId) {
    await navigateToRootIfNeeded(pathname, res);
    const admin = await userDatabase.getById(userId);
    props = {...props, admin};
  }
  if (Component.getInitialProps) {
    const passPageProps = await Component.getInitialProps(context);
    props = {...props, passPageProps};
  }
  return props as Props;
};

export default AppRoot;
