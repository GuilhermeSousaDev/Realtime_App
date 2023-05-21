import { useState } from 'react';
import './App.css'
import { socket } from './socket';

function App() {
  const [text, setText] = useState();
  const [messages, setMessages] = useState([]);

  socket.on('message', (data) => setMessages(data));

  const handleChangeText = (e) => {
    setText(e.target.value);
  }

  const sendMessageToServer = () => {
    socket.emit('chat', text);
  }

  const handleRemoveMessage = async (messageId) => {
    socket.emit('remove_message', messageId);
  }

  return (
    <>
      <input type="text" onChange={(e) => handleChangeText(e)} />
      <button onClick={sendMessageToServer}>Send Message</button>
      { messages.map((message, i) => (
        <div 
          key={i}
          style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-around",
          }} 
        >
          <h1>{ message.message }</h1>
          <button onClick={() => handleRemoveMessage(message.id)}>X</button>
        </div>
      ))}
    </>
  )
}

export default App
