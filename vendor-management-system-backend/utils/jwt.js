import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,             // MongoDB ObjectId
      name: user.name,
      email: user.email,
      avatar: user.avatar
    },
    process.env.JWT_SECRET,     // Secret key from .env
    {
      expiresIn: '1d'           // Token valid for 1 day
    }
  );
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null; // Invalid or expired token
  }
};