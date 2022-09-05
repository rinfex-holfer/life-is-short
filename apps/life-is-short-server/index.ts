import express from "express"
import path from "path";
const cors = require('cors')
const router = express.Router()

const bodyParser = require('body-parser');
const root = require('path').join(__dirname, 'dist');

const daysMock = [
    // {timestamp: '28-03-2022'},
    // {timestamp: '29-03-2022'},
    {timestamp: '30-03-2022', color: "00ff00"},
    // {timestamp: '31-03-2022'},
    {timestamp: '01-04-2022', color: "0000ff"},
    // {timestamp: '02-04-2022'},
    // {timestamp: '03-04-2022'},
]

const userMock = {
    id: "qwerty",
    name: "Геннадий",
    dateOfBirth: "1990-11-26T23:00:00.000Z",
    // name: "Федор Федорович",
    // dateOfBirth: new Date(2000, 0, 1),
    expectedLifespan: 74,
    locale: "ru",
}

router.get('/user', (req, res) => {
    res.send(userMock)
})

router.get('/days', (req, res) => {
    res.send(daysMock)
})


const app = express()
    .use(cors())
    .use(bodyParser.json())
    .use(express.static(root))
    .use(router)

app.listen(5000, () => {
    console.log('server started');

    app.get('/', (req, res) => {
        res.send('Hello World!')
    })
});