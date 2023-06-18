import { Entity } from "../interfaces/entities.interface";

export const getEntityLabel = (
  entity: Entity,
  isSingular?: boolean
): string => {
  let label = "";
  let sliceValue = -1;

  if (entity === "displacements") label = "Deslocamentos";
  if (entity === "customers") label = "Clientes";
  if (entity === "conductors") label = "Condutores";
  if (entity === "vehicles") label = "Veículos";
  if (entity === "conductors") sliceValue = -2;

  return isSingular ? label.slice(0, sliceValue) : label;
};
