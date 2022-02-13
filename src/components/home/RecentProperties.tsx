import React, {FC} from 'react';
import PageCard from '../layout/PageCard';
import {PropertyProps} from '../../types/properties';
import {Grid} from '@mui/material';
import SquareImg from '../layout/SquareImg';
import Caption from '../typography/Caption';
import Spacer from '../usable/Spacer';
import {lang} from '../../content';
import {navigate} from '../../handlers/navigate';
import {arrayUtils} from '../../dev/arrays';

type Props = {
  properties: PropertyProps[];
};

const RecentProperties: FC<Props> = props => {
  const {
    properties,
  } = props;

  const renderItem = (item: PropertyProps) => (
    <Grid
      item
      key={item.id}
      xs={4}
      style={{cursor: 'pointer'}}
      onClick={() => navigate.property(item.id)}
    >
      <SquareImg src={item.url} />
    </Grid>
  );

  if (arrayUtils.isEmpty(properties)) {
    return null;
  }

  return (
    <PageCard>
      <Caption text={lang('HOME.RECENT_PROPERTIES.CAPTION.TEXT')} />
      <Spacer />
      <Grid container spacing={2}>
        {properties.slice(0, 6).map(item => renderItem(item))}
      </Grid>
    </PageCard>
  );
};

export default RecentProperties;
