const { GlobalOrder, IndividualOrder, Extra } = require("../models");
const { Sequelize, DataTypes } = require('sequelize');

exports.startOrder = async (id) => {
  await GlobalOrder.update({state : 1}, {
    where: {
      id: id,
    },
  });
};

exports.finishOrder = async (id) => {
  await GlobalOrder.update({state : 2}, {
    where: {
      id: id,
    },
  });
};

exports.deleteOrder = async (id) => {
  const order = await GlobalOrder.destroy({
    where: {
      id: id,
    },
  });
  return order;
};


// Function to calculate monthly and annual income for a restaurant
const calculateIncome = async (restaurantId) => {
  // Calculate monthly income
  const date = new Date();
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const monthlyIncome = await GlobalOrder.sum('price', {
    where: {
      id_restaurant: restaurantId,
      createdAt: {
        [Sequelize.Op.between]: [firstDayOfMonth, lastDayOfMonth],
      },
    },
    include: [{ model: IndividualOrder, attributes: [] }],
  });
console.log(monthlyIncome);
  // Calculate annual income
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const lastDayOfYear = new Date(date.getFullYear(), 12, 0);

  const annualIncome = await GlobalOrder.sum('price', {
    where: {
      id_restaurant: restaurantId,
      createdAt: {
        [Sequelize.Op.between]: [firstDayOfYear, lastDayOfYear],
      },
    },
    include: [{ model: IndividualOrder, attributes: [] }],
  });

  return {
    restaurantId,
    m_income: monthlyIncome || 0,
    y_income: annualIncome || 0,
  };
};

// Function to get the dashboard data
exports.getDashboardData = async () => {
  try {
    // Fetch the list of restaurants
    const restaurants = await GlobalOrder.findAll({
      attributes: ['id_restaurant'],
      group: ['id_restaurant'],
    });

    console.log("restau : ",restaurants);
    // Calculate the income for each restaurant
    const rows = await Promise.all(
      restaurants.map(async (restaurant) => {
        const { id_restaurant } = restaurant;
        return calculateIncome(id_restaurant);
      })
    );

    // Prepare the data object
    const data = {
      columns: [
        { label: 'Resturant', field: 'restaurantId' },
        { label: 'Revenue Mensuel', field: 'm_income' },
        { label: 'Revenue annuel', field: 'y_income' },
      ],
      rows,
    };

    return data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return null;
  }
};

// // Call the getDashboardData function to get the dashboard data
// const dashboardData = await getDashboardData();
// console.log(dashboardData);





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
    attributes: ["id","state", "id_table", "id_restaurant","createdAt"],
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
