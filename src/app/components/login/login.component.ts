import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginModel } from '../../models/login.model';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule,PasswordModule,FormsModule,DividerModule,ToastModule,CheckboxModule],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export default class LoginComponent {
  request: LoginModel = new LoginModel();

  constructor(private message: MessageService, private http: HttpClient, private router: Router){}

  signIn(){
    if(this.request.userNameOrEmail.length < 3){
        this.message.add({severity: 'warn', summary: 'Validasyon Hatası', detail: 'Geçerli bir kullacı adı yada mail adresi girin'});
        return;
    }

    if (this.request.password.length < 6 ){
      this.message.add({severity: 'warn', summary: 'Validasyon Hatası', detail: 'Şifreniz en az 6 karakter olmalıdır'});
        return;
    }

    this.http.post("https://localhost:7171/api/Auth/Login", this.request)
    .subscribe({
      next: res => {
        localStorage.setItem("response", JSON.stringify(res));
        this.router.navigateByUrl("/");
      },
      error: (err: HttpErrorResponse) => {
        switch(err.status){
          case 400:
            this.message.add({severity: 'error', summary: "Hata!", detail: err.error.message});
            break;

          case 422:
            for(let e of err.error){
              this.message.add({severity: 'error', summary: "Validation Hatası!", detail: e});
            }
            break;
        }
      }
    })
  }
}
