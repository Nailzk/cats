import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpRepository } from '../http.repository';
import { ICategory } from '../model';

@Injectable()
export class CategoriesRepository extends HttpRepository<ICategory> {
  get _baseUrl(): string {
    return `${environment.catsApiUrl}/categories`;
  }
}
