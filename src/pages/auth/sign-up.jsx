import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import GoogleLogin from "./google-login";
import { signUp } from "../../services/auth-service";
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

      await signUp(
        signupData.email,
        signupData.password,
        signupData.fullName,
      );

      toast.success("Registered Successfully");
      navigate("/");
    } catch (error) {
      const message =
        error?.code?.split("/")[1] || "Registration failed";

      toast.error(message);
      setValError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full">

      <div className="flex w-full items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full"
        >

          {/* ================= HEADER ================= */}
          <div className="mb-7">
            <h2 className="text-3xl font-semibold tracking-tight text-base-content sm:text-4xl">
              Create account
            </h2>

            <p className="mt-2 text-sm text-base-content/60">
              Create your account and start chatting on Kura Kanni.
            </p>
          </div>

          {/* ================= ERROR ================= */}
          {valerror && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {valerror}
            </div>
          )}

          {/* ================= FULL NAME ================= */}
          <div>
            <label
              htmlFor="fullName"
              className="mb-2 block text-sm font-medium text-base-content"
            >
              Full name
            </label>

            <div className="flex h-12 w-full items-center gap-3 rounded-xl border border-base-content/15 bg-transparent px-4 transition-all focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10">

              {/* User Icon */}
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path
                  d="M20 21C20 17.6863 17.3137 15 14 15H10C6.68629 15 4 17.6863 4 21"
                  stroke="#6B7280"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                <circle
                  cx="12"
                  cy="7"
                  r="4"
                  stroke="#6B7280"
                  strokeWidth="2"
                />
              </svg>

              <input
                id="fullName"
                type="text"
                name="fullName"
                placeholder="Enter Full Name"
                value={signupData.fullName}
                onChange={handleChange}
                className="h-full w-full bg-transparent text-sm text-base-content outline-none placeholder:text-base-content/40"
                required
              />
            </div>
          </div>

          {/* ================= EMAIL ================= */}
          <div className="mt-5">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-base-content"
            >
              Email
            </label>

            <div className="flex h-12 w-full items-center gap-3 rounded-xl border border-base-content/15 bg-transparent px-4 transition-all focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10">

              {/* Email Icon */}
              <svg
                width="17"
                height="12"
                viewBox="0 0 16 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                  fill="#6B7280"
                />
              </svg>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={signupData.email}
                onChange={handleChange}
                className="h-full w-full bg-transparent text-sm text-base-content outline-none placeholder:text-base-content/40"
                required
              />
            </div>
          </div>

          {/* ================= PASSWORD ================= */}
          <div className="mt-5">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-base-content"
            >
              Password
            </label>

            <div className="flex h-12 w-full items-center gap-3 rounded-xl border border-base-content/15 bg-transparent px-4 transition-all focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10">

              {/* Lock Icon */}
              <svg
                width="14"
                height="18"
                viewBox="0 0 13 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path
                  d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                  fill="#6B7280"
                />
              </svg>

              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                value={signupData.password}
                onChange={handleChange}
                className="h-full w-full bg-transparent text-sm text-base-content outline-none placeholder:text-base-content/40"
                required
              />
            </div>
          </div>

          {/* ================= CONFIRM PASSWORD ================= */}
          <div className="mt-5">
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-base-content"
            >
              Confirm password
            </label>

            <div className="flex h-12 w-full items-center gap-3 rounded-xl border border-base-content/15 bg-transparent px-4 transition-all focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10">

              {/* Lock Icon */}
              <svg
                width="14"
                height="18"
                viewBox="0 0 13 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path
                  d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                  fill="#6B7280"
                />
              </svg>

              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={signupData.confirmPassword}
                onChange={handleChange}
                className="h-full w-full bg-transparent text-sm text-base-content outline-none placeholder:text-base-content/40"
                required
              />
            </div>
          </div>

          {/* ================= SIGN UP BUTTON ================= */}
          <button
            type="submit"
            disabled={loading}
            className="mt-7 flex h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-indigo-500 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-600 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              "Create account"
            )}
          </button>

          {/* ================= GOOGLE SEPARATOR ================= */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-base-content/10" />

            <span className="whitespace-nowrap text-xs font-medium uppercase tracking-wide text-base-content/40">
              or continue with
            </span>

            <div className="h-px flex-1 bg-base-content/10" />
          </div>

          {/* ================= GOOGLE LOGIN ================= */}
          <div className="w-full">
            <GoogleLogin />
          </div>

          {/* ================= LOGIN ================= */}
          <p className="mt-6 text-center text-sm text-base-content/60">
            Already have an account?{" "}
            <Link
              to="/"
              className="font-medium text-indigo-500 transition-colors hover:text-indigo-600 hover:underline"
            >
              Sign in
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}

