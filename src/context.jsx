import React from 'react';

export const ConfigContext = React.createContext();

// eslint-disable-next-line react/display-name
export const configContextConsumerDecorator = () => Component => props => (
  <ConfigContext.Consumer>
    {configParams => <Component {...configParams} {...props} />}
  </ConfigContext.Consumer>
);
