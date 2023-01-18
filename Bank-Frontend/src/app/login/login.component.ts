import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
//string interpolation - {{aim}} in html file
  aim="Your Perfect Banking Partner";
//property binding -[placeholder]="account" in html file
  account="Enter your Acc no. here";

  acno=' ';
  password=' ';

  //register model
  loginForm=this.fb.group({//group
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],//array
    password:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]]
  })
  
  //(3rd execution)
//class - collection of properties and methods
//properties/varibles
//userdefined methods(4th execution)



  //dependency injection
  constructor(private ds:DataService,private router:Router,private fb:FormBuilder) { //(1st execution)
    //It automatically invoke when the object is created.
  }

  ngOnInit(): void {//(2nd execution)
    //for initial process of component
    //lifecycle hook of Angular
  }

  

  acnoChange(event:any){
    console.log(event);

    this.acno=event.target.value; //1000
    console.log(this.acno);
    
  }

  pswdChange(event:any){
    this.password=event.target.value;
    console.log(this.password);
    
  }

  login(a:any,p:any){
    // alert('Login Clicked');
    console.log(this.loginForm);//value
    
    var acno=this.loginForm.value.acno; //1000
    var pswd=this.loginForm.value.password; //1000
    // var userDetails=this.ds.userDetails;

    if (this.loginForm.valid) {
      // console.log(this.loginForm.get('acno')?.errors);
      
      this.ds.login(acno,pswd)
      .subscribe((result:any)=>{
        localStorage.setItem('currentUser',JSON.stringify(result.currentUser));
        localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno));
        localStorage.setItem('token',JSON.stringify(result.token));
        alert(result.message);
        this.router.navigateByUrl('dashboard')
      },
      result=>{
        alert(result.error.message)
      }
      )
    }
  }
}
    // if(result){
    //   alert('login successful');
    //     this.router.navigateByUrl('dashboard');
    // }
    // else{
    //   alert('Login failed');
    // }
    // }
    // else{
    //   alert('Invalid form')
    // }

    // if(acno in userDetails){
    //   if(pswd==userDetails[acno]['password']){
    //     alert('login successful');
    //     this.router.navigateByUrl('dashboard');
    //   }
    //   else{
    //     alert('invalid password');
    //   }
    // }
    // else{
    //   alert('invalid user details');
    // }
  //}


  // login(){
  //   // alert('Login Clicked');
  //   var acno=this.acno; //1000
  //   var pswd=this.pswd; //1000
  //   var userDetails=this.userDetails;

  //   if(acno in userDetails){
  //     if(pswd==userDetails[acno]['password']){
  //       alert('login successful');
  //     }
  //     else{
  //       alert('invalid password');
  //     }
  //   }
  //   else{
  //     alert('invalid user details');
  //   }
  // }

//}
