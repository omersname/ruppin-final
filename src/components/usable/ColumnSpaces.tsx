import React, {FC, Fragment, Children} from 'react';
import Spacer from './Spacer';

type Props = {
  space?: number;
};

const ColumnSpaces: FC<Props> = props => {
  const {
    children,
    space,
  } = props;

  if (!children) {
    return null;
  }

  const length = Children.count(children);

  return (
    <Fragment>
      {
        Children.map(children, (node, index) => {
          const shouldSpace = node && index < length - 1;
          return shouldSpace ? (
            <>
              {node}
              <Spacer space={space} />
            </>
          ) : node;
        })
      }
    </Fragment>
  );
};

export default ColumnSpaces;
