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
import LogoutModal from "../../components/logout-modal";

export default function SidebarPage() {
  const navigate = useNavigate();

  const { users, setUsers } = useUsersStore();

  const [open, setOpen] = useState(false);

  const {
    selectedUser,
    setSelectedUser,
    clearSelectedUser,
  } = useChatStore();

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
  }, [setUsers]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      clearSelectedUser();
      navigate("/");
      toast.success("Logout Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <aside className="flex h-screen w-full flex-col border-r border-base-content/10 bg-base-200">

      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="flex h-[72px] items-center border-b border-base-content/10 px-5">

        <div className="flex items-center gap-3">

          {/* Logo */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500 shadow-md shadow-indigo-500/20">
            <span className="text-lg font-bold text-white">
              K
            </span>
          </div>

          {/* Brand */}
          <div>
            <h1 className="text-lg font-bold tracking-tight">
              Kura Kanni
            </h1>

            <p className="text-[11px] text-base-content/45">
              Messages
            </p>
          </div>

        </div>
      </div>

      {/* =====================================================
          SEARCH
      ===================================================== */}
      <div className="px-4 py-4">

        <label className="flex h-11 w-full items-center gap-3 rounded-xl border border-base-content/10 bg-base-100 px-3 transition-all focus-within:border-indigo-500/50 focus-within:ring-4 focus-within:ring-indigo-500/10">

          <Search
            size={17}
            className="shrink-0 text-base-content/40"
          />

          <input
            type="text"
            placeholder="Search conversations..."
            className="h-full w-full bg-transparent text-sm outline-none placeholder:text-base-content/35"
          />

          <kbd className="hidden rounded-md border border-base-content/10 bg-base-200 px-1.5 py-0.5 text-[10px] text-base-content/40 sm:block">
            /
          </kbd>

        </label>
      </div>

      {/* =====================================================
          SECTION TITLE
      ===================================================== */}
      <div className="flex items-center justify-between px-5 pb-2">

        <p className="text-[11px] font-semibold uppercase tracking-wider text-base-content/40">
          Conversations
        </p>

        <span className="text-[11px] text-base-content/35">
          {users.length}
        </span>

      </div>

      {/* =====================================================
          USERS
      ===================================================== */}
      <div className="flex-1 space-y-1 overflow-y-auto px-3 pb-3">

        {users.map((user) => {
          const isSelected = selectedUser?.id === user.id;

          return (
            <button
              key={user.id}
              onClick={() => {
                setSelectedUser(user);
                navigate(`/chat/${user.id}`);
              }}
              className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 ${
                isSelected
                  ? "bg-base-100 shadow-sm"
                  : "hover:bg-base-100/60"
              }`}
            >

              {/* Avatar */}
              <div className="relative shrink-0">

                <div
                  className={`h-11 w-11 overflow-hidden rounded-full ${
                    isSelected
                      ? "ring-2 ring-indigo-500/40 ring-offset-2 ring-offset-base-200"
                      : ""
                  }`}
                >
                  <img
                    src="/user.png"
                    alt={user.fullName}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Online indicator */}
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-base-200 bg-emerald-500" />

              </div>

              {/* User Info */}
              <div className="min-w-0 flex-1">

                <div className="flex items-center justify-between gap-2">

                  <h3
                    className={`truncate text-sm ${
                      isSelected
                        ? "font-semibold"
                        : "font-medium"
                    }`}
                  >
                    {user.fullName}
                  </h3>

                </div>

                <p className="mt-0.5 truncate text-xs text-base-content/45">
                  {user.message || "Start a conversation"}
                </p>

              </div>

              {/* Selected indicator */}
              {isSelected && (
                <div className="h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
              )}

            </button>
          );
        })}

      </div>

      {/* =====================================================
          CURRENT USER
      ===================================================== */}
      <div className="border-t border-base-content/10 p-3">

        <div className="flex items-center gap-3 rounded-2xl bg-base-100 p-3 shadow-sm">

          {/* Avatar */}
          <div className="relative shrink-0">

            <div className="h-11 w-11 overflow-hidden rounded-full ring-2 ring-base-200">
              <img
                src="/user.png"
                alt="User"
                className="h-full w-full object-cover"
              />
            </div>

            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-base-100 bg-emerald-500" />

          </div>

          {/* User Info */}
          <div className="min-w-0 flex-1">

            <h3 className="truncate text-sm font-semibold">
              {auth.currentUser?.email?.split("@")[0]}
            </h3>

            <p className="mt-0.5 truncate text-xs text-base-content/45">
              {auth.currentUser?.email}
            </p>

          </div>

          {/* Logout */}
          <button
            onClick={() => setOpen(true)}
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl text-base-content/45 transition-all hover:bg-red-500/10 hover:text-red-500"
            title="Logout"
          >
            <LogOut size={17} />
          </button>

        </div>

      </div>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onLogout={handleLogout}
      />

    </aside>
  );
}