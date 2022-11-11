export interface Chating {
  id: string;
  prikaziIme: string;
  email: string;
  type: 'covek' | 'pridruzio';
  message: string;

  // za svakupojedinacnu poruku
  napravljenaPoruka: string;

  // Ko se prikljucio
  koJe: boolean;
}
