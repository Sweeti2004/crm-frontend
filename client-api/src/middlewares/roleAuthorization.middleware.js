const { verifyAccessJWT } = require("../helpers/jwt.helper");
const { getJWT } = require("../helpers/redis.helper");

/**
 * Enhanced authorization middleware that checks both token and user role
 */
const userAuthorization = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(403).json({ message: "Forbidden. No token." });
  }

  try {
    const token = authorization.split(" ")[1];
    const decoded = await verifyAccessJWT(token);

    if (decoded.email) {
      const userId = await getJWT(token);
      if (!userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      req.userId = userId;
      req.userEmail = decoded.email;
      return next();
    }

    return res.status(403).json({ message: "Forbidden" });
  } catch (error) {
    return res.status(403).json({ message: "Forbidden", error: error.message });
  }
};

/**
 * Role-based authorization middleware
 * Checks if user has required role
 */
const roleAuthorization = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      // First, verify token and get userId
      const { authorization } = req.headers;

      if (!authorization) {
        return res.status(403).json({ message: "Forbidden. No token." });
      }

      const token = authorization.split(" ")[1];
      const decoded = await verifyAccessJWT(token);

      if (!decoded.email) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const userId = await getJWT(token);
      if (!userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      // Get user from database to check role
      const { getUserById } = require("../model/user/User.model");
      const user = await getUserById(userId);

      if (!user || !user.isActive) {
        return res.status(403).json({ message: "User not found or inactive" });
      }

      // Check if user has required role
      if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return res.status(403).json({ 
          message: "Insufficient permissions. Required role: " + allowedRoles.join(" or ")
        });
      }

      // Attach user info to request
      req.userId = userId;
      req.userEmail = decoded.email;
      req.userRole = user.role;
      req.user = user;

      next();
    } catch (error) {
      return res.status(403).json({ message: "Forbidden", error: error.message });
    }
  };
};

/**
 * Client-only authorization
 */
const clientOnly = roleAuthorization(['client']);

/**
 * Support staff authorization (support + admin)
 */
const supportOnly = roleAuthorization(['support', 'admin']);

/**
 * Admin-only authorization
 */
const adminOnly = roleAuthorization(['admin']);

/**
 * Client or Admin authorization
 */
const clientOrAdmin = roleAuthorization(['client', 'admin']);

module.exports = {
  userAuthorization,
  roleAuthorization,
  clientOnly,
  supportOnly,
  adminOnly,
  clientOrAdmin,
};
