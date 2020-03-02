export class Pracownik {
  constructor(
    public pracownikID: string,
    public imie: string,
    public nazwisko: string,
    public szkolaID: string,
    public pedagog: boolean,
    public status: boolean
  ) {}
}
