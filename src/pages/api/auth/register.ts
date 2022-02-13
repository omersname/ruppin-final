import {NextApiRequest, NextApiResponse} from 'next';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {CatchError} from '../../../types/utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {body: {email, password}} = req;
    const {user} = await createUserWithEmailAndPassword(getAuth(), email, password);
    res.status(200).send(user);
  } catch (err: CatchError) {
    const {code} = err;
    res.status(400).send({code});
  }
};

export default handler;
