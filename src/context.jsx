import React from 'react';

export const ConfigContext = React.createContext();

// eslint-disable-next-line react/display-name
export const configContextConsumerDecorator = () => Component => props => (
  <ConfigContext.Consumer>
    {config => <Component {...config} {...props} />}
  </ConfigContext.Consumer>
);
