import { Component, OnInit } from '@angular/core';
import { CategoriesRepository, ICategory } from '../communication';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PAGE_LIMITS } from './constants';

@UntilDestroy()
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public categories: ICategory[] = [];
  public categoryId: number | null;

  public pageLimits = PAGE_LIMITS;

  public set pageLimit(value: number) {
    this._handlePageLimitChanges(value);
  }

  public get pageLimit(): number {
    return this._pageLimit;
  }

  private _pageLimit: number;

  constructor(
    private readonly _categoriesRepository: CategoriesRepository,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router
  ) { }

  ngOnInit() {
    this._initCategories();
    this._subscribeOnRouteParams();

  }

  private _subscribeOnRouteParams(): void {
    this._route.queryParams
      .pipe(untilDestroyed(this))
      .subscribe((params) => {
        this._pageLimit = Number(params?.limit) || 10;
        this.categoryId = Number(params?.category_ids) || null;
      })
  }

  private _handlePageLimitChanges(limit: number): void {
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: { limit },
      queryParamsHandling: 'merge'
    })

    this._pageLimit = limit;
  }

  private _initCategories(): void {
    this._categoriesRepository.getItems()
      .pipe(untilDestroyed(this))
      .subscribe(
        (val: ICategory[]) => this.categories = val,
        (err) => console.error(err)
      )
  }

}
