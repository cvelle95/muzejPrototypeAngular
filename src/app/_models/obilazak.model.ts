import {PostavkaModel} from "./postavka.model";

export interface ObilazakModel{
  id: number;
  status: string;
  korisnik_id: number;
  postavka_id: number;
  postavka?:PostavkaModel;
  isRated:boolean;
}
