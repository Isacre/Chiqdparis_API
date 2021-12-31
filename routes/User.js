import express from "express";

const router = express.Router();

const users = [
  {
    firstName: "Isaac",
    lastName: "Melo",
    login: "isaac.alvesmelo@hotmail.com",
    password: "123",
    id: "1",
    shoppingCart: [],
    purchases: [],
  },
  {
    firstName: "Allan",
    lastName: "Falcão",
    login: "isaac-alvesmelo@hotmail.com",
    password: "234",
    id: "2",
    shoppingCart: [],
    purchases: [],
  },
];

router.get("/users", (req, res) => {
  res.send(users);
});

router.post("/users", async (req, res) => {
  res.send("works");
});

export default router;
