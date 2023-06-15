export interface Customer {
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

export interface CustomerCreateInput extends Omit<Customer, "id"> {}