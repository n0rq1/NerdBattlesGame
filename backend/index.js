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
        const { username, email, password, profile_picture, level, code_battles, type_battles_won, average_wpm, games } = request.body;
        if (!username){
            return response.status(400).send({
                message: response.message
            })
        }
        const newUser = {
            username,
            email,
            password,
            profile_picture: "default_picture_url",
            level: level || 1,
            code_battles: code_battles || {},
            type_battles_won: type_battles_won || 0,
            average_wpm: average_wpm || 0,
            games: games || [],
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
