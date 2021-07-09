import React, {useEffect, useState} from 'react';
import './App.css';
import db from "./firebase/Firebase";
import firebase from "firebase"
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import {Message} from "./message/Message";
import FlipMove from "react-flip-move";
import SendSharpIcon from '@material-ui/icons/SendSharp';
import IconButton from "@material-ui/core/IconButton";

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
        window.scrollTo({top:0, left:0, behavior: 'smooth'});
        db.collection('messages').add({
          username: username,
          message: input,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput('')
    }

    return (
    <div className="App">

        <div className={'app__logoMessenger'}>
            <img src={'./messenger_logo.png'} alt={'Messenger_Logo'} />
            <h1>Messenger Facebook Clone</h1>
        </div>

        <FlipMove className={'app__messages'}>
            {
                messages.map((message)=>(
                    <Message key={message.id} username={username} message={message.message} />
                ))
            }
        </FlipMove>
        <form className={'app__form'}>
            <FormControl className={'app__formControl'}>
                <InputLabel>Type your message</InputLabel>
                <Input className={'app__formControl__input'} value={input} onChange={e=>setInput(e.target.value)} />
                <IconButton type="submit" disabled={!input}
                            onClick={handleSendMessage} className={'app__formControl__btn'}
                            variant="contained"
                            color="primary"
                >
                    <SendSharpIcon/>
                </IconButton>
            </FormControl>
        </form>

    </div>
    );
}

export default App;
