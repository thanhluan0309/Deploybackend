const express = require("express");
const app = express();
const mongoose = require(`mongoose`);
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
var nodemailer = require("nodemailer");

dotenv.config();
const morgan = require("morgan");
morgan("common");
const cors = require("cors");



const RouterAuth = require("./Router/Auth");
const RouterPost = require("./Router/Post");
const RouterMap = require("./Router/Map");
const RouterColumns = require("./Router/columns");
const RouterColumnOrder = require("./Router/columOrder");


const RouterProduct = require("./Router/Product");
const RouterStore = require("./Router/Store");


app.use(bodyparser.json({ limit: "50mb" }));
// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

// var whitelist = ['http://localhost:3000', 'https://stalwart-brigadeiros-44505c.netlify.app/']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   },
//   optionSuccessStatus: 200,
// }
// app.use(cors(corsOptions));

app.use(cors())
const ConnectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.Url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB has connect");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

app.use(express.json());
ConnectDB();

app.use("/Auth", RouterAuth);
app.use("/Post", RouterPost);
app.use("/Map", RouterMap);
app.use("/columns", RouterColumns);
app.use("/columnorder", RouterColumnOrder);


app.use("/product", RouterProduct);
app.use("/store", RouterStore);


app.post("/sendgmail", async (req, res) => {
  let { email, subject, text } = req.body;
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "smartnotesupersmart@gmail.com",
      pass: "qhsxqpkoevrkmjgt",
    },
  });

  var mailOptions = {
    from: "smartnotesupersmart@gmail.com",
    to: email,
    subject: subject,
    text: text,
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

app.get("/", (req, res) => {
  res.send("Hello World! back end dacn");
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Sever is running port ${port}`);
});
