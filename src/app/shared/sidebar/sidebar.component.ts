import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  get historial() {
    return this.gifsService.historial;
  }

  constructor(private gifsService: GifsService) {}

  buscar(term: string) {
    this.gifsService.buscarGifs(term);
  }
}
