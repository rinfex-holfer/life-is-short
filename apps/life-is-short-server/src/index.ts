import express from "express";
const cors = require("cors");
const router = express.Router();

const bodyParser = require("body-parser");
const root = require("path").join(__dirname, "../client-dist");

const daysMock = [
  // {timestamp: '28-03-2022'},
  // {timestamp: '29-03-2022'},
  { timestamp: "30-03-2022", color: "00ff00" },
  // {timestamp: '31-03-2022'},
  { timestamp: "01-04-2022", color: "0000ff" },
  // {timestamp: '02-04-2022'},
  // {timestamp: '03-04-2022'},
];

const userMock = {
  id: "qwerty",
  name: "Геннадий",
  dateOfBirth: "1990-11-26T23:00:00.000Z",
  // name: "Федор Федорович",
  // dateOfBirth: new Date(2000, 0, 1),
  expectedLifespan: 74,
  locale: "ru",
};

router.get("/api/user", (req: any, res: any) => {
  res.send(userMock);
});

router.get("/api/days", (req: any, res: any) => {
  res.send(daysMock);
});

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(express.static(root))
  .use(router);

app.get("*", function (req, res) {
  res.sendFile("index.html", { root: root });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
