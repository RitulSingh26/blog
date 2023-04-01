
import express from 'express';
import mongoose from 'mongoose';
import blogRouter from './routes/Blog-routes.js';
import router from './routes/user-routes.js';


const app =express();
app.use(express.json());
app.use("/api/user",router);
app.use("/api/blog",blogRouter);


const DB= 'mongodb+srv://ritulsingh:260208singh@cluster0.hawigsg.mongodb.net/Blog?retryWrites=true&w=majority';
mongoose.connect(DB,{
    useNewUrlParser:true,
   //useCreateIndex:true,
    useUnifiedTopology:true,
  // useFindAndModify:false,
})
.then(app.listen(5000))
.then(()=>console.log("connect.....mm......."))
.catch((err)=>console.log(err));

 