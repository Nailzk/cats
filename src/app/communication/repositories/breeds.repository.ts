import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpRepository } from '../http.repository';
import { IBreed } from '../model';

@Injectable()
export class BreedsRepository extends HttpRepository<IBreed> {
    get _baseUrl(): string {
        return `${environment.catsApiUrl}/breeds`;
    }
}
