import { app } from "./app.js";
import { connectDb } from "./db/index.js";
// import routes
import router from "./routes/router.js";

connectDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`\n Server is listening at Port: ${process.env.PORT}`);
    });
    app.use("/api/v1", router);
  })
  .catch((err) => {
    console.error(`Mongodb connection failed : ${err}`);
  });
