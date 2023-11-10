const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const mongoConf = require("./src/configs/db.config");
const authRoute = require("./src/routes/auth.routes");
const userRoute = require("./src/routes/user.routes");
const examRoute = require("./src/routes/exam.routes");
const trackRoute = require("./src/routes/track.routes");
const videoRoute = require("./src/routes/video.routes");
const activeRoute = require("./src/routes/active.routes");
const libraryRoute = require("./src/routes/library.routes");
const courseRoute = require("./src/routes/course.routes");
const adminRoute = require("./src/routes/admin.routes");
const swaggerDoc = require("./test/swagger/swagger");

//************************** */
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
//************************* */

// const options = {
//     definition: {
//         openapi: "3.0.0",
//         info: {
//             title: "Courses API",
//             version: "1.0.0",
//             description: "A Simple Express Courses API"
//         },
//         servers: [{
//             url: "http://localhost:8000/"
//         }],
//     },
//     apis: ["./src/routes/*.js"]
// };

// const specs = swaggerJsDoc(options);

const app = express();

swaggerDoc(app);

app.use(
  bodyparser.urlencoded({
    extended: false,
  })
);
app.use(bodyparser.json());
app.use("/images", express.static(path.join(__dirname, "src", "photos")));
app.use("/videos", express.static(path.join(__dirname, "src", "videos")));
app.use("/compress", express.static(path.join(__dirname, "src", "compressed")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // write * for any Domain or write Domain
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

mongoose.connect(mongoConf.host);
mongoose.connection.on("error", (err) => {
  console.log(err);
});

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/exam", examRoute);
app.use("/track", trackRoute);
app.use("/video", videoRoute);
app.use("/activ", activeRoute);
app.use("/library", libraryRoute);
app.use("/course", courseRoute);
app.use("/admin", adminRoute);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.data;
  res.status(status).json({
    message: message,
  });
});

//******************************** */
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
//******************************* */

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App is working on ${port}`);
});
