const { GlobalOrder, IndividualOrder, Extra } = require("../models");

exports.createGlobalOrder = async (order) => {
  const globalOrderInstance = await GlobalOrder.create({
    id_table: order.id_table,
    id_restaurant: order.id_restaurant,
  });
  return globalOrderInstance.toJSON();
};

exports.getAllOrdersOfRestaurant = async (idRestaurant) => {
  
  
  let orders = await GlobalOrder.findAll({
    where: {
      id_restaurant: idRestaurant,
    },
    attributes: ["id", "id_table", "id_restaurant","createdAt"],
    include: [
      {
        model: IndividualOrder,
        as: "IndividualOrders",
        attributes: ["id", "price", "note", "id_dish", "id_portion"],
        include: [
          {
            model: Extra,
            as: "Extras",
            attributes: ["id", "name", "price"],
            through: {
              attributes: [],
            },
            // include: [
            //   {
            //     model: IndividualOrder,
            //     attributes: [],
            //   },
            // ],
          },
        ],
      },
    ],
    // model: "IndividualOrder",
    // inlcude: {
    //   model: "Extra",
    //   through: "ExtraOrder",
    // },
    // },]
  });
  if (orders == null) {
    return [];
  }

  // dishes = dishes.map((dish) => {
  //   return {
  //     id: dish.dataValues.id,
  //     name: dish.dataValues.name,
  //     image: dish.dataValues.image,
  //     description: dish.dataValues.description,
  //     is_sold_out: dish.dataValues.is_sold_out,
  //     preparation_time: dish.dataValues.preparation_time,
  //     price: dish.dataValues.price,
  //     calories: dish.dataValues.calories,
  //     id_category: dish.dataValues.id_category,
  //   };
  // });
  console.log(orders);
  return orders;
};
