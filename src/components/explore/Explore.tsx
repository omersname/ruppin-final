import React, {FC, MouseEvent} from 'react';
import PageLayout from '../layout/PageLayout';
import {arrayUtils} from '../../dev/arrays';
import PageCard from '../layout/PageCard';
import Text from '../typography/Text';
import BoxCenter from '../usable/BoxCenter';
import {lang} from '../../content';
import {Grid, Box} from '@mui/material';
import SquareImg from '../layout/SquareImg';
import Caption from '../typography/Caption';
import LikeChip from '../property/LikeChip';
import {withMapState} from '../../hoc/withMapState';
import {AdminState} from '../../state/reducers/admin';
import {ExploreState} from '../../state/reducers/explore';
import {PropertyProps} from '../../types/properties';
import {navigate} from '../../handlers/navigate';

type Props = {
  explore?: ExploreState;
  admin?: AdminState;
  updateProperty: (properties: PropertyProps[], property: PropertyProps) => void;
};

const Explore: FC<Props> = props => {
  const {
    explore,
    admin,
    updateProperty,
  } = props;

  const properties = explore?.properties ?? [];
  const isEmpty = arrayUtils.isEmpty(properties);

  const onLikeClick = (e: MouseEvent<HTMLDivElement>, property: PropertyProps, userId?: string) => {
    e.stopPropagation();
    if (property && userId) {
      const isAlreadyLike = property.likes.includes(userId);
      const propertyProps: PropertyProps = {
        ...property,
        likes: isAlreadyLike ?
          arrayUtils.dropItem(property.likes, userId) :
          [...property.likes, userId],
      };
      return updateProperty(properties, propertyProps);
    }
  };

  const onCardClick = (propertyId: string) => {
    return navigate.property(propertyId);
  };

  const renderEmpty = () => (
    <PageCard>
      <BoxCenter>
        <Text text={lang('EXPLORE.EMPTY_CARD.TEXT')} />
      </BoxCenter>
    </PageCard>
  );

  const renderContent = () => (
    <Grid container spacing={2}>
      {properties.map(property => {
        const isLiked = !!admin?.isLogged && property.likes.includes(admin.userProps.id);
        return (
          <Grid
            item
            xs={4}
            key={property.id}
            onClick={() => onCardClick(property.id)}
            style={{cursor: 'pointer'}}
          >
            <PageCard fluid>
              <SquareImg src={property.url} />
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                marginTop={2}
              >
                <Caption text={property.name} />
                <LikeChip
                  count={property.likes.length ?? 0}
                  isLiked={isLiked}
                  onClick={event => onLikeClick(event, property, admin?.userProps.id)}
                  disabled={!admin?.isLogged}
                />
              </Box>
            </PageCard>
          </Grid>
        );
      })}
    </Grid>
  );

  return (
    <PageLayout>
      {isEmpty ? renderEmpty() : renderContent()}
    </PageLayout>
  );
};

export default withMapState(Explore, {
  extract: ['admin', 'explore'],
  spread: false,
});
