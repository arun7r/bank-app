//import JWT token
const jwt=require('jsonwebtoken');

//import db

const db= require('./db')

//database
userDetails={
    1000:{acno:1000,username:'sanal',password:1000, balance:1000,transaction:[]},
    1001:{acno:1001,username:'amal',password:1001, balance:1000,transaction:[]},
    1002:{acno:1002,username:'arun',password:1002, balance:1000,transaction:[]}
  }


  const register=(acno,username,password)=>{
      return db.User.findOne({acno})//data
      .then(user=>{
        if(user){
          return {
            status:false,
            statusCode:400,
            message:'User already registered'
          }
        }
  
        else{
          const newUser=new db.User({
            acno:acno,
            username:username,
            password:password,
            balance:0,
            transaction:[]
          })
          newUser.save(); //data saved in mongodb
  
          // console.log(userDetails);
          return {
            status:true,
            statusCode:200,
            message:'Register successful'
          }
        }
      })
    }


  //   if(acno in userDetails){
  //     return {
  //       status:false,
  //       statusCode:400,
  //       message:'User already registered'
  //     }
  //   }
  //   else{
  //     userDetails[acno]={
  //       acno:acno,
  //       username:username,
  //       password:password,
  //       balance:0,
  //       transaction:[]
  //     }
  //     console.log(userDetails);

  //     return {
  //       status:true,
  //       statusCode:200,
  //       message:'Register successful'
  //     }
  //   }
  // }


  const login=(acno,password)=>{
    
    return db.User.findOne({acno,password})//data
    .then(user=>{
      if(user){
        currentUser=user.username
        currentAcno=acno
        const token =jwt.sign({currentAcno:acno},'superkey2022')
        return {
          status:true,
          statusCode:200,
          message:'Login successful',
          token:token,
          currentUser:currentUser,
          currentAcno:acno
        }
      }
      else{
        return {
          status:false,
          statusCode:400,
          message:'Inavalid Userdetails'
        }
      }

    })
  }
    //   if(pswd==userDetails[acno]['password']){
    //     currentUser=userDetails[acno]['username']
    //     currentAcno=acno
    //     //To generate a token
    //     try{
    //       const token =jwt.sign({currentAcno:acno},'superkey2022')
    //       return {
    //         status:true,
    //         statusCode:200,
    //         message:'Login successful',
    //         token:token
    //       }
    //     }
    //     catch{
    //       resizeBy.status(422).json({
    //         statusCode:422,
    //         status:false,
    //         message:'Login failed ... please login again'
    //       })
    //     }
    //   }
    //   else{
    //     return {
    //       status:false,
    //       statusCode:400,
    //       message:'Password Incorrect'
    //     };
    //   }
    // }
    // else{
    //   return {
    //     status:false,
    //     statusCode:400,
    //     message:'Inavalid Userdetails'
    //   };
    // }
  

  const deposit=(acno,password,amt)=>{
    var amount=parseInt(amt)
    return db.User.findOne({acno,password})//data
    .then(user=>{
      if(user){
        user.balance += amount;
        user.transaction.push({
          Type:'Credit',
          Amount:amount
        })
        user.save();
        return {
          status:true,
          statusCode:200,
          message:`${amount} is credited and Balance: ${user.balance}`
        }
      }
      else{
        return {
          status:false,
          statusCode:400,
          message:'Incorrect Userdetails'
        }
      }
    })
  }






  //     if(pswd==userDetails[acno]['password']){
  //       userDetails[acno]['balance']+=amount;
  //       userDetails[acno]['transaction'].push({
  //         Type:'Credit',
  //         Amount:amount
  //       })
  //       console.log(userDetails);
  //       return {
  //         status:true,
  //         statusCode:200,
  //         message:`${amount} is credited and Balance: ${userDetails[acno]['balance']}`
  //       };
  //     }
  //     else{
  //       // alert('Password incorrect')
  //       return {
  //         status:false,
  //         statusCode:400,
  //         message:'Password Incorrect'
  //       };
  //     }
  //   }
  //   else{
  //     // alert('Invalid Userdetails')
  //     return {
  //       status:false,
  //       statusCode:400,
  //       message:'Inavalid Userdetails'
  //     };
  //   }
  // }

  const withdraw=(acno,pswd,amt)=>{
    var amount=parseInt(amt)
    return db.User.findOne({acno,pswd})//data
    .then(user=>{
      if(user){
        if(user.balance>=amount){
          user.balance-=amount;
          user.transaction.push({
            Type:'Debit',
            Amount: amount
          })
          user.save();
          return {
            status:true,
            statusCode:200,
            message:`${amount} is debited and Balance: ${user.balance}`
          }
        }
        else{
          return {
            status:false,
            statusCode:400,
            message:'Invalid Userdetails'
          }
        }
      }
    })
  }




  //     if(pswd==userDetails[acno]['password']){
  //       if(userDetails[acno]['balance']>=amount){
  //         userDetails[acno]['balance']-=amount;
  //         userDetails[acno]['transaction'].push({
  //           Type:'Debit',
  //           Amount: amount
  //         })
  //         console.log(userDetails);
  //         return {
  //           status:true,
  //           statusCode:200,
  //           message:`${amount} is debited and Balance: ${userDetails[acno]['balance']}`
  //         };
  //       }
  //       else{
  //         // alert('Insufficient Balance')
  //         return {
  //           status:false,
  //           statusCode:400,
  //           message:'Insufficient Balance'
  //         };
  //       }
  //     }
  //     else{
  //       // alert('Password incorrect')
  //       return {
  //         status:false,
  //         statusCode:400,
  //         message:'Password Incorrect'
  //       };
  //     }
  //   }
  //   else{
  //     // alert('Invalid userdetails')
  //     return {
  //       status:false,
  //       statusCode:400,
  //       message:'Inavalid Userdetails'
  //     };
  //   }
  // }

  const getTransaction=(acno)=>{
    return db.User.findOne({acno})//data
    .then(user=>{
      if(user){
        return {
          status:true,
          statusCode:200,
          transaction:user.transaction
        }
      }
      else{
        return{
          status:false,
          statusCode:400,
          message:'User not found'
        }
      }
    })
    
  }

  // To delete an account

  const deleteAcc=(acno)=>{
    return db.User.deleteOne({acno})
    .then(user=>{
      if (user) {
        return {
          status:true,
          statusCode:200,
          message:`User deleted Successfully`
        }
      }
      else{
        return{
          status:false,
          statusCode:400,
          message:'User not found'
        }
      }
    })
  }

  module.exports={
    register,
    login,
    deposit,
    withdraw,
    getTransaction,
    deleteAcc
  }