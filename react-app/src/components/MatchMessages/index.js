import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { getMatchMessagesThunk } from "../../store/message";
import { getMatchesThunk } from "../../store/match";
import { CircleSpinner } from "react-spinners-kit";
import styles from "./MatchMessages.module.sass";

let socket;

function MatchMessages() {
  const dispatch = useDispatch();
  const currentMatch = useSelector((state) => state.match.currentMatch);
  const user = useSelector((state) => state.session.user);
  const matchMessages = useSelector((state) => state.message.allMatchMessages);
  const matchesObj = useSelector((state) => state.match.currentMatches);
  const matches = Object.values(matchesObj);
  const messageMatch = matches.find(
    (match) => match.id === currentMatch.id && match.last_message
  );
  const matchMessageLength = matchMessages.length;
  const messageList = Object.values(matchMessages);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [isHovered, setIsHovered] = useState(null);
  const bottomRef = useRef();

  useEffect(() => {
    // open socket connection
    // create websocket
    socket = io();

    dispatch(getMatchMessagesThunk(currentMatch.matchId));

    // listen for chat events
    socket.on("chat", (chat) => {
      // when we recieve a chat, add it into our messages array in state
      setMessages((messages) => [...messages, chat]);
    });

    socket.on("delete_message", (delete_message) => {
      setMessages((messages) =>
        messages.filter((message) => message.id !== delete_message.id)
      );
    });

    bottomRef.current?.scrollIntoView({ behavior: "smooth" });

    // when component unmounts, disconnect
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    dispatch(getMatchMessagesThunk(currentMatch.matchId));
  }, [currentMatch]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [matchMessageLength]);

  useEffect(() => {
    dispatch(getMatchMessagesThunk(currentMatch.matchId));
    dispatch(getMatchesThunk());
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const sendChat = (e) => {
    e.preventDefault();

    // emit a message
    socket.emit("chat", {
      match_id: currentMatch.matchId,
      user_id: user.id,
      content: chatInput,
    });

    // clear the input field after the message is sent
    dispatch(getMatchMessagesThunk(currentMatch.matchId));
    setChatInput("");
  };

  const deleteChat = (messageId) => {
    // emit a message
    socket.emit("delete_message", { id: messageId });

    // clear the input field after the message is sent
    setChatInput("");
  };

  return (
    <>
      <div className={styles.wrapper}>
        {messageMatch && messageList.length === 0 && (
          <div className={styles.spinner}>
            <CircleSpinner
              size={40}
              color="#80F"
              loading={messageList.length === 0}
            />
          </div>
        )}
        {currentMatch && messageList.length > 0 && (
          <>
            <div className={styles.wrapper_inner}>
              {messageList.map((message) => (
                <>
                  <div
                    className={
                      message.user_id === user.id
                        ? `${styles.message_wrapper} ${styles.user_message_wrapper}`
                        : `${styles.message_wrapper} ${styles.other_message_wrapper}`
                    }
                    key={message.id}
                    onMouseEnter={() => {
                      if (message.user_id === user.id) {
                        setIsHovered(message.id);
                      }
                    }}
                    onMouseLeave={() => {
                      if (message.user_id === user.id) {
                        setIsHovered(null);
                      }
                    }}
                  >
                    <p
                      key={message.id}
                      className={
                        message.user_id === user.id
                          ? styles.user_message
                          : styles.other_message
                      }
                    >
                      {message.content}
                    </p>
                  {(message.user_id === user.id && isHovered === message.id) && (
                    <i
                      className="fa-regular fa-trash-can"
                      onClick={() => deleteChat(message.id)}
                    ></i>
                  )}
                  </div>
                </>
              ))}

              <div ref={bottomRef} className={styles.dummy_bottom}></div>
            </div>
          </>
        )}
        {!messageMatch && messageList.length === 0 && (
          <div className={styles.wrapper_inner}>
            <p className={styles.first_move}>
              Make the first move! Send a message to get sparks flying.{" "}
            </p>
          </div>
        )}
        <form className={styles.chat_form} onSubmit={sendChat}>
          <div className={styles.chat_form_field}>
            <input
              className={styles.chat_input}
              value={chatInput}
              onChange={updateChatInput}
              placeholder="Start chatting..."
            />
            <button
              className={styles.chat_send}
              disabled={chatInput.length === 0 || chatInput.length > 1000}
              type="submit"
            >
              <i class="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default MatchMessages;
