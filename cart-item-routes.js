const express = require("express");
const router = express.Router();
const pool = require("./connection");
router.use(express.json());


function getData(req, res) {
  pool.query("SELECT * FROM shopping_cart").then(result => {
    res.json(result.rows);
    response.status(404).json("Sorry, we are sold out");
  });
}

router.get("/", function (req, res) {
  getData(req, res);
});

router.get("/:id", function(req, res) {
  pool.query("SELECT * FROM shopping_cart WHERE id =" + req.params.id).then(result => {
    if (result.rows.length < 1) {
      response.status(404).json("Sorry, we are sold out");
    } else {
      res.json(result.rows);
    }
 });
});

router.post("/", (req, res) => {
  pool.query("insert into shopping_cart (id,product,price,quantity) values($1,$2,$3,$4)", [req.body.id, req.body.product, req.body.price, req.body.quantity]).then(result => {
  getData(req, res);
  }).catch(err => {
    res.send(err.detail);
    res.status(201);
  })
});


router.put("/:id", (req, res) => {
  pool.query("SELECT * FROM shopping_cart WHERE id =" + req.params.id).then(result => {
    if (result.rows.length < 1) {
      response.status(404).json("Sorry, we are sold out");
    } else {
      pool.query("update shopping_cart set price=$1::money where id=$2::int",
      [req.body.price, req.params.id]).then(() => {
        getData(req, res);
      }).catch(err => {
        res.send(err.detail);
        res.status(200);
      })
    }
 });
});


router.delete("/:id", (req, res) => {
  pool.query("SELECT * FROM shopping_cart WHERE id =" + req.params.id).then(result => {
    if (result.rows.length < 1) {
      response.status(404).json("Sorry, we are sold out");
    } else {
      pool.query("delete from shopping_cart where id=$1::int",
      [req.params.id]).then(() => {
      getTable(req, res);
      }).catch(err => {
        res.send(err.detail);
        res.status(204);

      })
   }
 });
});


module.exports = router;


// let cartItemList = require("./cart-item");

// router.use(express.json());

// // //get

// // router.get("/", (req, res) => {
// //   res.json(cartItemList);
// // });

// // router.get("/:id", (request, response) => {
// //   let selectedItem = cartItemList[request.params.id];
// //   if (selectedItem) {
// //     response.json(selectedItem);
// //   } else {
// //     response.status(404).json("Sorry, we are sold out");
// //   }
// // });
// // router.get("/cart-items", (req, res) => {
// //   const { maxPrice, prefix, pageSize } = req.query;
// //   let items;
// //   let cached = {};
// //   if (maxPrice) {
// //     items = cart.item.filter((x) => x.maxPrice <= Number(maxPrice));
// //     cached["maxPrice"] = items.sort((a, b) => a - b);
// //   }
// //   if (pageSize) {
// //     items = cached["maxPrice"]
// //       ? cache["maxPrice"].slice(0, Number(page.pageSize))
// //       : CartItem.slice(0, Number(pageSize));
// //     cached["pageSize"] = item.sort((a, b) => a - b);
// //   }
// //   if (prefix) {
// //     items = cached["prefix"]
// //       ? cached["prefix"].filter((x) => x.product.startWith(prefix))
// //       : router.filter((x) => x.product.startWith(prefix));
// //   }
// //   console.log("Cached Items", cached);
// //   res.json(items);
// // });

// // //post

// // router.post("/", (req, res) => {
// //   cartItemList.push(req.body);
// //   res.status(201).json({
// //     id: req.body.id,
// //     product: req.body.product,
// //     price: req.body.price,
// //     quantity: req.body.quantity,
// //   });
// // });

// // //put

// // router.put("/:id", (req, res) => {
// //   let selectedItem = cartItemList[req.params.id];
// //   if (selectedItem) {
// //     cartItemList[req.params.id] = req.body;
// //     res.json(selectedItem);
// //   } else {
// //     res.status(404).json("Sorry, we are sold out");
// //   }
// // });

// // //delete

// // router.delete("/:id", (req, res) => {
// //   let selectedItem = cartItemList[req.params.id];
// //   if (selectedItem) {
// //     cartItemList.splice(req.params.id, 1);
// //     res.status(204).send();
// //   } else {
// //     res.status(404).json("Sorry, we are sold out");
// //   }
// // });

// // module.exports = router;
