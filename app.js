const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const body_parser = require('body-parser');

const userRoutes = require('./routes/auth');

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

app.use(userRoutes);


app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
})