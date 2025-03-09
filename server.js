const express=require('express');
const {dbConfig}=require('./Configurations/db.config');
const { userRouter } = require("./Routers/user.router");
const { articleRouter } = require("./Routers/article.router");
const { commentRouter } = require("./Routers/comment.router");
var app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/v1/user", userRouter);
app.use("/api/v1/article", articleRouter);
app.use("/api/v1/comment", commentRouter);

app.listen(3000,()=>{
    dbConfig();
    console.log('server is running on port 3000');});
