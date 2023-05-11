import { useEffect, useState } from 'react';
import './App.css'
import { socket } from './socket';

function App() {
  const [text, setText] = useState();
  const [messages, setMessages] = useState([]);

  socket.on('message', (msg) => setMessages(msg));

  const handleChangeText = (e) => {
    setText(e.target.value);
  }

  const sendMessageToServer = () => {
    socket.emit('chat', text);
  }

  return (
    <>
      <input type="text" onChange={(e) => handleChangeText(e)} />
      <button onClick={sendMessageToServer}>Send Message</button>
      { messages.map((message, i) => (
        <div key={i}>
          <h1>{ message }</h1>
        </div>
      ))}
    </>
  )
}

export default App
