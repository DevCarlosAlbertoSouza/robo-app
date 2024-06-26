import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ChatbotServiceService } from '../chatbot-service.service'; // Certifique-se de que o caminho está correto

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule
  ]
})
export class ChatbotComponent {
  messages: { text: string, sender: string }[] = [];
  userInput: string = '';

  constructor(private ChatbotServiceService: ChatbotServiceService) { }

  sendMessage() {
    if (this.userInput.trim()) {
      this.messages.push({ text: this.userInput, sender: 'user' });
      this.getBotResponse(this.userInput);
      this.userInput = '';
    }
  }

  getBotResponse(userMessage: string) {
    this.ChatbotServiceService.getBotResponse(userMessage);
    // Atualize as mensagens com a resposta do serviço
    setTimeout(() => {
      this.messages = [...this.ChatbotServiceService.messages];
    }, 1000);
  }
}
