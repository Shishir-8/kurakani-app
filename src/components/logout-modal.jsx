const LogoutModal = ({ isOpen, onClose, onLogout }) => {
    
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm rounded-xl bg-base-100 p-6 shadow-xl">
        <h2 className="text-xl font-bold text-gray-200">
          Logout
        </h2>

        <p className="mt-3 text-gray-400">
          Are you sure you want to logout from your account?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg btn cursor-pointer border border-gray-300 px-4 py-2 font-medium text-gray-400 transition"
          >
            Cancel
          </button>

          <button
            onClick={onLogout}
            className="rounded-lg btn cursor-pointer bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;