const { verifyAccessJWT } = require("../helpers/jwt.helper");
const { getJWT,deleteJWT } = require("../helpers/redis.helper");

const userAuthorization = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log("Headers:", req.headers);

  if (!authorization) {
    return res.status(403).json({ message: "Forbidden. No token." });
  }

  try {
    const token = authorization.split(" ")[1];
    const decoded = await verifyAccessJWT(token);
    console.log(decoded);

    if (decoded.email) {
      const userId = await getJWT(token);
      if (!userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      req.userId = userId;
      return next();
    }
    deleteJWT(authorization)

    return res.status(403).json({ message: "Forbidden" });
  } catch (error) {
    return res.status(403).json({ message: "Forbidden", error: error.message });
  }
};

module.exports = {
  userAuthorization,
};
