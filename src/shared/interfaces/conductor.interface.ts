export interface Conductor {
  id: number;
  nome: string;
  numeroHabilitacao: string;
  catergoriaHabilitacao: string;
  vencimentoHabilitacao: string;
}

export interface ConductorUpdateInput {
  id: number;
  catergoriaHabilitacao: string;
  vencimentoHabilitacao: string;
}

export interface ConductorCreateInput
  extends Omit<Conductor, "id"> {}
