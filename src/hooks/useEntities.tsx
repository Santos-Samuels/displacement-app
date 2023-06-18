import { Entities } from "@/shared/interfaces/entities.interface";
import {
  ConductorService,
  CustomerService,
  DisplacementService,
  VehicleService,
} from "@/shared/services";
import { useEffect, useState } from "react";

const initialEntities: Entities = {
  conductors: [],
  customers: [],
  displacements: [],
  vehicles: [],
};

type EntitiesType = keyof Entities;

const useEntities = (entitiesTypes: EntitiesType[]) => {
  const [entities, setEntities] = useState<Entities>(initialEntities);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEntities = async () => {
    setIsLoading(true);
    const entitiesData = initialEntities;

    if (entitiesTypes.includes("conductors")) {
      try {
        const { data } = await ConductorService().getAll();
        entitiesData.conductors = data;
      } catch (error) {
        entitiesData.conductors = [];
      }
    }

    if (entitiesTypes.includes("customers")) {
      try {
        const { data } = await CustomerService().getAll();
        entitiesData.customers = data;
      } catch (error) {
        entitiesData.customers = [];
      }
    }

    if (entitiesTypes.includes("displacements")) {
      try {
        const { data } = await DisplacementService().getAll();
        entitiesData.displacements = data;
      } catch (error) {
        entitiesData.displacements = [];
      }
    }

    if (entitiesTypes.includes("vehicles")) {
      try {
        const { data } = await VehicleService().getAll();
        entitiesData.vehicles = data;
      } catch (error) {
        entitiesData.vehicles = [];
      }
    }

    setEntities(entitiesData);
    setIsLoading(false);
  };

  const revalidate = async () => {
    fetchEntities();
  };

  useEffect(() => {
    fetchEntities();
  }, []);

  return {
    entities,
    isLoading,
    revalidate,
  };
};

export { useEntities };
