import mongoose from "mongoose";
import app from "./index.js";

const port = process.env.PORT;


const start = async ()=>{
    if(!process.env.MONGO_URI){
        throw new Error("MONGO_URI must be present")
    }
    if(!process.env.SESSION_SECRET){
        throw new Error("SESSION_SECRET must be present")
    }

    try{
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("connected to database");
    }
    catch(err){
        console.error(err);
    }
}

console.log(`Node environment: ${process.env.NODE_ENV}`)

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})

start();

