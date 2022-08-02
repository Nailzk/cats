import { ModuleWithProviders, NgModule } from '@angular/core';
import { BreedsRepository, CategoriesRepository, ImagesRepository } from './repositories';

@NgModule({})
export class Repositories {
  static forRoot(): ModuleWithProviders<Repositories> {
    return {
      ngModule: Repositories,
      providers: [
        ImagesRepository,
        CategoriesRepository,
        BreedsRepository
      ],
    };
  }
}
