import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

//globally http header object
const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

    //current user
  currentUser="";

  //current acno
  currentAcno="";

  constructor( private http:HttpClient) {
    // this.getDetails();
   }

  //saveDetails() - to store data into the local storage

  saveDetails(){
    if (this.userDetails) {
      localStorage.setItem('DataBase',JSON.stringify(this.userDetails))
    }
    if (this.currentUser) {
      localStorage.setItem('currentUser',JSON.stringify(this.currentUser))
    }
    if (this.currentAcno) {
      localStorage.setItem('currentAcno',JSON.stringify(this.currentAcno))
    }
  }

  // getDetails(){
  //   if(this.userDetails){
  //     this.userDetails=JSON.parse(localStorage.getItem('DataBase')||'')
  //   }
  //   if(this.currentAcno){
  //     this.currentAcno=JSON.parse(localStorage.getItem('currentAcno')||'')
  //   }
  //   if(this.currentUser){
  //     this.currentUser=JSON.parse(localStorage.getItem('currentUser')||'')
  //   }
  // }

  //database
  userDetails:any={
    1000:{acno:1000,username:'sanal',password:1000, balance:1000,transaction:[]},
    1001:{acno:1001,username:'amal',password:1001, balance:1000,transaction:[]},
    1002:{acno:1002,username:'arun',password:1002, balance:1000,transaction:[]}
  }
  register(acno:any,username:any,password:any){

    const data={
      acno,
      password,
      username,
    }

    return this.http.post('http://localhost:3000/register',data)

    // let userDetails=this.userDetails
    // if(acno in userDetails){
    //   return false;
    // }
    // else{
    //   userDetails[acno]={
    //     acno:acno,
    //     username:username,
    //     password:password,
    //     balance:0,
    //     transaction:[]
    //   }
    //   console.log(userDetails);
    //   this.saveDetails();
    //   return true;
    // }
  }

  login(acno:any,password:any){

    const data={
      acno,
      password
    }

    return this.http.post('http://localhost:3000/login',data)
    
    // let userDetails = this.userDetails
    // if(acno in userDetails){
    //   if(pswd==userDetails[acno]['password']){
    //     this.currentUser=userDetails[acno]['username']
    //     this.currentAcno=acno
    //     this.saveDetails();
    //     return true;
    //   }
    //   else{
    //     return false;
    //   }
    // }
    // else{
    //   return false;
    // }
  }

  getToken(){
    //fetch token from local storage
    const token = JSON.parse(localStorage.getItem('token')||'')
    //append token inside the header

    let headers= new HttpHeaders()

    if(token){
      options.headers=headers.append('x-access-token',token)
    }
    return options //to get token
  }

  deposit(acno:any,password:any,amt:any){


    const data={
      acno,
      password,
      amount:amt
    }
    return this.http.post('http://localhost:3000/deposit',data,this.getToken())


    // let userDetails = this.userDetails;
    // var amount=parseInt(amt)
    // if(acno in userDetails){
    //   if(pswd==userDetails[acno]['password']){
    //     userDetails[acno]['balance']+=amount;
    //     userDetails[acno]['transaction'].push({
    //       Type:'Credit',
    //       Amount:amount
    //     })
    //     console.log(userDetails);
    //     this.saveDetails();

    //     return userDetails[acno]['balance']
    //   }
    //   else{
    //     alert('Password incorrect')
    //     return false;
    //   }
    // }
    // else{
    //   alert('Invalid Userdetails')
    //   return false;
    // }
  }

  withdraw(acno:any,pswd:any,amt:any){

    const data={
      acno,
      pswd,
      amount:amt
    }
    return this.http.post('http://localhost:3000/withdraw',data,this.getToken())
    // let userDetails=this.userDetails;
    // var amount=parseInt(amt)
    // if(acno in userDetails){
    //   if(pswd==userDetails[acno]['password']){
    //     if(userDetails[acno]['balance']>=amount){
    //       userDetails[acno]['balance']-=amount;
    //       userDetails[acno]['transaction'].push({
    //         Type:'Debit',
    //         Amount: amount
    //       })
    //       console.log(userDetails);
    //       this.saveDetails();
          
    //       return userDetails[acno]['balance']
    //     }
    //     else{
    //       alert('Insufficient Balance')
    //       return false;
    //     }
    //   }
    //   else{
    //     alert('Password incorrect')
    //     return false;
    //   }
    // }
    // else{
    //   alert('Invalid userdetails')
    //   return false;
    // }
  }
  getTransaction(acno:any){

    const data={
      acno
    }
    return this.http.post('http://localhost:3000/transaction',data,this.getToken())

    // return this.userDetails[acno]['transaction']
  }

  //delete

  deleteAcc(acno:any){
    return this.http.delete('http://localhost:3000/deleteAcc/'+acno)
  }

}
