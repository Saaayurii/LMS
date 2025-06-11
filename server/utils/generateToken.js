import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      secure: true,            // ✅ ОБЯЗАТЕЛЬНО для HTTPS (Vercel/Render)
      sameSite: "None",        // ✅ для работы куки между разными доменами
      maxAge: 24 * 60 * 60 * 1000, // 1 день
    })
    .json({
      success: true,
      message,
      user,
    });
};
