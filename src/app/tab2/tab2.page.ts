import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { Pelicula } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public textoBuscar: string = '';
  public ideas: string[] = ['Spiderman', 'Avengers', 'El señor de los anillos', 'La vida es bella'];
  public buscando = false;
  public peliculas: Pelicula[] = [];

  constructor(
    private moviesService: MoviesService,
    private modalController: ModalController
  ) { }

  buscar(evento: any) {
    const valor = evento.detail.value;

    if (valor.length === 0) {
      this.buscando = false;
      this.peliculas = [];
      return;
    }

    this.buscando = true;
    this.moviesService.buscarPeliculas(valor).subscribe(
      response => {
        this.peliculas = response['results'];
        this.buscando = false;
      }
    );
  }

  async verDetalle(id: string) {
    const modal = await this.modalController.create({
      component: DetalleComponent,
      componentProps: {
        id: id
      }
    });

    modal.present();
  }

}
