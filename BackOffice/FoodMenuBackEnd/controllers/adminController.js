const bcrypt = require("bcrypt");
const adminService = require("../services/adminService");
const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // verify if user exist in Db
  const adminFromDb = await adminService.findAdminByEmail(email);
  if (adminFromDb !== null) {
    //hash password
    if (await bcrypt.compare(password, adminFromDb.password)) {
      const user = {
        name: adminFromDb.name,
        email: adminFromDb.email,
        id: adminFromDb.id,
      };
      // generate jwt
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "10m",
      }); // change it to 10 minutes
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "20m",
      }); // change it to 1 day
      await adminService.updateAdmin(adminFromDb.id, {
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
      return res.status(401).json({ message: "Wrong Email or Password" });
    }
  } else {
    return res.status(401).json({ message: "Wrong Email or Password" });
  }
};
exports.refreshToken = async (req, res, next) => {
  //check cookies
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  // get user with this cookie
  const foundAdmin = await adminService.getAdminWithRefreshToken(refreshToken);
  if (!foundAdmin) return res.sendStatus(403);

  // verify jwt refresh
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (
      err ||
      foundAdmin.email !== decoded.email ||
      foundAdmin.name !== decoded.name ||
      foundAdmin.id !== decoded.id
    )
      return res.sendStatus(403);
    const accessToken = jwt.sign(
      {
        id: foundAdmin.id,
        email: foundAdmin.email,
        name: foundAdmin.name,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" } // change it to 10 minutes
    );
    res.json({ accessToken });
  });
};
exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(req)
  const adminFromDb = await adminService.findAdminByEmail(email);
  if (adminFromDb == null) {
    const { name, email, password } = req.body;
    if(name && email && password){
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = await adminService.createAdmin({
        name,
        email,
        password: hashedPassword,
      });
  
      console.log('New admin created:', newAdmin);
      res.status(200).json({ message: 'Admin created successfully' });
    } catch (error) {
      console.error('Error creating admin:', error);
      res.status(500).json({ message: 'Failed to create admin' });
    }
  } else {
    return res.status(500).json({ message: "User Already exists" });
  }
}else{
  return ""
}
};
exports.logout = async (req, res, next) => {
  // delete access token on frontend
  //check cookies
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  // get user with this refreshToken
  const foundAdmin = await adminService.getAdminWithRefreshToken(refreshToken);

  if (!foundAdmin) {
    res.clearCookie("jwt", {
      httpOnly: true,
      // sameSite: "None",
      // secure: true,
    });
    return res.sendStatus(204);
  }

  // verify jwt refresh
  await adminService.updateAdmin(foundAdmin.id, {
    refresh_token: null,
  });
  res.clearCookie("jwt", {
    httpOnly: true,
    // sameSite: "None",
    // secure: true,
  });
  res.sendStatus(204);
};
