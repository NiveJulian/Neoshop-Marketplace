require("dotenv").config();
const port = process.env.PORT || 3001;
const server = require("./src/app.js");
const { conn } = require("./src/db.js");

conn
  .sync({ alter: true }) //cambiar a force para trabajar localmente, alter el otro
  .then(async () => {
    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
    //setInterval(sendReminderCart, 2 * 60 * 1000);
  })
  .catch((error) => console.error("Database connection error:", error));
