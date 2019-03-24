import React from 'react';
import ChannelsList from './ChannelsList';
import InputMessageForm from './InputMessageForm';

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
          <div className="chat-messages mb-3 p-3">
            <p className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio voluptates odit consectetur mollitia magnam!
            </p>
          </div>
          <div className="chat-input">
            <InputMessageForm />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default App;
