import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from "react-redux";
import "./MatchMessages.css";
import { getMatchMessagesThunk } from '../../store/message';

let socket;

function MatchMessages() {
    const dispatch = useDispatch();
    const currentMatch = useSelector(state => state.match.currentMatch)
    const user = useSelector(state => state.session.user)
    const matchMessages = useSelector(state => state.message.allMatchMessages)
    const messageList = Object.values(matchMessages)
    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");

    console.log("CURRENT MATCH : ", currentMatch)

    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();


        dispatch(getMatchMessagesThunk(currentMatch.matchId))

        // listen for chat events
        socket.on("chat", (chat) => {
            // when we recieve a chat, add it into our messages array in state
            setMessages(messages => [...messages, chat])
        })

        // listen for delete events
        // socket.on("delete_message", (delete_message) => {
        //     // when we recieve a chat, add it into our messages array in state
        //     setMessages(messages => messages.filter(message => message.id !== delete_message.id))
        //     console.log("DELETE message from component", delete_message)
        // })

        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [])

    useEffect(() => {
        dispatch(getMatchMessagesThunk(currentMatch.matchId))
    }, [currentMatch])

    useEffect(() => {
        dispatch(getMatchMessagesThunk(currentMatch.matchId))
    }, [messages])


    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault()

        // emit a message
        socket.emit("chat", { match_id: currentMatch.matchId, user_id: user.id, content: chatInput });

        // clear the input field after the message is sent
        dispatch(getMatchMessagesThunk(currentMatch.matchId))
        setChatInput("")
    }

    const deleteChat = (messageId) => {
        // emit a message
        socket.emit("delete_message", { id: messageId });

        // clear the input field after the message is sent
        setChatInput("")
    }

    return (
        <>
            {(currentMatch && messageList.length > 0) && (
                <div className="bigger-messages-wrapper">
                    <div className="match-messages-container">
                    {messageList.map(message => (
                        <>
                            <p key={message.id} className={message.user_id === user.id ? "user-messages" : "other-messages"}>{message.content}</p>
                        </>
                    ))}

                    </div>
                            <form id='chat-input-form' onSubmit={sendChat}>
                                <div className="chat-input-form-field">
                                    <input id='chat-input'
                                        value={chatInput}
                                        onChange={updateChatInput}
                                        placeholder="Start chatting..."
                                    />
                                    <button id='chat-send-button' disabled={chatInput.length === 0 || chatInput.length > 1000} type="submit">Send</button>
                                </div>
                                <div id="message-warning">{chatInput.length > 1000 ? <p>Please keep your message below 1000 characters</p> : ''}</div>
                            </form>
                </div>

            )}
        </>
    )
}

export default MatchMessages;
