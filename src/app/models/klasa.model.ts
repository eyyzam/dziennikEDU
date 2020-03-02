import { Uczen } from "./uczen.model";

export class Klasa {
  constructor(
    public classID: string,
    public name: string,
    public description: string,
    public students?: Uczen[]
  ) {}
}
