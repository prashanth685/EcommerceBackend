import jwt from "jsonwebtoken";
//login seller :/api/seller/login

export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      password === process.env.SELLER_PASSWORD &&
      email === process.env.SELLER_EMAIL
    ) {
      const token = jwt.sign(
        {
          email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );
      res.cookie("sellertoken", token, {
        httpOnly: true, //prevent js to access cookie
        secure: process.env.NODE_ENV === "production", //user secure cookies in production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF protection
        maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiration time
      });

      return res.json({
        success: true,
        message: "logged in",
      });
    } else {
      return res.json({
        success: false,
        message: "invalid creditials",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//Check Auth: /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
  try {
    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//Logout User ::/api/seller/logout
export const sellerlogout = async (req, res) => {
  try {
    res.clearCookie("sellertoken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({
      success: "true",
      message: "logged out",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
