import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MoviesService } from 'src/app/services/movies.service';
import { DataLocalService } from 'src/app/services/data-local.service';
import { Cast, PeliculaDetalle } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id: string;

  public pelicula: PeliculaDetalle = {};
  public actores: Cast[] = [];
  public oculto = 150;
  public estrella = 'star-outline';

  public slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: 0
  };

  constructor(
    private modalController: ModalController,
    private moviesService: MoviesService,
    private dataLocalService: DataLocalService
  ) { }

  ngOnInit() {
    this.dataLocalService.existePelicula(this.id).then(existe => this.estrella = (existe) ? 'star' : 'star-outline');
    this.getPeliculaDetalle(this.id);
    this.getActoresPelicula(this.id);
  }

  getPeliculaDetalle(id: string) {
    this.moviesService.getPeliculaDetalle(id).subscribe(
      response => {
        this.pelicula = response;
      }
    );
  }

  getActoresPelicula(id: string) {
    this.moviesService.getActoresPelicula(id).subscribe(
      response => {
        this.actores = response.cast;
      }
    );
  }

  regresar() {
    this.modalController.dismiss();
  }

  favorito() {
    const existe = this.dataLocalService.guardarPelicula(this.pelicula);
    this.estrella = (existe) ? 'star' : 'star-outline';
  }

}
