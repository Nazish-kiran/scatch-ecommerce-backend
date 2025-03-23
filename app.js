import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.send('hey');
});

const PORT =  9095;

app.listen(PORT, () => {
    console.log(`App working on port ${PORT}`);
});