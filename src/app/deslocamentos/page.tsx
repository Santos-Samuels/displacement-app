"use client";
import { AppContainer, DisplacementList } from "@/components";
import { useEntities } from "@/hooks/useEntities";
import { DisplacementService } from "@/shared/services";
import useSWR from "swr";

const DisplacementPage = () => {
  const {isLoading: isEntitiesLoading} = useEntities(["vehicles", "customers", "conductors"]);
  const { data, error, isLoading } = useSWR(
    "/v1/deslocamento",
    fetchDisplacements
  );

  return (
    <AppContainer isLoading={isLoading || isEntitiesLoading} hasError={error}>
      <DisplacementList displacements={data} />
    </AppContainer>
  );
};

export default DisplacementPage;

const fetchDisplacements = async () => {
  const { data } = await DisplacementService().getAll();
  return data;
};
