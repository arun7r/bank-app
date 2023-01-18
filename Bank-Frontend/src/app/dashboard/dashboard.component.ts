import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
//deposit properties
  acno="";
  pswd="";
  amount="";

  depositForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })

//withdraw properties
  acno1="";
  pswd1="";
  amount1="";

  withdrawForm=this.fb.group({
    acno1:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd1:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]],
    amount1:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })

  //current user- login name
  user="";

  sdate:any;

  constructor(private ds:DataService,private fb:FormBuilder,private router:Router) {
    // this.user=this.ds.currentUser
    if(localStorage.getItem('currentUser')){
      this.user=JSON.parse(localStorage.getItem('currentUser')||'');
    }
    
    this.sdate=new Date()
   }

  ngOnInit(): void {
    if (!localStorage.getItem('currentUser')) {
      alert('Please login first')
      this.router.navigateByUrl('')
    }
    // this.user=JSON.parse(localStorage.getItem('currentUser')||'');
  }

  deposit(){
    // alert('clicked');
    // console.log(this.depositForm);
    
    var acno=this.depositForm.value.acno;
    var password=this.depositForm.value.pswd;
    var amount=this.depositForm.value.amount;

    let currentAcno=JSON.parse(localStorage.getItem('currentAcno')||'');
    if(currentAcno==acno){
      if (this.depositForm.valid) {

        // console.log(this.depositForm.get('acno')?.errors);
        
        this.ds.deposit(acno,password,amount)
        .subscribe((result:any)=>{
          alert(result.message)
        },
        result=>{
          alert(result.error.message)
        })
      }
    }
    else{
      alert('Invalid UserDetails');
    }
  }
  //     if(result){
  //       alert(`${amount} is credited...Available balance is ${result}`)
  //     }
  //     else{
  //       alert('Transaction error')
  //     }
  //   }
  //   else{
  //     alert('Invalid Details')
  //   }
    
  // }

  withdraw(){
    // alert('clicked');
    console.log(this.withdrawForm);
    
    var acno=this.withdrawForm.value.acno1;
    var pswd=this.withdrawForm.value.pswd1;
    var amount=this.withdrawForm.value.amount1;

    let currentAcno=JSON.parse(localStorage.getItem('currentAcno')||'');

    if(currentAcno==acno){
      if(this.withdrawForm.valid){

        this.ds.withdraw(acno,pswd,amount)
        .subscribe((result:any)=>{
        alert(result.message)
        },
        result=>{
          alert(result.error.message)
        })

    //   console.log(this.withdrawForm.get('acno1')?.errors);
      
    //   const result=this.ds.withdraw(acno,pswd,amount);
    //   if(result){
    //       alert(`${amount} is debited...Available balance is ${result}`)
      
    //   }
    
    //   else{
    //     alert('Transaction error')
    //   }
    // }
    // else{
    //   alert('Invalid Details')
      }
    }
    
    
  }

  logout(){
    //remove username and acno
    localStorage.removeItem('currentAcno')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')
    this.router.navigateByUrl('')
  }

  delete(){
    // alert('clicked')
    this.acno=JSON.parse(localStorage.getItem('currentAcno')||'')
  }

  onCancel(){
    this.acno="";
  }

  onDelete(event:any){
    // alert(event)
    this.ds.deleteAcc(event)
    .subscribe((result:any)=>{
      alert(result.message)
      // this.router.navigateByUrl('');
      this.logout();
    },
    result=>{
      alert(result.error.message)
    }
    )
  }
}
