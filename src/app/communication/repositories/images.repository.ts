import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpRepository } from '../http.repository';
import { ICat } from '../model';

@Injectable()
export class ImagesRepository extends HttpRepository<ICat> {
  get _baseUrl(): string {
    return `${environment.catsApiUrl}/images/search`;
  }
}
