const { IndividualOrder } = require("../models");

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
