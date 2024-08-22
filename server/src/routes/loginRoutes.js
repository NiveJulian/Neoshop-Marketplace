const { Router } = require("express");
const loginRoutes = Router();
const login = require("../controllers/loginControllers/login");
const loginAuthorization = require("../controllers/loginControllers/loginAuthorization");
const authThird = require("../controllers/loginControllers/thirdPartyAuth");

loginRoutes.post("/", async (req,res) => {
    try {
        const {
            email,
            password
        } = req.body;
        console.log(req.body)
        const {
            correctLogin,
            token,
            cookieOption
        } = await login(email, password);
        console.log("token: ", token, "cookieOption", cookieOption)
        res.cookie("jwt",token,cookieOption);
        return res.status(200).json({message: "Correct login", token, correctLogin});
    } catch (error) {
        console.log({ error: error.message })
        return res.status(500).json({ error: error.message });
    }
});

loginRoutes.post("/auth", async (req,res) => {
    try {
        const {token, provider} = req.body;
        console.log(req.body)
        const auth = await loginAuthorization(token, provider);
        return res.status(200).json(auth);
    } catch (error) {
        console.log({ error: error.message })
        return res.status(500).json({ error: error.message });
    }
});

loginRoutes.post("/auth/third", async (req,res) => {
    const { token } = req.body;
  try {
    const theUser = await authThird(token);
    res.status(200).json({ message: 'Authentication successful', theUser });
  } catch (error) {
      console.log({ error: error.message })
    res.status(401).json({ message: 'Authentication failed', error: error.message });
  }
});

module.exports = loginRoutes;
