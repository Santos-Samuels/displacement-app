export interface Conductor {
  id: number;
  nome: string;
  numeroHabilitacao: string;
  catergoriaHabilitacao: string;
  vencimentoHabilitacao: string;
}

export interface ConductorUpdateInput {
  id: number;
  categoriaHabilitacao: string;
  vencimentoHabilitacao: string;
}

export interface ConductorCreateInput {
  nome: string;
  numeroHabilitacao: string;
  categoriaHabilitacao: string;
  vencimentoHabilitacao: string;
}
