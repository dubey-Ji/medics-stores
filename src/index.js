import { connectDb } from "./db/index.js";
import { app } from "./app.js";

connectDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`\n Server is listening at Port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Mongodb connection failed : ${err}`);
  });
