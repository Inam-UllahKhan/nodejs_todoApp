import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  // Set the token as an HTTP-only cookie
  res.status(statusCode).cookie("token", token, {
    httpOnly: true,
    maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds
    sameSite: process.env.NODE_ENV === "Development" ? "Lax" : "none",
    secure: process.env.NODE_ENV === "Development" ? false : true,
  });

  return res.status(201).json({
    success: true,
    token,
    message,
  });
};
