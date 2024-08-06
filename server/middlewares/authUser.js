import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  try {
    // destructure token from cookies
    const { token } = req.cookies;

    if (!token) {
      return res
        .status(401)
        .json({ succuss: false, message: "unauthoraized user" });
    }
    // verify token using jwt verify
    const tokenVerify = jwt.verify(token, process.env.JWT_KEY);
    if (!tokenVerify) {
      return res
        .status(401)
        .json({ succuss: false, message: "unauthoraized user" });
    }
    // to get user data from jwt
    req.user = tokenVerify;
    // next middleware function
    next();
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "interal server error" });
  }
};
