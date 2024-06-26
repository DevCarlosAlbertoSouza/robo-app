import { Injectable } from '@angular/core';

export interface PetService {
  id: number;
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  services: PetService[] = [
    { id: 1, name: "Banho & Tosa Geral ", price: 70.0 },
    { id: 2, name: "Banho & Tosa Higiênica", price: 70.0 },
    { id: 3, name: "Tosa Simples", price: 50.0 },
    { id: 4, name: "Banho Simples", price: 50.0 },
    { id: 5, name: "TaxiDog (gratuito)", price: 0.0 }
  ];

  constructor() { }

  getAllServices(): string {
    let response = "Cardápio de Serviços:\n\n";
    this.services.forEach(service => {
      response += `${service.id}. ${service.name} - R$${service.price.toFixed(2)}\n`;
    });
    response += "\nPara obter o valor de um serviço, digite o número correspondente.";

    return response;
  }

  findServiceById(id: number): PetService | undefined {
    return this.services.find(service => service.id === id);
  }
}
