"use client";

import { useEntities } from "@/hooks/useEntities";
import { Weather } from "@/shared/interfaces/weather.interface";
import { WeatherService } from "@/shared/services";
import {
  AppContainer,
  BarChart,
  EntitiesCard,
  PieChart,
  WeathersCard,
} from "@components/index";
import { Grid } from "@material-ui/core";

import dynamic from "next/dynamic";
import useSWR from "swr";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function Home() {
  const { entities, isLoading } = useEntities([
    "conductors",
    "customers",
    "displacements",
    "vehicles",
  ]);

  const {
    data,
    error,
    isLoading: isWeatherLoading,
  } = useSWR<Weather>("/v1/weatherforecast", fetchWeather, {
    revalidateOnFocus: false,
  });

  return (
    <main>
      <AppContainer isLoading={isLoading || isWeatherLoading}>
        <h1 className="mb">Dasboard</h1>

        <div className="mb">
          <EntitiesCard entities={entities} />
        </div>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <WeathersCard weathers={data} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <PieChart displacements={entities.displacements} />
          </Grid>

          <Grid item xs={12} md={4}>
            <BarChart conductors={entities.conductors} />
          </Grid>
        </Grid>
      </AppContainer>
    </main>
  );
}

const fetchWeather = async () => {
  const { data } = await WeatherService().getAll();
  return data;
};
