import { Request } from "express";
import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET } from "../../constants";

export const context = ({ req }: { req: Request }) => {
  const authorization = req.headers["authorization"];
  let currentUser;

  if (!authorization) {
    return {
      currentUser
    };
  }

  try {
    currentUser = jsonwebtoken.verify(authorization, JWT_SECRET);
  } catch {
    console.warn("jwt malformed");
  }

  return {
    currentUser
  };
};
