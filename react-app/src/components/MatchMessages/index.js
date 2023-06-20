import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from "react-redux";
import "./MatchMessages.css";
import { getMatchMessagesThunk } from '../../store/message';
import { getMatchesThunk } from '../../store/match';
import { useHistory } from 'react-router-dom';

let socket;

function MatchMessages() {
    const dispatch = useDispatch();
    const currentMatch = useSelector(state => state.match.currentMatch)
    const user = useSelector(state => state.session.user)
    const matchMessages = useSelector(state => state.message.allMatchMessages)
    const matchMessageLength = matchMessages.length
    const messageList = Object.values(matchMessages)
    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");
    const bottomRef = useRef()
    const history = useHistory()

    console.log("MATCH MESSAGES ", matchMessages)

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

        socket.on("delete_message", (delete_message) => {
            setMessages(messages => messages.filter(message => message.id !== delete_message.id))
        })

        bottomRef.current?.scrollIntoView();

        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [])

    useEffect(() => {
        dispatch(getMatchMessagesThunk(currentMatch.matchId))
    }, [currentMatch])

    useEffect(() => {
        bottomRef.current?.scrollIntoView();
    }, [matchMessageLength])

    useEffect(() => {
        dispatch(getMatchMessagesThunk(currentMatch.matchId))
        dispatch(getMatchesThunk())
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
        console.log("BOTTOM REF CURRENT: ", bottomRef.current)
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
            <div className="bigger-messages-wrapper">
                {(currentMatch && messageList.length > 0) && (
                    <>
                        <div className="match-messages-container">
                            {messageList.map(message => (
                                <>
                                <div className={message.user_id === user.id ? "user-messages message-item-container" : "other-messages message-item-container"}>

                                    <p key={message.id} className={message.user_id === user.id ? "user-message" : "other-message"}>{message.content}</p>
                                </div>
                                    {message.user_id === user.id && (
                                        <i class="fa-regular fa-trash-can" onClick={(() => deleteChat(message.id))}></i>

                                    )}
                                </>
                            ))}

                        <div ref={bottomRef} className="dummy-bottom"></div>
                        </div>
                    </>

                )}
                {(currentMatch && messageList.length === 0) && (
                    <div className="match-messages-container">
                        <p className="make-first-move">Make the first move! Send a message to get sparks flying. </p>
                        </div>
                )}
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
        </>
    )
}

export default MatchMessages;
