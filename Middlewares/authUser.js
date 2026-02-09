import jwt from "jsonwebtoken";
const authUser = async (req, res, next) => {
  const { token } = req.cookies;
  console.log("token from cookies", token);
  if (!token) {
    return res.json({
      success: false,
      message: "not authorized",
    });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id;
    } else {
      return res.json({
        success: false,
        message: "Not Authorized",
      });
    }
    next();
  } catch (error) {
    console.log("jwt verify error", error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export default authUser;
