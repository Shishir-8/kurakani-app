import { useState } from "react";
import { Mail, Lock, User, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../services/auth-service";
import toast from "react-hot-toast";
import { validateSignup } from "../../lib/auth-validation";

export default function SignUp() {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    remember: false,
  });

  const [valerror, setValError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSignupData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValError("");
    const validationError = validateSignup(signupData);
    if (validationError) {
      setValError(validationError);
      return;
    }

    try {
      setLoading(true);
      const res = await signUp(
        signupData.email,
        signupData.password,
        signupData.fullName,
      );
      toast.success("Registered Succesfully");
      navigate("/");
    } catch (error) {
      toast.error(error?.code.split("/")[1]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-sm">
        {/* Error */}
        {valerror && (
          <div className="alert alert-error alert-soft mb-4 shadow-lg">
            <AlertCircle size={18} />
            <span>{valerror}</span>
          </div>
        )}

        {/* Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="text-center text-2xl font-bold text-base-content">
              Create account 👋
            </h2>

            <p className="text-center text-sm opacity-70 mb-4">
              Sign up to get started
            </p>

            {/* Full Name */}
            <label className="input input-bordered flex items-center gap-2 w-full">
              <User size={18} className="opacity-60" />
              <input
                type="text"
                name="fullName"
                className="grow"
                placeholder="Full name"
                value={signupData.fullName}
                onChange={handleChange}
              />
            </label>

            {/* Email */}
            <label className="input input-bordered flex items-center gap-2 mt-3 w-full">
              <Mail size={18} className="opacity-60" />
              <input
                type="email"
                name="email"
                className="grow"
                placeholder="Email"
                value={signupData.email}
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
                value={signupData.password}
                onChange={handleChange}
              />
            </label>

            {/* Confirm Password */}
            <label className="input input-bordered flex items-center gap-2 mt-3 w-full">
              <Lock size={18} className="opacity-60" />
              <input
                type="password"
                name="confirmPassword"
                className="grow"
                placeholder="Confirm password"
                value={signupData.confirmPassword}
                onChange={handleChange}
              />
            </label>

            {/* Button */}
            <button
              onClick={handleSubmit}
              className="btn btn-primary mt-5 w-full"
            >
             {loading ? <span className="loading loading-spinner"></span>: "Sign Up"}
            </button>

            {/* Footer */}
            <p className="text-center text-sm mt-4 opacity-70">
              Already have an account?{" "}
              <Link to="/" className="link link-primary">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
