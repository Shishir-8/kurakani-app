import { LogOut, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUsersStore } from "../../store/user-store";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useChatStore } from "../../store/use-chat-store";
import { onAuthStateChanged } from "firebase/auth";
import { logoutUser } from "../../services/auth-service";
import toast from "react-hot-toast";

export default function SidebarPage() {
  const navigate = useNavigate();
  const { users, setUsers } = useUsersStore();
  const { selectedUser, setSelectedUser, clearSelectedUser } = useChatStore();
  const user = auth.currentUser;

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) return;

      const snap = await getDocs(collection(db, "users"));

      const data = snap.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((user) => user.id !== currentUser.uid); 

      setUsers(data);
    });

    return () => unsub();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      clearSelectedUser()
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-base-300 border-r border-r-white/10">
      {/* Header */}
      <div className="p-4 h-16">
        <h1 className="text-2xl font-bold">Kura Kanii</h1>
      </div>

      {/* Search */}
      <div className="p-3 w-full">
        <label className="input input-bordered flex items-center gap-2  rounded-md w-full">
          <Search size={16} className="opacity-60" />
          <input type="text" className="grow" placeholder="Search chats..." />
        </label>
      </div>

      {/* Users */}
      <div className="flex-1 overflow-y-auto px-2 space-y-1">
        {users.map((user) => (
          <button
            key={user.id}
            onClick={() => {
              setSelectedUser(user);
              navigate(`/chat/${user.id}`);
            }}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition
              ${selectedUser?.id === user.id ? "bg-base-100" : "hover:bg-base-200/50"}`}
          >
            {/* Avatar */}
            <div className="avatar">
              <div className="w-11 rounded-full ring ring-base-300">
                <img src={"/user.png"} alt={user.fullName} />
              </div>
            </div>

            {/* Text */}
            <div className="flex-1 text-left min-w-0">
              <h3 className="text-sm font-medium text-base-content">
                {user.fullName}
              </h3>

              <p className="text-xs opacity-60 truncate">{user.message}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Current User */}
      <div className="p-3 border-t border-base-content/10 bg-base-200">
        <div className="flex items-center justify-between rounded-xl bg-base-100 p-3 shadow-sm">
          <div className="flex items-center gap-3 min-w-0">
            <div className="avatar online">
              <div className="w-12 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                <img src="/user.png" alt="User" />
              </div>
            </div>

            <div className="min-w-0">
              <h3 className="font-semibold truncate capitalize">
                {auth.currentUser?.email.split("@")[0]}
              </h3>

              <p className="text-xs opacity-60 truncate">
                {auth.currentUser?.email}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="btn btn-error btn-sm btn-circle"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
