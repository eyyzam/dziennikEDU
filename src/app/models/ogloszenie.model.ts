export class Ogloszenie {
  constructor(
    public ogloszenieID: string,
    public ogloszenieNadawcaID: string,
    public ogloszenieTytul: string,
    public ogloszenieGrupaOdbiorcow: string,
    public ogloszenieContent: string,
    public ogloszenieAktywne: boolean
  ) {}
}
