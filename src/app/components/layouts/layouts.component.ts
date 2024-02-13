import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [CommonModule, MenubarModule, RouterOutlet, InputTextModule, ButtonModule],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.css'
})
export class LayoutsComponent {
  items: MenuItem[] | undefined;

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
    alert("Çıkış yapıldı!");
  }
}
