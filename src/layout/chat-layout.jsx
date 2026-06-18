import ChatPage from "../pages/chat-page/chart-page";
import SidebarPage from "../pages/chat-page/sidebar";

export default function ChatLayout() {
  return (
    <div className="h-screen w-full overflow-hidden md:flex">
      
      {/* Sidebar */}
      <aside className="max-w-sm w-full shrink-0 border-r border-base-300">
        <SidebarPage />
      </aside>

      {/* Chat */}
      <main className="flex-1 min-w-0">
        <ChatPage />
      </main>

    </div>
  );
}