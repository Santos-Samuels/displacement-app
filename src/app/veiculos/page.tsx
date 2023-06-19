"use client";
import { AppContainer, VehicleForm, VehicleList } from "@/components";
import { VehicleService } from "@/shared/services";
import useSWR from "swr";

const VehiclePage = () => {
  const { data, error, isLoading } = useSWR("/v1/veiculo", fetchVehicles);

  return (
    <AppContainer isLoading={isLoading} hasError={error} title="Veículos">
      <VehicleForm />
      <VehicleList vehicles={data} />
    </AppContainer>
  );
};

export default VehiclePage;

const fetchVehicles = async () => {
  const { data } = await VehicleService().getAll();
  return data;
}
