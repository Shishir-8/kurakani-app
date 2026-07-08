import { useState } from "react";
import { Send } from "lucide-react";
import ChatHeader from "./chat-header";
import { sendMessage } from "../../services/chat-service";
import { auth } from "../../config/firebase";
import { useChatStore } from "../../store/use-chat-store";
import { useMessages } from "../../hooks/use-message";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const user = auth.currentUser;
  const { selectedUser } = useChatStore();

  const messages = useMessages(user?.uid, selectedUser?.id);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!message.trim() || !selectedUser) return;

    await sendMessage(user.uid, selectedUser.id, message);
    setMessage("");
  };

  if (!selectedUser) {
    return (
      <div className="flex h-full items-center justify-center bg-base-100">
        <div className="max-w-md text-center px-4">
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 md:h-24 md:w-24">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-primary md:h-12 md:w-12"
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

          <h2 className="mb-3 text-2xl font-bold md:text-3xl">
            Welcome to Kura Kanii 👋
          </h2>

          <p className="text-base-content/60">
            Select a conversation from the sidebar to start chatting.
            Your messages will appear here in real time.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-base-100">
      {/* Header */}
      <div className="shrink-0 border-b border-base-300">
        <ChatHeader />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-4 md:px-8 lg:px-12">
        <div className="space-y-3">
          {messages.map((msg, index) => {
            const isMe = msg.senderId === user.uid;

            return (
              <div
                key={index}
                className={`chat ${isMe ? "chat-end" : "chat-start"}`}
              >
                <div className="chat-image avatar">
                  <div className="w-8 rounded-full md:w-10">
                    <img src="/user.png" alt="User" />
                  </div>
                </div>

                <div className="chat-bubble max-w-[80%] break-words md:max-w-md">
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="shrink-0 border-t border-base-300 bg-base-200 p-3"
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="input input-bordered flex-1"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            type="submit"
            className="btn btn-primary btn-square md:btn-md"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}