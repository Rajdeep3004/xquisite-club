const Data = require("../models/dataModel");

const postData = (req, res) => {
  const { uid, formData, cartItems, cartTotal } = req.body;
  Data.findOne({ uid })
    .then((dataFound) => {
      if (dataFound) {
        dataFound.formData.push(formData);
        dataFound.cartTotal += cartTotal;
        dataFound.cartItems.push(...cartItems);

        return dataFound.save();
      } else {
        const newData = new Data({
          uid,
          formData,
          cartItems,
          cartTotal,
        });
        return newData.save();
      }
    })
    .then(() => {
      return res.json({ message: "Order placed!" });
    })
    .catch((error) => {
      return res.json({ message: error });
    });
};

const fetchData = (req, res) => {
  const { uid } = req.body;
  Data.find({ uid }).then((dataFound) => {
    if (dataFound) {
      return res.json(dataFound);
    }
    return;
  });
};

exports.postData = postData;
exports.fetchData = fetchData;
