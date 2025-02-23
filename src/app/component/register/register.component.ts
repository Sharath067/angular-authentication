import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  email : string ='';
  password : string = '';

  constructor(private auth : AuthService) { }

  ngOnInit() : void {}
  
  register(){
    if(this.email == ''){
      alert('Please enter Email');
      return ;
    }

    if(this.password == ''){
      alert('Please enter Password');
      return ;
    }

    //if both are correct
    this.auth.register(this.email, this.password);
    this.email = '';
    this.password = '';
  }

}
