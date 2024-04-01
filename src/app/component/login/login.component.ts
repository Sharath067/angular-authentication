import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email : string = '';
  password : string = '';

  constructor(private auth : AuthService) { }

  ngOninit():void{ }

  login(){

    if(this.email == ''){
      alert('Please enter Email');
      return ;
    }

    if(this.password == ''){
      alert('Please enter Password');
      return ;
    }

    //if both are correct
    this.auth.login(this.email,this.password);
    this.email='';
    this.password='';

  }

  //sign In with Google
  signInWithGoogle(){
    this.auth.googleSignIn();
  }

}
