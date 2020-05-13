import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {


  login;
  pwd;
  connectionError = false;
  connectedUser;
  loginRquest ={
    username: String,
    password: String
  }
  data;
  constructor(private router: Router, private loginService : LoginServiceService,private cookies: CookieService) { }

  ngOnInit() {
  }

  connexion() {
    this.router.navigate(['/principal']);
  }


  authentication() {
  this.loginRquest.username =this.login;
  this.loginRquest.password =this.pwd;

   this.loginService.authentication(this.loginRquest).subscribe(result => {
    this.data = result;
    this.cookies.set('acessToken',this.data.token)
    if(this.data){
      this.router.navigate(['/principal']);

    }else{
      this.connectionError = true;
    }
  });
  }
}
