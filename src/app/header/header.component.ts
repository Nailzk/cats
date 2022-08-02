import { Component, OnInit } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BreedsRepository, IBreed } from '../communication';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public breads: IBreed[] = [];
  public breadOptions: IBreed[] = [];

  public set breed(val: string) {
    this._handleBreedValue(val);
    this._breed = val;
  }

  public get breed(): string {
    return this._breed;
  }

  private _breed: string;

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _breedsRepository: BreedsRepository,
  ) { }

  ngOnInit() {
    this._initBread();
  }

  public clearBreed(): void {
    this._handleBreedChanges();
    this.breed = '';
  }

  public handleSelected(event: MatOptionSelectionChange): void {
    const { id, name } = event.source.value;
    this._handleBreedChanges(id);
    this._breed = name;
  }

  private _handleBreedValue(val: string): void {
    this.breadOptions = this.breads.filter((breed) =>
      breed.name.toLocaleLowerCase().includes((val ?? '').toLocaleLowerCase())
    )
  }

  private _initBread() {
    this._breedsRepository.getItems()
      .pipe(untilDestroyed(this))
      .subscribe((val: IBreed[]) => {
        this.breads = val;
        this.breadOptions = val;

        this._subscribeOnQueryParams();
      })
  }

  private _subscribeOnQueryParams(): void {
    this._route.queryParams
      .pipe(untilDestroyed(this))
      .subscribe((params) => {
        const { breed_id } = params;
        const breed = this.breads.find(({ id }) => id === breed_id);
        this.breed = breed?.name ?? '';

      })
  }

  private _handleBreedChanges(value?: string) {
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        breed_id: value ?? null
      },
      queryParamsHandling: 'merge'
    })
  }
}
