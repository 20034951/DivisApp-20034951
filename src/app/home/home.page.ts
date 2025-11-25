import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    FormsModule,
    CommonModule
  ],
})
export class HomePage {

  tasaUsd: number | null = null;
  cargando = false;
  error: string | null = null;

  quetzales: number | null = null;
  resultado: number | null = null;

  readonly DEFAULT_TASA_USD = 0.128;

  constructor() {
    this.obtenerTipoCambio();
  }

  async obtenerTipoCambio() {
    this.cargando = true;
    this.error = null;

    try {
      const res = await fetch("https://open.er-api.com/v6/latest/GTQ");
      const data = await res.json();

      this.tasaUsd = data.rates.USD; // 1 GTQ → USD
    } catch (err) {
        console.error("API de tipo de cambio falló:", err);
        this.tasaUsd = this.DEFAULT_TASA_USD;
      }

    this.cargando = false;
  }

  convertir() {
    if (this.tasaUsd && this.quetzales != null) {
      this.resultado = this.quetzales * this.tasaUsd;
    }
  }
}
