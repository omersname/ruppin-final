import React, {Component} from 'react';
import Explore from '../components/explore/Explore';
import {PropertyProps} from '../types/properties';
import {propertyDatabase} from '../database/properties';
import {exploreActions} from '../state/actions/explore';

type Props = {
  properties: PropertyProps[];
};

class ExplorePage extends Component<Props> {
  static async getInitialProps(): Promise<Props> {
    const properties = await propertyDatabase.getAll();
    return {properties} as Props;
  };

  constructor(props: Props) {
    super(props);
    const {props: {properties}} = this;
    exploreActions.setProperties(properties);
  }

  updateProperty = async (properties: PropertyProps[], property: PropertyProps) => {
    const newProperties = properties.map((p: PropertyProps) => {
      return p.id === property.id ? {...p, ...property} : p;
    });
    exploreActions.setProperties(newProperties);
    await propertyDatabase.update(property);
  };

  render() {
    const {updateProperty} = this;
    return (
      <Explore
        updateProperty={updateProperty}
      />
    );
  }
}

export default ExplorePage;
