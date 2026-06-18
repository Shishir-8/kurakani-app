import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SidebarPage() {
  const navigate = useNavigate();
  const [active, setActive] = useState(1);

  const users = [
    { id: 1, name: "John Doe", message: "Hey 👋", unread: 3 },
    { id: 2, name: "Sarah Smith", message: "See you tomorrow", unread: 0 },
    { id: 2, name: "Sarah Smith", message: "See you tomorrow", unread: 0 },
    { id: 2, name: "Sarah Smith", message: "See you tomorrow", unread: 0 },
    { id: 2, name: "Sarah Smith", message: "See you tomorrow", unread: 0 },
    { id: 2, name: "Sarah Smith", message: "See you tomorrow", unread: 0 },
    { id: 2, name: "Sarah Smith", message: "See you tomorrow", unread: 0 },
    { id: 2, name: "Sarah Smith", message: "See you tomorrow", unread: 0 },
    { id: 3, name: "Mike Wilson", message: "Project completed 🚀", unread: 1 },
    { id: 4, name: "Emma Brown", message: "Thanks!", unread: 0 },
    { id: 4, name: "Emma Brown", message: "Thanks!", unread: 0 },
    { id: 4, name: "Emma Brown", message: "Thanks!", unread: 0 },
    { id: 4, name: "Emma Brown", message: "Thanks!", unread: 0 },
    { id: 4, name: "Emma Brown", message: "Thanks!", unread: 0 },
    { id: 4, name: "Emma Brown", message: "Thanks!", unread: 0 },
    { id: 4, name: "Emma Brown", message: "Thanks!", unread: 0 },
  ];

  return (
    <div className="h-screen flex flex-col bg-base-100 border-r border-r-white/10">

      {/* Header */}
      <div className="p-4 border-b border-white/10 h-16">
        <h1 className="text-xl font-bold text-base-content text-center">
          Kura Kanii
        </h1>
      </div>

      {/* Search */}
      <div className="p-3">
        <label className="input input-bordered flex items-center gap-2  rounded-md">
          <Search size={16} className="opacity-60" />
          <input
            type="text"
            className="grow"
            placeholder="Search chats..."
          />
        </label>
      </div>

      {/* Users */}
      <div className="flex-1 overflow-y-auto px-2 space-y-1">

        {users.map((user) => (
          <button
            key={user.id}
            onClick={() => {
              setActive(user.id);
              navigate(`/chat/${user.id}`);
            }}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition
              ${
                active === user.id
                  ? "bg-base-200"
                  : "hover:bg-base-200/50"
              }`}
          >

            {/* Avatar */}
            <div className="avatar">
              <div className="w-11 rounded-full ring ring-base-300">
                <img
                  src={`https://i.pravatar.cc/150?img=${user.id}`}
                  alt={user.name}
                />
              </div>
            </div>

            {/* Text */}
            <div className="flex-1 text-left min-w-0">
              <h3 className="text-sm font-medium text-base-content">
                {user.name}
              </h3>

              <p className="text-xs opacity-60 truncate">
                {user.message}
              </p>
            </div>

            {/* Badge */}
            {user.unread > 0 && (
              <div className="badge badge-primary badge-sm">
                {user.unread}
              </div>
            )}

          </button>
        ))}

      </div>
    </div>
  );
}