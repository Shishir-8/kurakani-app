import { useState } from "react";
import { Mail, Lock, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { loginuser } from "../../services/auth-service";
import toast from "react-hot-toast";

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!loginData.email || !loginData.password) {
      setError("Invalid credentials!");
      return;
    }

    try {
      setLoading(true)
      const res = await loginuser(loginData.email, loginData.password)
      toast.success("Login Successfull")
      navigate('/chat')
    } catch (error) {
      toast.error(error?.code.split("/")[1])
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">

      <div className="w-full max-w-sm">

        {/* Error */}
        {error && (
          <div className="alert alert-error mb-4 shadow-lg">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Card */}
        <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl">
          <div className="card-body">

            <h2 className="text-center text-2xl font-bold text-base-content">
              Welcome back 👋
            </h2>

            <p className="text-center text-sm opacity-70 mb-4">
              Login to continue
            </p>

            <label className="input input-bordered flex items-center gap-2 w-full">
              <Mail size={18} className="opacity-60" />
              <input
                type="email"
                name="email"
                className="grow"
                placeholder="Email"
                value={loginData.email}
                onChange={handleChange}
              />
            </label>

            {/* Password */}
            <label className="input input-bordered flex items-center gap-2 mt-3 w-full">
              <Lock size={18} className="opacity-60" />
              <input
                type="password"
                name="password"
                className="grow"
                placeholder="Password"
                value={loginData.password}
                onChange={handleChange}
              />
            </label>

            <div className="flex items-center justify-between mt-3 text-xs md:text-sm">

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox checkbox-xs"
                  name="remember"
                  checked={loginData.remember}
                  onChange={handleChange}
                />
                Remember me
              </label>

              <a className="link link-primary text-xs">
                Forgot password?
              </a>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="btn btn-primary mt-5 w-full"
            >
             {loading ? <span className="loading loading-spinner"></span>: "Login"}
            </button>

            {/* Footer */}
            <p className="text-center text-sm mt-4 opacity-70">
              Don’t have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Sign up
              </Link>
            </p>

          </div>
        </form>

      </div>
    </div>
  );
}