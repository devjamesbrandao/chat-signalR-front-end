import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import Lobby from './components/Lobby';
import Chat from './components/Chat';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [room, setRoom] = useState();
  const [users, setUsers] = useState([]);

  const joinRoom = async (user, room) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl(`${process.env.REACT_APP_BASE_URL}/chat`)
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (user, message, id) => {
        setMessages(messages => [...messages, { user, message, id }]);
      });

      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      connection.onclose(e => {
        setConnection();
        setMessages([]);
        setUsers([]);
      });

      await connection.start();

      var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";

      var currentUserIdLength = 12;

      var id = "";

      for (var i = 0; i <= currentUserIdLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        id += chars.substring(randomNumber, randomNumber +1);
      }

      await connection.invoke("JoinRoom", { user, room, id });

      setCurrentUser(id);

      setRoom(room);

      setConnection(connection);
    } catch (e) {
      console.log("Erro: " + e);
      alert("Erro: " + e);
    }
  }

  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  }

  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (e) {
      console.log(e);
    }
  }

  return <div className='app'>
    <h2>DEV Chat</h2>
    <hr className='line' />
    {!connection
      ? <Lobby joinRoom={joinRoom} />
      : <Chat sendMessage={sendMessage} 
              messages={messages} 
              users={users} 
              currentUser={currentUser}
              room={room}
              closeConnection={closeConnection}
        />}
  </div>
}

export default App;
