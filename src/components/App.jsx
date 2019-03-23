import React from 'react';
import ChannelsList from './ChannelsList';

const App = () => (
  <div className="row">
    <div className="col-4 col-lg-3">
      <h5>Channels</h5>
      <hr />
      <ChannelsList />
    </div>
    <div className="col-8 col-lg-9">
      <h5>Chat</h5>
      <hr />
      <div className="chat-container d-flex flex-column align-items-stretch">
        <div className="chat-messages p-3">Messages field</div>
        <div className="chat-input p-3">Input field</div>
      </div>
    </div>
  </div>
);

export default App;
