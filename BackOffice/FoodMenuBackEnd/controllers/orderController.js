const individualOrderService = require("../services/individualOrderService");
const globalOrderService = require("../services/globalOrderService");

exports.startOrder = async (req, res, next) => {
  const { id } = req.params;
  await globalOrderService.startOrder(id);
  return res.json({ message: "success" });
};

exports.finishOrder = async (req, res, next) => {
  const { id } = req.params;
  await globalOrderService.finishOrder(id);
  return res.json({ message: "success" });
};


exports.deletePortion = async (req,res)=>{
  portionService.deletePortion(req.params.id);
  return res.json({ message: "success" });
}




exports.getAllOrdersOfRestaurant = async (req, res, next) => {
  if (req.params?.idRestaurant) {
    const orders = await globalOrderService.getAllOrdersOfRestaurant(
      req.params.idRestaurant
    );
    return res.json({ message: "success", orders });
  } else {
    return res.json({ message: "there is no restaurant with this id" });
  }
};







exports.createOrder = async (req, res, next) => {
  const { body: globalOrder } = req;
  // const order = {
//     "id_table": "24720bf6-3f6f-4058-9622-cde5a5f28726",
//     "id_restaurant": "57a12c72-d53b-4c86-8c2c-343903c2b637",
//     "orders": [
//         {
//             "id_dish": "002caa19-db5a-40ee-a822-d67074913b2a",
//             "id_portion": "37c60114-1c1e-4d5b-9de9-dcd6ef3b7c36",
//             "price": 200,
//             "note": "Test from VsCode20",
//             "ids_extra": [
//                 "5e59e0f2-9fd2-4b2d-abcb-64226cd1c9fb",
//                 "629db723-d845-4055-86bc-7542f153dd97",
//                 "77faf7b7-0524-4170-b026-97c260fe7ebe"
//             ]
//         },
//         {
//             "id_dish": "002caa19-db5a-40ee-a822-d67074913b2a",
//             "id_portion": "37c60114-1c1e-4d5b-9de9-dcd6ef3b7c36",
//             "price": 100,
//             "note": "Test from VsCode10",
//             "ids_extra": [
//                 "5e59e0f2-9fd2-4b2d-abcb-64226cd1c9fb",
//                 "629db723-d845-4055-86bc-7542f153dd97",
//                 "77faf7b7-0524-4170-b026-97c260fe7ebe"
//             ]
//         }
//     ]
// }

  const newGlobalOrder = await globalOrderService.createGlobalOrder({
    id_table: globalOrder.id_table,
    id_restaurant: globalOrder.id_restaurant,
  });

  globalOrder.orders.forEach(async (individualOrder) => {
    await individualOrderService.createIndividualOrder({
      id_global_order: newGlobalOrder.id,
      id_dish: individualOrder.id_dish,
      id_portion: individualOrder.id_portion,
      price: individualOrder.price,
      note: individualOrder.note,
      ids_extra: individualOrder.ids_extra,
    });
  });
  return res.json({ message: "success", order: newGlobalOrder });
};

exports.createOrder = async (req, res, next) => {
  const { body: globalOrder } = req;
  // const order = {
//     "id_table": "24720bf6-3f6f-4058-9622-cde5a5f28726",
//     "id_restaurant": "57a12c72-d53b-4c86-8c2c-343903c2b637",
//     "orders": [
//         {
//             "id_dish": "002caa19-db5a-40ee-a822-d67074913b2a",
//             "id_portion": "37c60114-1c1e-4d5b-9de9-dcd6ef3b7c36",
//             "price": 200,
//             "note": "Test from VsCode20",
//             "ids_extra": [
//                 "5e59e0f2-9fd2-4b2d-abcb-64226cd1c9fb",
//                 "629db723-d845-4055-86bc-7542f153dd97",
//                 "77faf7b7-0524-4170-b026-97c260fe7ebe"
//             ]
//         },
//         {
//             "id_dish": "002caa19-db5a-40ee-a822-d67074913b2a",
//             "id_portion": "37c60114-1c1e-4d5b-9de9-dcd6ef3b7c36",
//             "price": 100,
//             "note": "Test from VsCode10",
//             "ids_extra": [
//                 "5e59e0f2-9fd2-4b2d-abcb-64226cd1c9fb",
//                 "629db723-d845-4055-86bc-7542f153dd97",
//                 "77faf7b7-0524-4170-b026-97c260fe7ebe"
//             ]
//         }
//     ]
// }

  const newGlobalOrder = await globalOrderService.createGlobalOrder({
    id_table: globalOrder.id_table,
    id_restaurant: globalOrder.id_restaurant,
  });

  globalOrder.orders.forEach(async (individualOrder) => {
    await individualOrderService.createIndividualOrder({
      id_global_order: newGlobalOrder.id,
      id_dish: individualOrder.id_dish,
      id_portion: individualOrder.id_portion,
      price: individualOrder.price,
      note: individualOrder.note,
      ids_extra: individualOrder.ids_extra,
    });
  });
  return res.json({ message: "success", order: newGlobalOrder });
};
