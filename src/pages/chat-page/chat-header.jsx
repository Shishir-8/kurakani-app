import { LogOut } from "lucide-react";
import { logoutUser } from "../../services/auth-service";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useChatStore } from "../../store/use-chat-store";
import { auth } from "../../config/firebase";

export default function ChatHeader() {
  const navigate = useNavigate();
  const {selectedUser} = useChatStore()
  return (
    <div className="navbar bg-base-300 border-b border-white/10 px-4 h-18 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="w-10 rounded-full ring ring-base-300">
            <img src="https://i.pravatar.cc/150?img=1" />
          </div>
        </div>

        <div className="leading-tight">
          <h2 className="text-sm font-semibold text-base-content">{selectedUser?.fullName}</h2>

          <p className="text-xs text-success flex items-center gap-1">
            <span className="w-1 h-1 bg-success rounded-full"></span>
            Online
          </p>
        </div>
      </div>
    </div>
  );
}
