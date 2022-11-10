const express = require('express')
const bodyparser = require('body-parser')
const app = express()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

app.set('view engine','ejs')
app.get('/',(req,res)=>{
    console.log('started')
    res.render('index')
})

app.post('/users',(req,res)=>{
    console.log('post request')
    fetch('https://api.github.com/users/'+req.body.user)
    .then((result)=>{
        console.log(result.status)
        if(result.status==404){
            res.render('error')
        }
        return result.json()
    })
    .then((data)=>{
        if(data.message !="Not Found"){
            res.render('results',{results : data})
        }else{
            res.render('error')
        }
    })    
})

app.listen(3000,()=>{
    console.log('listening')
})