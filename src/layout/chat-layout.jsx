import ChatPage from "../pages/chat-page/chart-page";
import ChatHeader from "../pages/chat-page/chat-header";
import SidebarPage from "../pages/chat-page/sidebar";


export default function ChatLayout() {
  return (
    <div className="h-screen flex">
      <div className="w-80">
        <SidebarPage />
      </div>

      <div className="flex-1 flex flex-col h-screen">
        <div className="shrink-0">
          <ChatHeader />
        </div>

        <div className="flex-1 overflow-y-auto">
          <ChatPage />
        </div>
      </div>
    </div>
  );
}
