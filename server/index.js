require("dotenv").config();
const port = process.env.PORT || 3001;
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const montarUsers = require("./src/utils/montarUsers.js");

conn
  .sync({ force: true }) //cambiar a force para trabajar localmente, alter el otro
  .then(async () => {
    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
    await montarUsers();
    // setInterval(sendReminderCart, 2 * 60 * 1000);
  })
  .catch((error) => console.error("Database connection error:", error));
