import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import User from "./models/userModel.js";
import cors from "cors"

const app = express();

app.use(cors())
app.use(express.json());


app.get('/', (request, response )=>{
    console.log(request)
    return response.status(234).send("testing")
});

app.post('/register', async (request, response) => {
    try {
        const { username, email, password } = request.body;
        if (!username){
            return response.status(400).send({
                message: "Test"
            })
        }
        const newUser = {
            username: request.body.username,
            email: request.body.email,
            password: request.body.password,
        }

        const user = await User.create(newUser);

        return response.status(201).send(user)
    } catch (error) {
        console.log(error.message);
        response.status(500).send({
            message: error.message
        });
    }
});

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database", PORT);
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    });
