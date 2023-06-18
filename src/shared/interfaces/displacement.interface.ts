export interface Displacement {
  id: number;
  kmInicial: number;
  kmFinal: number;
  inicioDeslocamento: string;
  fimDeslocamento: string;
  checkList: string;
  motivo: string;
  observacao: string;
  idCondutor: number;
  idVeiculo: number;
  idCliente: number;
}

export interface DisplacementCreateInput {
  kmInicial: number;
  inicioDeslocamento: string;
  kmFinal?: number;
  fimDeslocamento?: string;
  checkList: string;
  motivo: string;
  observacao: string;
  idCondutor: number;
  idVeiculo: number;
  idCliente: number;
}

export interface DisplacementUpdateInput {
  id: number;
  kmFinal: number;
  fimDeslocamento: string;
  observacao: string;
}
