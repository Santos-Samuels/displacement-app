export default interface Costumer {
  id: string;
  numeroDocumento: string;
  tipoDocumento: string;
  nome: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
}

export interface CostumerCreateInput extends Omit<Costumer, "id"> {}