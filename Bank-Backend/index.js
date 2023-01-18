//server creation

//1. import express

const express = require('express')

//import dataservice
const dataService = require('./services/data.service')

//import cors
const cors = require('cors')


//2. creating an application for express

const app= express()


// to parse json from request body
app.use(express.json()) //type conversion

//Give command to share data via cors

app.use(cors({
    origin:['http://localhost:4200','http://192.168.18.109:8080']
}))

//3. create port number (for backend)
app.listen(3000,()=>{
    console.log('listening on port 3000');
})

const jwt = require('jsonwebtoken')
//application specific middleware

// const appMiddleware =(req,res,next)=>{
//     console.log('application specific middleware');
//     next();
// }
// app.use(appMiddleware)

//Router specific middleware
const jwtMiddleware =(req,res,next)=>{
    console.log('Router specific middleware');
    const token = req.headers['x-access-token'];
    //verify token - verify()
    const data=jwt.verify(token,'superkey2022')
    console.log(data);
    next();
}
// app.use(jwtMiddleware)

//4. Resoving http request
//get http request

// app.get('/',(req,res)=>{
//     res.send('get http request');
// })

// app.post('/',(req,res)=>{
//     res.send('Post request');
// })

// app.put('/',(req,res)=>{
//     res.send('Put request');
// })

// app.patch('/',(req,res)=>{
//     res.send('Patch request')
// })

// app.delete('/',(req,res)=>{
//     res.send('delete request')
// })



//API call
//registration request

app.post('/register',(req,res)=>{
    console.log(req.body);
    dataService.register(req.body.acno,req.body.username,req.body.password)//access
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
   
})

//login request

app.post('/login',(req,res)=>{
    console.log(req.body);
    dataService.login(req.body.acno,req.body.password)//access
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
    
})


//deposit request

app.post('/deposit',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    dataService.deposit(req.body.acno,req.body.password,req.body.amount)//access
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
    
})


//withdraw request

app.post('/withdraw',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    dataService.withdraw(req.body.acno,req.body.password,req.body.amount)//access
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
    
})

//transaction request

app.post('/transaction',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    dataService.getTransaction(req.body.acno)//access
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
    
})

//delete request

app.delete('/deleteAcc/:acno',(req,res)=>{
    dataService.deleteAcc(req.params.acno)//access
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
    
})