import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateComponent } from '../create/create.component';
import { MessageService } from 'primeng/api';
import { customers } from '../../constants/customer';
import { TicketModel } from '../../models/ticket.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { ErrorService } from '../../services/error.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BreadcrumbModule, TableModule, TagModule, InputTextModule, ButtonModule, DynamicDialogModule],
  providers: [DialogService, MessageService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent implements OnInit{

    tickets: TicketModel[] = [];

    ref: DynamicDialogRef | undefined;

    selectedSubject!: any;

    constructor(public dialogService: DialogService, public messageService: MessageService, private http: HttpService) {}

    ngOnInit(): void {
        this.getAll();
    }

    getAll(){
        this.http.get("Tickets/GetAll", (res) => {
            this.tickets = res
        })
    }

    show() {
        this.ref = this.dialogService.open(CreateComponent, {
            header: 'Yeni Destek Oluştur',
            width: '30%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 1000,
            maximizable: false,
        });

        this.ref.onClose.subscribe((data: any) => {

            if (data) {
              this.http.post("Tickets/Add", data, (res) => {
                this.getAll();
                    this.messageService.add({ severity : 'success', summary: 'Destek talebi başarıyla açıldı!', detail: ' '});
                })  
            };
        });
        
        this.ref.onMaximize.subscribe((value) => {
            this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
        });
    }

    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }
}
