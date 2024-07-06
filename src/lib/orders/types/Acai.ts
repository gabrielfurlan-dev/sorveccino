import { Aditional } from "./Aditional";
import { Packaging } from "./Packaging";
import { Sale } from "./Sale";

export interface Acai {
  packaging: Packaging;
  aditionals?: Aditional[];
  sale?: Sale;
  notes?: string;
}
