import { useState } from "react";
import ChatPage from "../pages/chat-page/chart-page";
import SidebarPage from "../pages/chat-page/sidebar";
import { useChatStore } from "../store/use-chat-store";

export default function ChatLayout() {
  const {selectedUser} = useChatStore()

  return (
     <div className="h-screen w-full md:flex">
      {/* Desktop */}
      <div className="hidden md:flex w-full">
        <aside className="w-80 shrink-0 border-r border-base-300">
          <SidebarPage />
        </aside>

        <main className="flex-1">
          <ChatPage />
        </main>
      </div>

      {/* Mobile */}
      <div className="md:hidden h-full">
        {selectedUser ? <ChatPage /> : <SidebarPage />}
      </div>
    </div>
  );
}