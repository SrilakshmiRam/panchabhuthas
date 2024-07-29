const express=require('express')
const {open}=require("sqlite")
const sqlite3=require("sqlite3")
const path=require("path")
const cors=require('cors')

const dbPath=path.join(__dirname,'temples.db')

const app=express()

app.use(cors())
app.use(express.json())

let database=null

const initiateAndStartDatabase= async()=>{
    try{
        database=await open({
            filename:dbPath,
            driver:sqlite3.Database
        })
        app.listen(3000,()=>{
            console.log("Server is running at localhost://3000")
        })
    }catch (e){
        console.log(`DB error:${e.message}`)
        process.exit(1)
    }
}

initiateAndStartDatabase()


app.get("/panchabhuthas/",async(request,response)=>{
    const getQuery=`select * from temple`
    const templesData=await database.all(getQuery)
    response.send(templesData)
})