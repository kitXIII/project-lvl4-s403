import React from 'react';

export const CurrentUserContext = React.createContext();

// eslint-disable-next-line react/display-name
export const currentUserContextConsumerDecorator = () => Component => props => (
  <CurrentUserContext.Consumer>
    {currentUser => <Component currentUser={currentUser} {...props} />}
  </CurrentUserContext.Consumer>
);
