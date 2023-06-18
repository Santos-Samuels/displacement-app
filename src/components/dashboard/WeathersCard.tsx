import { Weather } from "@/shared/interfaces/weather.interface";
import { Paper } from "@material-ui/core";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import CloudIcon from "@material-ui/icons/Cloud";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import styles from "../styles.module.css";

interface Props {
  weathers?: Weather[];
}

const WeathersCard = ({ weathers }: Props) => {
  const formatDate = (date: string) => {
    return new Date(date)
      .toLocaleDateString("pt-BR", {
        weekday: "short",
      })
      .slice(0, -1);
  };

  const getIcon = (temperatureC: number) => {
    if (temperatureC > 10 && temperatureC < 28)
      return <CloudIcon color="disabled" />;
    else if (temperatureC <= 10) return <AcUnitIcon color="disabled" />;
    else return <WbSunnyIcon color="disabled" />;
  };

  const isCardActive = (date: string) => {
    return formatDate(new Date().toISOString()) === formatDate(date);
  };

  return (
    <Paper elevation={3} className={styles.paperContainer}>
      <h4 className={styles.subTitle}>Previsão do Tempo</h4>

      <div className={styles.weatherCard}>
        {weathers?.map((weather) => (
          <div
            key={weather.date}
            className={`${isCardActive(weather.date) && styles.activeCard}`}
          >
            <span>{formatDate(weather.date)}</span>
            <h2>
              {weather.temperatureC}
              <span>°C</span>
            </h2>
            <i>{getIcon(weather.temperatureC)}</i>
          </div>
        ))}
      </div>
    </Paper>
  );
};

export default WeathersCard;
