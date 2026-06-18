export const validateSignup = (data) => {
  const { fullName, email, password, confirmPassword } = data;

  if (!fullName || !email || !password || !confirmPassword) {
    return "All fields are required";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  return null; // no errors
};