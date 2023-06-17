"use client";
import { AppContainer, ConductorForm, ConductorList } from "@/components";
import { ConductorService } from "@/shared/services";
import useSWR from "swr";

const ConductorPage = () => {
  const { data, error, isLoading } = useSWR("/v1/condutor", fetchConductors);

  return (
    <AppContainer isLoading={isLoading} hasError={error}>
      <ConductorForm />
      <ConductorList conductors={data} />
    </AppContainer>
  );
};

export default ConductorPage;

const fetchConductors = async () => {
  const { data } = await ConductorService().getAll();
  return data;
};
