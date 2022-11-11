// Model za recenzije postavki

export interface RecenzijeModel{
  id: number;
  ocena: number;
  komentar: string;
  korisnik_id: number;
  postavka_id: number;
}
