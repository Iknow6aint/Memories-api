import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import express from "express"
import debug from "debug"
import path from 'path'

import postRoutes from './routes/posts.js'
import userRoutes from './routes/user.js'

const app = express();
const PORT = 5000

debug(express);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
const corsOption = {
    origin: ['http://localhost:3000'],
};
app.use(cors(corsOption));
//if you want in every domain then
app.use(cors())

//routes init
app.use('/posts', postRoutes)
app.use('/user', userRoutes)


app.get('/', (req, res) => {
    res.send('hello world')
})
app.get('*', (req, res) => {
    const __dirname = path.resolve();
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});
//mongoDB init


const CONNECTION_URL = 'mongodb+srv://admin:Jajabone@cluster0.qzlrfzl.mongodb.net/?retryWrites=true&w=majority'


mongoose
    .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server Running on Port: http://localhost:${PORT}`)
        )
    )
    .catch((error) => console.log(`${error} did not connect`));
mongoose.set("useFindAndModify", false);

// mongoose.set("useFindAndModify", false);
// mongoose.set("strictQuery", false);
// mongoose.connect(CONNECTION_URL, () => {
//     console.log(`Connected to MongoDB`)
//     app.listen(PORT, () => {
//         console.log(`Listening at ${PORT}`);
//     })
// });
