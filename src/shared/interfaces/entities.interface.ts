import { Conductor } from "./conductor.interface";
import { Customer } from "./customer.interface";
import { Displacement } from "./displacement.interface";
import { Vehicle } from "./vehicle.interface";

export interface Entities {
  conductors: Conductor[];
  customers: Customer[];
  vehicles: Vehicle[];
  displacements: Displacement[];
}

export type Entity = keyof Entities;