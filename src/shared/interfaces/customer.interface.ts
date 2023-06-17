export interface Customer {
  id: number;
  numeroDocumento: string;
  tipoDocumento: string;
  nome: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
}

export interface CustomerCreateInput extends Omit<Customer, "id"> {}

export interface CustomerUpdateInput {
  id: number;
  nome: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
}