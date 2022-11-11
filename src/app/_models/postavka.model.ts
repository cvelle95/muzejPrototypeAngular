import {EksponatModel} from "./eksponat.model";
//Model za postavku,sadrzi array eksponata koji su deo paketa postavke
export interface PostavkaModel{
  id: number;
  naziv: string;
  opis: string;
  vrsta: number;
  brojEksponata: number;
  cena: number;
  vremeObilaska: string;
  slika: string;
  eksponati?: Array<EksponatModel>;
}
