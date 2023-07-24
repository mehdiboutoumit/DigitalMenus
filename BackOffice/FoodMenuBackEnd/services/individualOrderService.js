const { IndividualOrder } = require("../models");


exports.getAllIndivOrdersOfGlobalOrder = async (id_global_order) => {
  let orders = await IndividualOrder.findAll({
    where: {
      id_global_order: id_global_order,
    },
  });
  if (orders == null) {
    return [];
  }

  orders = orders.map((order) => {
    return {
      id: order.dataValues.id,
      price : order.dataValues.price,
      id_dish : order.dataValues.id_dish,
      id_restaurant: order.dataValues.id_portion,
      createdAt : order.dataValues.createdAt,
      note :order.dataValues.note
    };
  });
  return orders;
};

exports.createIndividualOrder = async (individualOrder) => {
  const individualOrderInstance = await IndividualOrder.create(
    {
      id_global_order: individualOrder.id_global_order,
      id_dish: individualOrder.id_dish,
      id_portion: individualOrder.id_portion,
      price: individualOrder.price,
      note: individualOrder.note,
    },
    {
      includes: ["Extra"],
      through: "ExtraOrder",
    }
  );
  await individualOrderInstance.addExtras(individualOrder.ids_extra);
  // const individualOrder = await IndividualOrder.findOne({
  //   where: {
  //     id: individualOrderInstance.toJSON().id,
  //   },
  //   include: [Extra],
  // });
  // console.log(individualOrderInstance.toJSON());

  // return individualOrder;
};
