import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ICat, ImagesRepository } from '../communication';

@UntilDestroy()
@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.scss']
})
export class CatsComponent implements OnInit {
  public cats: ICat[] = [];
  public isLoading = false;

  private _params: any = {
    limit: 10
  }

  constructor(
    private readonly _imagesRepository: ImagesRepository,
    private readonly _route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this._subscribeOnParamChanges();
  }

  private _subscribeOnParamChanges(): void {
    this._route.queryParams
      .pipe(untilDestroyed(this))
      .subscribe((params) => {
        const query = { ...this._params, ...params };

        this._loadImages(query);
      })
  }

  private _loadImages(params: any): void {
    this.isLoading = true;

    this._imagesRepository.getItems(params)
      .pipe(untilDestroyed(this))
      .subscribe(
        (val: ICat[]) => {
          this.cats = val;
          this.isLoading = false;
        },
        (err) => console.error(err)
      )
  }

}
