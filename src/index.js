const express= require("express");
const app= express();

const noteRouter = require("./routes/noteRoutes");
const userRouter = require("./routes/userRoutes");
const mongoose= require("mongoose");
const dotenv=require("dotenv");
const cors=require("cors");

//env setup
dotenv.config();



app.use(cors());
app.use(express.json());

app.use((req,res,next)=>{
    console.log("HTTP Method -"+req.method+", Url"+req.url);
    next();
});


app.use("/users",userRouter);
app.use("/note",noteRouter);
// mongoose.set('strictQuery', true);

app.get("/",(req,res)=>{
    res.send("Hola! I am Iron man.");
});


mongoose.set('strictQuery', true);


const PORT_NUMBER=process.env.PORT || 5000

mongoose.connect("mongodb+srv://araj62630:pjrE3xcSiY78904a@cluster0.0cxoe61.mongodb.net/notes_db?retryWrites=true&w=majority")
.then(()=>{
    app.listen(PORT_NUMBER,()=>{
        console.log("Server Started on port",PORT_NUMBER);
    });
})
.catch((error)=>{
    console.log(error);
})
