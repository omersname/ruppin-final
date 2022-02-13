import {lang} from '../content';

export const firebaseErrorToStr: Record<string, string> = {
  ['auth/email-already-in-use']: lang('GLOBAL.ERROR.EMAIL_USED'),
  ['auth/weak-password']: lang('GLOBAL.ERROR.PASSWORD_WEAK'),
  ['auth/wrong-password']: lang('GLOBAL.ERROR.PASSWORD_WRONG'),
  ['auth/user-not-found']: lang('GLOBAL.ERROR.EMAIL_NOT_FOUND'),
};
