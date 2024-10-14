import {Component} from '@angular/core';
import {Button} from "primeng/button";
import {FormsModule, NgForm} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {CardModule} from "primeng/card";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    Button,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    CardModule,
    ToastModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  constructor(private messageService: MessageService) {
  }

  onSave(form : NgForm){
    this.messageService.add({severity:'success', summary:'', detail:'Demande de contact envoyée avec succès'});
    form.reset()
  }

}
