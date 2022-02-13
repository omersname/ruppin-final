import React, {Component} from 'react';
import {NextPageContext} from 'next';
import Property from '../../components/property/Property';
import {PropertyProps} from '../../types/properties';
import {propertyDatabase} from '../../database/properties';
import {UserProps} from '../../types/users';
import {userDatabase} from '../../database/users';
import {propertyStorage} from '../../storage/properties';
import {arrayUtils} from '../../dev/arrays';
import {propertyActions} from '../../state/actions/property';

type Props = {
  property: Required<PropertyProps>;
  ownerProps: Required<UserProps>;
};

class PropertyPage extends Component<Props> {
  static async getInitialProps(context: NextPageContext): Promise<Props> {
    const {query: {id}} = context;
    const property = await propertyDatabase.getById(id as string);
    const ownerProps = await userDatabase.getById(property.owner);
    return {property, ownerProps} as Props;
  };

  constructor(props: Props) {
    super(props);
    const {props: {property}} = this;
    propertyActions.setPropertyProps(property);
  }

  updateProperty = async (propertyProps: PropertyProps) => {
    propertyActions.setPropertyProps(propertyProps);
    await propertyDatabase.update(propertyProps);
  };

  deleteProperty = async () => {
    const {props: {property, ownerProps}} = this;
    await propertyDatabase.remove(property.id);
    await propertyStorage.removeImg(property.id);
    await userDatabase.update({
      ...ownerProps,
      properties: arrayUtils.dropItem(ownerProps.properties, property.id),
    });
  };

  render() {
    const {props, updateProperty, deleteProperty} = this;
    const {ownerProps} = props;
    return (
      <Property
        ownerProps={ownerProps}
        updateProperty={updateProperty}
        deleteProperty={deleteProperty}
      />
    );
  }
}

export default PropertyPage;
