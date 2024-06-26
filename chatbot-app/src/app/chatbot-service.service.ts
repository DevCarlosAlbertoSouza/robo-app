import { Injectable } from '@angular/core';
import { PetService } from '../app/pet-service';
import { ServicesService } from './services.service';

@Injectable({
  providedIn: 'root'
})
export class ChatbotServiceService {
  messages: any[] = [];

  constructor(private services: ServicesService) { }

  getBotResponse(userMessage: string) {
    const lowerCaseMessage = userMessage.toLowerCase();
    let response = "Desculpe, não entendi sua mensagem. Você pode perguntar pelo número do serviço para obter seu valor.";

    // Respostas predefinidas para saudações
    const greetingsResponses = [
      "Boa noite! Qual é o seu nome? Tudo bem contigo? Em que posso lhe ajudar?",
      "Olá! Como posso ajudar você hoje?",
      "Bom dia! Como posso ser útil?"
    ];

    // Saudações
    if (this.containsGreeting(lowerCaseMessage)) {
      response = greetingsResponses[Math.floor(Math.random() * greetingsResponses.length)];
    } else if (this.isServiceNumberRequest(lowerCaseMessage)) {
      const serviceId = parseInt(lowerCaseMessage.replace(/[^\d]/g, ''));
      const service = this.services.findServiceById(serviceId);
      if (service) {
        response = `O serviço de ${service.name} custa R$${service.price.toFixed(2)}.`;
      } else {
        response = "Desculpe, o número de serviço selecionado não corresponde a nenhum serviço disponível.";
      }
    } else {
      // Obter o cardápio de serviços formatado
      response = this.formatServiceMenu();
    }

    // Adicionar a resposta gerada pelo bot às mensagens
    this.messages.push({ text: response, sender: 'bot' });
  }

  private containsGreeting(message: string): boolean {
    return message.includes('olá') || message.includes('boa noite') || message.includes('bom dia') || message.includes('boa tarde');
  }

  private isServiceNumberRequest(message: string): boolean {
    return /\b\d{1,2}\b/.test(message);
  }

  private formatServiceMenu(): string {
    let menu = "Cardápio de Serviços:\n\n";
    this.services.services.forEach((service, index) => {
      menu += `${index + 1}. ${service.name} - R$${service.price.toFixed(2)}\n`;
    });
    menu += "\nPara obter o valor de um serviço, digite o número correspondente.";
    return menu;
  }
}
