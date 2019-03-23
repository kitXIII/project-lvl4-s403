import React from 'react';
import ChannelsList from './ChannelsList';

const App = () => (
  <div>
    <div className="d-sm-none mb-3">
      <h5>Channels</h5>
      <hr />
      <ChannelsList />
    </div>
    <div className="row">
      <div className="d-none d-sm-block col-sm-4 col-lg-3">
        <h5>Channels</h5>
        <hr />
        <ChannelsList />
      </div>
      <div className="col col-sm-8 col-lg-9">
        <h5>Chat</h5>
        <hr />
        <div className="chat-container d-flex flex-column align-items-stretch">
          <div className="chat-messages card p-3 mb-3">Messages field</div>
          <div className="chat-input card p-3 mb-1">Input field</div>
        </div>
      </div>
    </div>
  </div>
);

export default App;
