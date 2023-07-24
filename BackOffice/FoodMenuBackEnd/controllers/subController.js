const SubService = require("../services/SubService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createSub = async (req, res, next) => {
  const { name, email, points, id_restaurant  } = req.body;
    const newSub = await SubService.createSub({
      name,
      email,
      points,
      id_restaurant,
    });
    return res.json({ message: "success", Sub: newSub });
};
exports.getAllSubs = async (req, res, next) => {
  const Subs = await SubService.getAllSubs();
  return res.json({ message: "success", subs: Subs });
};
exports.getAllSubsOfRestaurant = async (req, res, next) => {
  if (req.params?.idRestaurant) {
    const Subs = await SubService.getAllSubsOfRestaurant(
      req.params?.idRestaurant
    );
    return res.json({ message: "success", Subs: Subs });
  } else {
     return res.json({ message: "there is no restaurant with this id"});
  }
};


exports.getSubById = async (req, res, next) => {
  const { id } = req.params;
  const SubFromDb = await SubService.getSubById(id);
  if (SubFromDb !== null) {
    const Sub = {
      name: SubFromDb.name,
      email: SubFromDb.email,
      id: SubFromDb.id,
      accessType : SubFromDb.accessType,
      id_role: SubFromDb.id_role,
      id_admin: SubFromDb.id_admin,
      id_restaurant: SubFromDb.id_restaurant,
    };
    return res.json({ message: "success Sub", Sub });
  } else {
    return res.json({ message: "there is no Sub with this id" });
  }
};
exports.updateSub = async (req, res, next) => {
  const { id } = req.params;
  const { body: Sub } = req;
  var updatedSub = {};
  if(Sub.name) updatedSub.name = Sub.name;
  if(Sub.email) updatedSub.email = Sub.email;
  if(Sub.points) updatedSub.points = Sub.points;
  await SubService.updateSub(id, updatedSub);
  return res.json({ message: "success" });
};
