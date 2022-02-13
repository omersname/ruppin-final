import {NextApiRequest, NextApiResponse} from 'next';
import {getAuth, signOut} from 'firebase/auth';
import {CatchError} from '../../../types/utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await signOut(getAuth());
    res.status(200).end();
  } catch (err: CatchError) {
    const {code} = err;
    res.status(400).send({code});
  }
};

export default handler;
