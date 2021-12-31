import express from "express";
import Cart from "../models/Cart";

const router = express.Router();

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_PASSWORD
    ).toString(),
    id: id,
    shoppingCart: [],
    purchases: [],
    cpf: req.body.cpf,
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json("something went wrong");
    console.log(err);
  }
});
("");
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("Please inform a login");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_PASSWORD
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    OriginalPassword !== req.body.password &&
      res.statusCode(400).json("Wrong password");

    /*  const acessToken = jwt.sign()({
      id: user._id,
      isAdmin: user.isAdmin,
    });
 */
    const { cpf, password, email, _id, __v, ...others } = user._doc;

    res.status(200).json(others);
  } catch (err) {
    res.status(400).json("Something went wrong");
  }
});

export default router;
