"use client";
import { AppContainer, VehicleForm, VehicleList } from "@/components";
import { Vehicle } from "@/shared/interfaces/vehicle.interface";
import { VehicleService } from "@/shared/services";
import { useState } from "react";
import useSWR from "swr";

const VehiclePage = () => {
  const { data, error } = useSWR("/v1/veiculo", fetchVehicles);
  const [filteredItems, setFilteredItems] = useState<Vehicle[]>();

    const handleFilter = (searchTerm: string) => {
    if (!searchTerm) {
      setFilteredItems(undefined);
      return;
    }

    const filteredItems = data?.filter((conductor) => {
      return (
        conductor.placa.toLowerCase().includes(searchTerm) ||
        conductor.marcaModelo.toLowerCase().includes(searchTerm)
      );
    });

    setFilteredItems(filteredItems);
  };

  return (
    <AppContainer hasError={error} title="Veículos">
      <VehicleForm />
      <VehicleList vehicles={filteredItems ?? data} handleFilter={handleFilter} />
    </AppContainer>
  );
};

export default VehiclePage;

const fetchVehicles = async () => {
  const { data } = await VehicleService().getAll();
  return data;
}
