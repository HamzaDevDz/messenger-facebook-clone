import React, {useEffect, useState} from 'react';
import './App.css';
import db from "./firebase/Firebase";
import Button from "@material-ui/core/Button"
import firebase from "firebase"
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import {Message} from "./message/Message";
import FlipMove from "react-flip-move";

function App() {

    const [username, setUsername] = useState('')
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        setUsername(prompt('Enter your username'))
        setInput('')
        db.collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
          setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()}) ))
        })
    }, [])

    const handleSendMessage = (e) => {
        e.preventDefault()
        db.collection('messages').add({
          username: username,
          message: input,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput('')
    }

    return (
    <div className="App">
        <FlipMove className={'app__messages'}>
            {
                messages.map((message)=>(
                    <Message key={message.id} username={username} message={message.message} />
                ))
            }
        </FlipMove>

        <FormControl className={'app__formInput'}>
          <InputLabel>Type your message</InputLabel>
          <Input value={input} onChange={e=>setInput(e.target.value)} />
          <Button type={'submit'} disabled={!input} onClick={handleSendMessage} variant="contained" color="primary">Send Message</Button>
        </FormControl>
    </div>
    );
}

export default App;
