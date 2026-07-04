import { useState } from "react";
import {
  GalleryHorizontal,
  Paperclip,
  PaperclipIcon,
  Send,
} from "lucide-react";
import ChatHeader from "./chat-header";
import { sendMessage } from "../../services/chat-service";
import { auth } from "../../config/firebase";
import { useChatStore } from "../../store/use-chat-store";
import { useMessages } from "../../hooks/use-message";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const user = auth.currentUser;
  const { selectedUser } = useChatStore();
  const messages = useMessages(user.uid, selectedUser?.id);

  const handleSend = async (e) => {
    e.preventDefault()
    if (!message.trim()) return;
    await sendMessage(user.uid, selectedUser?.id, message);
    setMessage("");
  };

if (!selectedUser) {
  return (
    <div className="flex h-full items-center justify-center bg-base-100">
      <div className="max-w-lg text-center px-6">

        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m5-4a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-3">
          Welcome to Kura Kanii 👋
        </h2>

        <p className="text-base-content/60 leading-relaxed">
          Select a conversation from the sidebar to start chatting.
          Your messages will appear here in real time.
        </p>

      </div>
    </div>
  );
}

  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0 w-full">
        <ChatHeader />
      </div>

      <div className="flex-1 px-12 py-6 space-y-4 overflow-y-auto ">
        {messages.map((msg, index) => {
          const isMe = msg.senderId ===user.uid
          return (
            <div key={index} className={`chat ${isMe? "chat-end": "chat-start"}`}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="/user.png"
                  />
                </div>
              </div>
              <div className="chat-bubble">
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* INPUT */}
      <form onSubmit={handleSend} className="bg-base-300 rounded-xl p-4">
        <div className="flex items-center gap-4">
          {/* Input */}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="input input-bordered w-full"
          />

          {/* Send Button */}
          <button
            type="submit"
            className="btn btn-sm btn-primary rounded-lg flex items-center"
          >
            <Send size={18} />
            <span>Send</span>
          </button>
        </div>
      </form>
    </div>
  );
}
