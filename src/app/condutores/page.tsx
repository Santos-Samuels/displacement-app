"use client";
import { AppContainer, ConductorForm, ConductorList } from "@/components";
import { Conductor } from "@/shared/interfaces/conductor.interface";
import { ConductorService } from "@/shared/services";
import { useState } from "react";
import useSWR from "swr";

const ConductorPage = () => {
  const { data, error } = useSWR("/v1/condutor", fetchConductors);
  const [filteredItems, setFilteredItems] = useState<Conductor[]>();

  const handleFilter = (searchTerm: string) => {
    if (!searchTerm) {
      setFilteredItems(undefined);
      return;
    }

    const filteredItems = data?.filter((conductor) => {
      return (
        conductor.nome.toLowerCase().includes(searchTerm) ||
        conductor.numeroHabilitacao.toLowerCase().includes(searchTerm)
      );
    });

    setFilteredItems(filteredItems);
  };

  return (
    <AppContainer hasError={error} title="Condutores">
      <ConductorForm />
      <ConductorList
        conductors={filteredItems ?? data}
        handleFilter={handleFilter}
      />
    </AppContainer>
  );
};

export default ConductorPage;

const fetchConductors = async () => {
  const { data } = await ConductorService().getAll();
  return data;
};
