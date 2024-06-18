require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { sequelize } = require('./models')

const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const partRoutes = require('./routes/partRoutes');
const requestRoutes = require('./routes/requestRoutes');

app.use(cors());
app.use("/users", userRoutes);
app.use("/requests", requestRoutes);
app.use("/parts", partRoutes);
app.use("/projects", projectRoutes);

const port = 3306;

sequelize.sync({ force: false }).then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});