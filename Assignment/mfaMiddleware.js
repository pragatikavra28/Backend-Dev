const jwt = require("jsonwebtoken");

const otpStore = new Map();

const verifyMFA = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  const otp = req.headers["x-otp"];

  if (!token || !otp) {
    return res.status(401).json({ message: "Token and OTP required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const storedOtp = otpStore.get(decoded.userId);

    if (!storedOtp || storedOtp !== otp) {
      return res.status(403).json({ message: "Invalid OTP" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { verifyMFA, otpStore };