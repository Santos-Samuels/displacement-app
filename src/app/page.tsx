"use client";

import { AppContainer, EntitiesCard } from "@/components";
import { useEntities } from "@/hooks/useEntities";
import { Grid, Paper } from "@material-ui/core";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface WeekDays {
  domingo: number;
  "segunda-feira": number;
  "terça-feira": number;
  "quarta-feira": number;
  "quinta-feira": number;
  "sexta-feira": number;
  sábado: number;
}

export default function Home() {
  const { entities, isLoading } = useEntities([
    "conductors",
    "customers",
    "displacements",
    "vehicles",
  ]);

  const getChatData = () => {
    let countDone = 0;
    let countInProgress = 0;

    entities?.displacements.forEach((displacement) => {
      if (displacement.fimDeslocamento) {
        countDone++;
        return;
      }

      countInProgress++;
    });

    if (countDone === 0 && countInProgress === 0) return [];

    return [countDone, countInProgress];
  };

  const getChatData2 = () => {
    const countExpired: WeekDays = {
      domingo: 0,
      "segunda-feira": 0,
      "terça-feira": 0,
      "quarta-feira": 0,
      "quinta-feira": 0,
      "sexta-feira": 0,
      sábado: 0,
    };

    const currentDate = new Date().toISOString().split("T")[0];
    const nextWeekDate = new Date(
      new Date().getTime() + 7 * 24 * 60 * 60 * 1000
    );
    const nextWeekDateString = nextWeekDate.toISOString().slice(0, 10);

    const filteredConductors = entities.conductors.filter((condutor) => {
      return (
        condutor.vencimentoHabilitacao >= currentDate &&
        condutor.vencimentoHabilitacao < nextWeekDateString
      );
    });

    filteredConductors.forEach((conductor) => {
      const date = new Date(conductor.vencimentoHabilitacao);
      const day = date.toLocaleDateString("pt-BR", { weekday: "long" });
      countExpired[day as keyof WeekDays]++;
    });

    return Object.values(countExpired);
  };

  return (
    <main>
      <AppContainer isLoading={isLoading}>
        <h1>Dasboard</h1>

        <EntitiesCard entities={entities} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3}>
              <h4>Relatório de Deslocamentos</h4>
              <div>
                <Chart
                  type="pie"
                  series={getChatData()}
                  // width={300}
                  height={212}
                  options={{
                    labels: ["Em andamento", "Finalizados"],
                    plotOptions: {
                      pie: {
                        dataLabels: {
                          offset: -15,
                        },
                      },
                    },
                    noData: {
                      text: "Não há deslocamentos",
                    },
                  }}
                />
              </div>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper elevation={3}>
              <h4>Habilitações vencidas essa semana</h4>
              <div>
                <Chart
                  series={[
                    {
                      data: getChatData2(),
                    },
                  ]}
                  type="bar"
                  height={200}
                  width="100%"
                  options={{
                    plotOptions: {
                      bar: {
                        distributed: true,
                      },
                    },
                    legend: {
                      show: false,
                    },
                    xaxis: {
                      categories: [
                        "Dom",
                        "Seg",
                        "Ter",
                        "Qua",
                        "Qui",
                        "Sex",
                        "Sab",
                      ],
                      labels: {
                        style: {
                          fontSize: "12px",
                        },
                      },
                    },
                    yaxis: {
                      tickAmount: 2,
                      labels: {
                        formatter: (value) => parseInt(`${value}`),
                      },
                    },
                    noData: {
                      text: "Não haverão vencimentos essa semana",
                    },
                  }}
                />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </AppContainer>
    </main>
  );
}
