export const getUser = (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar
      }
    });
  } else {
    res.status(401).json({ success: false, message: 'Not authenticated' });
  }
};

export const logout = (req, res) => {
  // Nothing to do server-side with JWT logout
  res.json({ success: true, message: 'Client should remove the token' });
};
