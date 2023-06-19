"use client";
import { AppContainer, DisplacementForm, DisplacementList } from "@/components";
import { useEntities } from "@/hooks/useEntities";
import { Displacement } from "@/shared/interfaces/displacement.interface";
import { DisplacementService } from "@/shared/services";
import { useState } from "react";
import useSWR from "swr";

const DisplacementPage = () => {
  const { entities } = useEntities(["vehicles", "customers", "conductors"]);
  const { data, error } = useSWR("/v1/deslocamento", fetchDisplacements);
  const [filteredItems, setFilteredItems] = useState<Displacement[]>();

  const handleFilter = (searchTerm: string) => {
    if (!searchTerm) {
      setFilteredItems(undefined);
      return;
    }

    const filteredItems = data?.filter((displacement) => {
      const conductorName =
        entities.conductors
          .find((conductor) => conductor.id === displacement.idCondutor)
          ?.nome.toLocaleLowerCase() || "";

      const vehiclePlate =
        entities.vehicles
          .find((vehicle) => vehicle.id === displacement.idVeiculo)
          ?.placa.toLocaleLowerCase() || "";

      return (
        conductorName.includes(searchTerm) || vehiclePlate.includes(searchTerm)
      );
    });

    setFilteredItems(filteredItems);
  };

  return (
    <AppContainer hasError={error} title="Deslocamentos">
      <DisplacementForm />
      <DisplacementList
        displacements={filteredItems ?? data}
        handleFilter={handleFilter}
      />
    </AppContainer>
  );
};

export default DisplacementPage;

const fetchDisplacements = async () => {
  const { data } = await DisplacementService().getAll();
  return data;
};
