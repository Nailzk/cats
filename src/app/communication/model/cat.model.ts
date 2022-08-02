import { IBreed } from "./breed.model";
import { ICategory } from "./category.model";

export interface ICat {
    breeds: IBreed[],
    categories: ICategory[],
    id: string,
    url: string,
    width: number,
    height: number
}