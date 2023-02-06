import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _apiKey: string = 'XfAZ7bkPkjlp5Czbuc2yNGZL62peM5De';
  private _historial: string[] = [];
  public resultados: Gif[] = [];
  private _servicioURL: string = 'https://api.giphy.com/v1/gifs';

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial') || '[]');
    this.resultados = JSON.parse(localStorage.getItem('resultados') || '[]');
  }

  buscarGifs(query: string) {
    if (query.trim().length == 0) return;
    query = query.trim().toLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
    }

    this._historial = this._historial.splice(0, 10);

    localStorage.setItem('historial', JSON.stringify(this._historial));

    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http
      .get<SearchGifsResponse>(`${this._servicioURL}/search`, {
        params: params,
      })
      .subscribe((resp: any) => {
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }
}
