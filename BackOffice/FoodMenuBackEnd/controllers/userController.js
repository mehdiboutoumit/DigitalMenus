const userService = require("../services/userService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res, next) => {
  const { name, email, password, id_role, id_restaurant , accessType } = req.body;
  //const { user: connectedUser } = req;
  const userFromDb = await userService.findUserByEmail(email);
  if (userFromDb == null) {
    const hashedPaswword = await bcrypt.hash(password, 10);
    const newUser = await userService.createUser({
      name,
      email,
      password: hashedPaswword,
      id_role,
      id_restaurant,
      accessType
    });
    return res.json({ message: "success", user: newUser });
  } else {
    return res.json({ message: "User Already exists" });
  }
};
exports.getAllUsers = async (req, res, next) => {
  const {id} = req.params;
  const users = await userService.getAllUsers(id);
  return res.json({ message: "success", users: users });
};
exports.getAllUsersOfRestaurant = async (req, res, next) => {
  if (req.params?.idRestaurant) {
    const users = await userService.getAllUsersOfRestaurant(
      req.params?.idRestaurant
    );
    return res.json({ message: "success", users: users });
  } else {
     return res.json({ message: "there is no restaurant with this id"});
  }
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const userFromDb = await userService.findUserByEmail(email);
  if (userFromDb !== null) {
    if (await bcrypt.compare(password, userFromDb.password)) {
      const user = {
        name: userFromDb.name,
        email: userFromDb.email,
        id: userFromDb.id,
        accessType : userFromDb.accessType,
        id_role : userFromDb.id_role,
        id_restaurant : userFromDb.id_restaurant
      };
      // generate jwt
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        //expiresIn: "10m",
      }); // change it to 10 minutes
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
       // expiresIn: "20m",
      }); // change it to 1 day
      await userService.updateUser(userFromDb.id, {
        refresh_token: refreshToken,
      });
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // change to 24*60*60*1000
        // sameSite: "None",
        // secure: true,
      });
      

      return res.json({
        accessToken,
        accessType : user.accessType,
        role: user.id_role,
        userId : user.id,
        name : user.name,
        resuatrantId : user.id_restaurant
      });
    } else {
      return res.status(400).json({ message: "Wrong Email or Password" });
    }
  } else {
    return res.status(400).json({ message: "Wrong Email or Password" });
  }
};

exports.refreshToken = async (req, res, next) => {
  //check cookies
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  // get user with this cookie
  const foundUser = await userService.getUserWithRefreshToken(refreshToken);
  if (!foundUser) return res.sendStatus(403);

  // verify jwt refresh
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (
      err ||
      foundUser.email !== decoded.email ||
      foundUser.name !== decoded.name ||
      foundUser.id !== decoded.id
    )
      return res.sendStatus(403);
    const accessToken = jwt.sign(
      {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "50m" } // change it to 10 minutes
    );
    res.json({ accessToken });
  });
};
exports.logout = async (req, res, next) => {
  // delete access token on frontend
  //check cookies
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  // get user with this refreshToken
  const foundUser = await userService.getUserWithRefreshToken(refreshToken);

  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      // sameSite: "None",
      // secure: true,
    });
    return res.sendStatus(204);
  }

  // verify jwt refresh
  await userService.updateUser(foundUser.id, {
    refresh_token: null,
  });
  res.clearCookie("jwt", {
    httpOnly: true,
    // sameSite: "None",
    // secure: true,
  });
  res.sendStatus(204);
};

exports.getUserById = async (req, res, next) => {
  const { id } = req.params;
  const userFromDb = await userService.getUserById(id);
  if (userFromDb !== null) {
    const user = {
      name: userFromDb.name,
      email: userFromDb.email,
      id: userFromDb.id,
      accessType : userFromDb.accessType,
      id_role: userFromDb.id_role,
      id_admin: userFromDb.id_admin,
      id_restaurant: userFromDb.id_restaurant,
    };
    return res.json({ message: "success user", user });
  } else {
    return res.json({ message: "there is no user with this id" });
  }
};
exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { body: user } = req;
  var updateduser = {};
  if(user.name) updateduser.name = user.name;
  if(user.email) updateduser.email = user.email;
  if(user.password) updateduser.password = user.password;
  if(user.accessType) updateduser.accessType = user.accessType;
  await userService.updateUser(id, updateduser);
  return res.json({ message: "success" });
};

exports.deleteUser = async (req,res)=>{
  userService.deleteUser(req.params.id);
  return res.json({ message: "success" });
}
