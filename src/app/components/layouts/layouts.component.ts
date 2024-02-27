import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [CommonModule, MenubarModule, RouterOutlet, InputTextModule, ButtonModule],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.css'
})
export class LayoutsComponent {
  items: MenuItem[] | undefined;

  constructor(
    public auth: AuthService,
    private router: Router
  ){}

  ngOnInit() {
      this.items = [
          {
            label: 'Anasayfa',
            icon: 'pi pi-fw pi-home',
            routerLink: "/"
          }
      ];
  }

  logout(){
    localStorage.removeItem("response");
    location.href = "/login";
  }
}
