const bcrypt = require("bcrypt");
const superAdminService = require("../services/superAdminService");
const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // verify if user exist in Db
  const superAdminFromDb = await superAdminService.findSuperAdminByEmail(email);
  if (superAdminFromDb !== null) {
    //hash password
    if (await bcrypt.compare(password, superAdminFromDb.password)) {
      const user = {
        name: superAdminFromDb.name,
        email: superAdminFromDb.email,
        id: superAdminFromDb.id,
      };
      // generate jwt
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "10m",
      }); // change it to 10 minutes
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "20m",
      }); // change it to 1 day
      await superAdminService.updateSuperAdmin(superAdminFromDb.id, {
        refresh_token: refreshToken,
      });
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // change to 24*60*60*1000
        // sameSite: "None",
        // secure: true,
      });

      return res.json({
        message: "success",
        accessToken,
      });
    } else {
      return res.json({ message: "Wrong Email or Password" });
    }
  } else {
    return res.json({ message: "Wrong Email or Password" });
  }
};
exports.refreshToken = async (req, res, next) => {
  //check cookies
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  // get user with this cookie
  const foundSuperAdmin = await superAdminService.getSuperAdminWithRefreshToken(
    refreshToken
  );
  if (!foundSuperAdmin) return res.sendStatus(403);

  // verify jwt refresh
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (
      err ||
      foundSuperAdmin.email !== decoded.email ||
      foundSuperAdmin.name !== decoded.name ||
      foundSuperAdmin.id !== decoded.id
    )
      return res.sendStatus(403);
    const accessToken = jwt.sign(
      {
        id: foundSuperAdmin.id,
        email: foundSuperAdmin.email,
        name: foundSuperAdmin.name,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" } // change it to 10 minutes
    );
    res.json({ accessToken });
  });
};
exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;
  const superAdminFromDb = await superAdminService.findSuperAdminByEmail(email);
  if (superAdminFromDb == null) {
    const hashedPaswword = await bcrypt.hash(password, 10);
    const newSuperAdmin = await superAdminService.createSuperAdmin({
      name,
      email,
      password: hashedPaswword,
    });
    return res.json({ message: "success", user: newSuperAdmin });
  } else {
    return res.json({ message: "User Already exists" });
  }
};
exports.logout = async (req, res, next) => {
  // delete access token on frontend
  //check cookies
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  // get user with this refreshToken
  const foundSuperAdmin = await superAdminService.getSuperAdminWithRefreshToken(
    refreshToken
  );

  if (!foundSuperAdmin) {
    res.clearCookie("jwt", {
      httpOnly: true,
      // sameSite: "None",
      // secure: true,
    });
    return res.sendStatus(204);
  }

  // verify jwt refresh
  await superAdminService.updateAdmin(foundSuperAdmin.id, {
    refresh_token: null,
  });
  res.clearCookie("jwt", {
    httpOnly: true,
    // sameSite: "None",
    // secure: true,
  });
  res.sendStatus(204);
};
