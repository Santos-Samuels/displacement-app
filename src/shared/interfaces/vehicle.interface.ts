export interface Vehicle {
  id: number;
  placa: string;
  marcaModelo: string;
  anoFabricacao: number;
  kmAtual: number;
}

export interface VehicleCreateInput extends Omit<Vehicle, "id"> {}

export interface VehicleUpdateInput extends Omit<Vehicle, "id" & "placa"> {}
