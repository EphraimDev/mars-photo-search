import express from 'express';
import logger from "morgan";
import bodyParser from 'body-parser';
import cors from 'cors';

import router from './route';

// set up the express app
const app = express();

app.use(
    cors({
        maxAge: 1728000,
    }),
);
// log requests to the console.
app.use(logger('dev'));

// parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});


export default app;