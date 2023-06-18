import { Conductor } from "@/shared/interfaces/conductor.interface";
import { Paper } from "@material-ui/core";
import dynamic from "next/dynamic";
import styles from "../styles.module.css";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface WeekDays {
  dom: number;
  seg: number;
  ter: number;
  qua: number;
  qui: number;
  sex: number;
  sáb: number;
}

interface Props {
  conductors: Conductor[];
}

const BarChart = ({ conductors }: Props) => {
  const getChatData = () => {
    const countExpired: WeekDays = {
      dom: 0,
      seg: 0,
      ter: 0,
      qua: 0,
      qui: 0,
      sex: 0,
      sáb: 0,
    };

    const currentDate = new Date().toISOString().split("T")[0];
    const nextWeekDate = new Date(
      new Date().getTime() + 7 * 24 * 60 * 60 * 1000
    );
    const nextWeekDateString = nextWeekDate.toISOString().slice(0, 10);

    const filteredConductors = conductors.filter((condutor) => {
      return (
        condutor.vencimentoHabilitacao >= currentDate &&
        condutor.vencimentoHabilitacao < nextWeekDateString
      );
    });

    filteredConductors.forEach((conductor) => {
      const date = new Date(conductor.vencimentoHabilitacao);
      const day = date
        .toLocaleDateString("pt-BR", { weekday: "short" })
        .slice(0, -1);
      countExpired[day as keyof WeekDays]++;
    });

    return Object.values(countExpired);
  };

  return (
    <Paper elevation={3} className={styles.paperContainer}>
      <h3 className={styles.subTitle}>Próximas Habilitações Vencidas</h3>
      <div>
        <Chart
          series={[
            {
              data: getChatData(),
            },
          ]}
          type="bar"
          height={120}
          width="100%"
          className={styles.barChart}
          options={{
            chart: {
              toolbar: {
                show: false,
              },
            },
            plotOptions: {
              bar: {
                distributed: true,
              },
            },
            legend: {
              show: false,
            },
            xaxis: {
              categories: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
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
  );
};

export default BarChart;
