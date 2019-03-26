const host = '/api/v1';

// Get list of Channels
// GET /channels

// Create new Channel
// POST /channels
// => { data: { attributes: { name } } }
// <= { data: { type: 'channels', id , attributes: { name, id, removale } } }

// Remove channel
// DELETE /channels/:id
// <= { data: { type: 'channels', id } }

// Change channel
// PATCH /channels/:id

// Get messages of channel
// GET /channels/:channelId/messages
// <= Array of { type: messages, id, attributes }

// Send new message to channel
// POST /channels/:channelId/messages'
// => { data: { attributes } }
// <= { data: { type: 'messages', id, attributes: { ...recivedAttributes, channelId, id } }}

export default {
  channelsUrl: () => [host, 'channels'].join('/'),
  channelUrl: id => [host, 'channels', id].join('/'),
  messagesUrl: channelId => [host, 'channels', channelId, 'messages'].join('/'),
};
