import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginModel } from '../../models/login.model';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { GoogleSigninButtonModule, SocialAuthService } from '@abacritt/angularx-social-login';
import { ErrorService } from '../../services/error.service';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule,PasswordModule,FormsModule,DividerModule,ToastModule,CheckboxModule,GoogleSigninButtonModule,MessagesModule],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export default class LoginComponent implements OnInit {
  request: LoginModel = new LoginModel();

  constructor(private message: MessageService, private http: HttpService, private router: Router, private auth: SocialAuthService, private error: ErrorService){}
  ngOnInit(): void {
   this.auth.authState.subscribe(res => {

    this.http.post("Auth/GoogleLogin", res, (data => {
      localStorage.setItem("response", JSON.stringify(data));
        this.router.navigateByUrl("/");
    }))
    console.log(res);
   })
  }

  signIn(){
    if(this.request.userNameOrEmail.length < 3){
        this.message.add({severity: 'warn', summary: 'Validasyon Hatası', detail: 'Geçerli bir kullacı adı yada mail adresi girin'});
        return;
    }

    if (this.request.password.length < 6 ){
      this.message.add({severity: 'warn', summary: 'Validasyon Hatası', detail: 'Şifreniz en az 6 karakter olmalıdır'});
        return;
    }

    this.http.post("Auth/Login", this.request, res => {
      localStorage.setItem("response", JSON.stringify(res));
      this.router.navigateByUrl("/");
    });
  }
}
