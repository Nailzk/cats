import { HttpClient, HttpEvent } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { map, Observable } from 'rxjs';
import { Repository } from './repository-abstract';

@Injectable()
export abstract class HttpRepository<T> extends Repository<T> {
  _httpOptions: any = {};

  constructor(@Inject(HttpClient) protected _http: HttpClient) {
    super();

    this._httpOptions = {
      headers: {
        'x-api-key': environment.catsApiKey
      }
    }
  }

  public getItems(query?: any): Observable<T[]> {
    return this._http.get<T>(this._baseUrl, {
      ...this._httpOptions,
      params: query,
    })
      .pipe(
        map(this.transform)
      )
  }

  get _baseUrl(): string {
    throw Error('Implement _baseUrl method');
  }

  protected transform(item: any): any {
    return item;
  }
}
