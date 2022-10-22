const express = require("express");
const mongodb = require("mongodb");

let MongoClient = mongodb.MongoClient;

const app = express();
let db = MongoClient.connect(
  "mongodb://127.0.0.1:27017",
  function (err, client) {
    if (err !== undefined) {
      console.log(err);
    } else {
      db = client.db("tienda");
      console.log("Db working");
    }
  }
);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.listen(3000);

app.get("/api", (req, res) => {
  db.collection("mesas")
    .find()
    .toArray(function (error, datos) {
      if (error != undefined) {
        res.send({ error: error });
      } else {
        if (datos.length > 0) {
          res.send(datos);
        } else {
          res.send({ error: "No hay datos" });
        }
      }
    });
});

app.post("/add", (req, res) => {
  let { size, color, material, legs } = req.body;
  db.collection("mesas").insertOne(
    {
      size: size,
      color: color,
      material: material,
      legs: legs,
    },
    (error, info) => {
      if (error != undefined) {
        res.send({ error: error });
      } else {
        db.collection("mesas")
          .find()
          .toArray(function (error, datos) {
            if (error != undefined) {
              res.send({ error: error });
            } else {
              if (datos.length > 0) {
                res.send(datos);
              } else {
                res.send({ error: "No hay datos asdas" });
              }
            }
          });
      }
    }
  );
});

app.put("/update", (req, res) => {
  console.log(req.body);
  db.collection("mesas").updateMany(
    { color: req.body.color },
    { $set: { color: "granate" } },
    (err, info) => {
      console.log(info);
      console.log(err);

      if (err != undefined) {
        res.send({ err: err });
      } else {
        db.collection("mesas")
          .find()
          .toArray(function (error, datos) {
            if (error != undefined) {
              res.send({ error: error });
            } else {
              if (datos.length > 0) {
                res.send(datos);
              } else {
                res.send({ error: "No hay datos asdas" });
              }
            }
          });
      }
    }
  );
});

app.put("/update", (req, res) => {
  console.log(req.body);
  db.collection("mesas").updateMany(
    { color: req.body.color },
    { $set: { color: "granate" } },
    (err, info) => {
      console.log(info);
      console.log(err);

      if (err != undefined) {
        res.send({ err: err });
      } else {
        db.collection("mesas")
          .find()
          .toArray(function (error, datos) {
            if (error != undefined) {
              res.send({ error: error });
            } else {
              if (datos.length > 0) {
                res.send(datos);
              } else {
                res.send({ error: "No hay datos asdas" });
              }
            }
          });
      }
    }
  );
});
