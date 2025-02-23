import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider , FacebookAuthProvider} from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private fireauth : AngularFireAuth, private router : Router) { }

  //login method
  login( email : string, password : string){
    this.fireauth.signInWithEmailAndPassword(email, password).then( (res)=>{
      localStorage.setItem('token','true');
      
      //user verify there email
      if(res.user?.emailVerified == true){
        this.router.navigate(['dashboard']);
      }
      else{
        this.router.navigate(['/verify-email'])
      }

    }, err =>{
      alert(err.message);
      this.router.navigate(['/login']);
    } )
  }

  //register method
  register(email : string, password : string){
    this.fireauth.createUserWithEmailAndPassword(email,password).then( (res)=>{
      alert("Registration successful...");
      this.router.navigate(['/login']);
      this.SendEmailToVarify(res.user);
    }, err =>{
      alert(err.message);
      this.router.navigate(['/register']);
    } )
  }

  //logout
  logout(){
    this.fireauth.signOut().then( ()=>{
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    } )
  }

  //forgot - password
  forgotPassword(email:string){
    this.fireauth.sendPasswordResetEmail(email).then( ()=>{
      this.router.navigate(['/verify-email']);
    }, err=>{
      alert('Something went wrong');
    } )
  }

  //email-verification
  SendEmailToVarify(user:any){
    user.SendEmailVarification((res : any)=>{
      this.router.navigate(['/verify-email']);
    }, (err : any) => {
      alert('Something went wrong. Not able to send mail to your email')
    })
  }

  //sign in with Google
  googleSignIn(){
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res=>{
      return this.router.navigate(['/dashboard']);
      localStorage.setItem('token', JSON.stringify(res.user?.uid));
    }, err=>{
      alert(err.message);
    })
  }

}
