import React, {FC} from 'react';
import PageLayout from '../layout/PageLayout';
import {PropertyProps} from '../../types/properties';
import RecentProperties from './RecentProperties';

type Props = {
  properties: PropertyProps[];
};

const Home: FC<Props> = props => {
  const {
    properties,
  } = props;

  return (
    <PageLayout>
      <RecentProperties
        properties={properties}
      />
    </PageLayout>
  );
};

export default Home;
