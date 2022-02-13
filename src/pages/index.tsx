import type {NextPage} from 'next';
import Home from '../components/home/Home';
import {PropertyProps} from '../types/properties';
import {propertyDatabase} from '../database/properties';

type Props = {
  properties: PropertyProps[];
};

const IndexPage: NextPage<Props> = props => {
  const {
    properties,
  } = props;

  return (
    <Home
      properties={properties}
    />
  );
};

IndexPage.getInitialProps = async (): Promise<Props> => {
  const properties = await propertyDatabase.getAll();
  return {properties} as Props;
};

export default IndexPage;
