"use client";
import { AppContainer, DisplacementList } from "@/components";
import { DisplacementService } from "@/shared/services";
import useSWR from "swr";

const DisplacementPage = () => {
  const { data, error, isLoading } = useSWR(
    "/v1/deslocamento",
    fetchDisplacements
  );

  return (
    <AppContainer isLoading={isLoading} hasError={error}>
      <DisplacementList displacements={data} />
    </AppContainer>
  );
};

export default DisplacementPage;

const fetchDisplacements = async () => {
  const { data } = await DisplacementService().getAll();
  return data;
};
