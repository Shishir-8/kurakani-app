import { ArrowLeft } from "lucide-react";
import { useChatStore } from "../../store/use-chat-store";

export default function ChatHeader() {
  const { selectedUser, clearSelectedUser } = useChatStore();

  if (!selectedUser) return null;

  return (
    <header className="flex h-16 items-center justify-between border-b border-base-300 bg-base-300 px-4">
      <div className="flex items-center gap-3">
        {/* Mobile Back */}
        <button
          onClick={clearSelectedUser}
          className="md:hidden p-2 -ml-2 rounded-full transition bg-base-200 hover:bg-base-100 active:scale-95"
        >
          <ArrowLeft size={22} className="text-base-content" />
        </button>

        {/* Avatar */}
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src="/user.png" alt={selectedUser.fullName} />
          </div>
        </div>

        {/* User Info */}
        <div>
          <h2 className="font-semibold leading-none">
            {selectedUser.fullName}
          </h2>

          <div className="mt-1 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-success"></span>

            <p className="text-xs text-base-content/60">
              Online
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}