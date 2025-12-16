import express from 'express';

const app = express();
const PORT = 3000;
app.use(express.json());

app.get('/home', (req, res) => {
    res
    .status(200)
    .send(`<h1 style="color: green">Welcome to homepage</h1>`);
})

app.get('/about', (req, res) => {
    res
    .status(200)
    .send("This is About Page")
})

app.get('/students/:studentId/department', (req, res) => {
    res
    .status(200)
    .json({ studentId: req.params.studentId, department: req.query.department })
})

app.listen(PORT, ()=>{
    console.log(`server is running at PORT http://localhost:${PORT}` )
})