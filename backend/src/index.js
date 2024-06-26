import app from "./app.js";
import config from "./config/config.js";
import postgresDB from "./config/database.js";

// if we need to connect more database , will add in promise.all
Promise.all([postgresDB.init])
  .then(() => {
    app.listen(config.port, () => {
      console.log(`server started on ${config.port}`);
    });
  })
  .catch((error) => {
    console.log(`error in staring server ${error}`);
  });
