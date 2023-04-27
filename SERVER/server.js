import express from 'express';
import cors from 'cors';
import authRoute from './routes/authRoute.js';
import mongoose from 'mongoose'
import dotenv from'dotenv';
import bodyParser from 'body-parser';
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
const app =express();



app.use(cors());


//MIDDLEWARE
app.use(bodyParser.json({limit:'30mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}));
dotenv.config()
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_DB,{useNewUrlParser:true,useUnifiedTopology:true}).
then(()=>app.listen(process.env.PORT,()=>console.log(`listening at ${process.env.PORT}`)))
.catch((error)=>console.log(error));

//usage of routes

app.use('/auth',authRoute);
app.use('/category',categoryRoutes)
app.use('/product',productRoutes)


/*{const app=express();
dotenv.config()
app.use(cors());
app.use(express.json)
//routes
app.use('/auth',authRoute)

//api
app.get('/',(req,res)=>{
    res.send("<h1>Hello</h1>")
})
const PORT=process.env.PORT ||8000;
mongoose.connect(process.env.MONGO_DB,{useNewUrlParser:true,useUnifiedTopology:true}).
then(()=>app.listen(PORT,()=>console.log(`listening at ${PORT}`)))
.catch((error)=>console.log(error));
}*/

