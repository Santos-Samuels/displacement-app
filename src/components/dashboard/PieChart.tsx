import { Displacement } from "@/shared/interfaces/displacement.interface";
import { Paper } from "@material-ui/core";
import dynamic from "next/dynamic";
import styles from "../styles.module.css";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface Props {
  displacements: Displacement[];
}

const PieChart = ({ displacements }: Props) => {
  const getChatData = () => {
    let countDone = 0;
    let countInProgress = 0;

    displacements.forEach((displacement) => {
      if (displacement.fimDeslocamento) {
        countDone++;
        return;
      }

      countInProgress++;
    });

    if (countDone === 0 && countInProgress === 0) return [];

    return [countDone, countInProgress];
  };

  return (
    <Paper elevation={3} className={styles.paperContainer}>
      <h4 className={styles.subTitle}>Relatório de Deslocamentos</h4>

      <Chart
        type="pie"
        series={getChatData()}
        height={120}
        options={{
          labels: ["Em andamento", "Finalizados"],
          plotOptions: {
            pie: {
              dataLabels: {
                offset: -15,
              },
            },
          },
          stroke: {
            show: false,
          },
          noData: {
            text: "Não há deslocamentos",
          },
        }}
      />
    </Paper>
  );
};

export default PieChart;
