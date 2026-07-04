import React from "react";
import toast from "react-hot-toast";
import { signInwithGoogle } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
    const navigate = useNavigate()

    const handleGoogleLogin = async () => {
        try {
            const res = await signInwithGoogle()
            console.log(res)
            if(res.user) {
                navigate('/chat')
                toast.success("Login Succesfully")
            }
        } catch (error) {
            toast.error(error?.messsage)
        }
    }


  return (
    <button type="button" onClick={handleGoogleLogin} className="flex items-center justify-center gap-3 w-full rounded-md border btn border-gray-300 bg-white px-4 text-gray-700 font-medium shadow-sm transition hover:bg-gray-50 hover:shadow-md">
      <svg
        className="h-5 w-5"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#FFC107"
          d="M43.611 20.083H42V20H24v8h11.303C33.655 32.657 29.243 36 24 36c-6.627 0-12-5.373-12-12S17.373 12 24 12c3.059 0 5.842 1.154 7.955 3.045l5.657-5.657C34.046 6.053 29.27 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
        />
        <path
          fill="#FF3D00"
          d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.955 3.045l5.657-5.657C34.046 6.053 29.27 4 24 4c-7.682 0-14.318 4.337-17.694 10.691z"
        />
        <path
          fill="#4CAF50"
          d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.154 35.091 26.677 36 24 36c-5.222 0-9.62-3.327-11.283-7.946l-6.522 5.025C9.53 39.556 16.227 44 24 44z"
        />
        <path
          fill="#1976D2"
          d="M43.611 20.083H42V20H24v8h11.303c-1.073 3.019-3.232 5.448-6.084 6.57l6.19 5.238C38.99 36.49 44 30.82 44 24c0-1.341-.138-2.65-.389-3.917z"
        />
      </svg>

      <span>Continue with Google</span>
    </button>
  );
};

export default GoogleLogin;
