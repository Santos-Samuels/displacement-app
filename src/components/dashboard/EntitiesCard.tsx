import { getEntityLabel } from "@/shared/utils/getEntityLabel";
import { Grid, Paper } from "@material-ui/core";
import { Entities, Entity } from "@shared/interfaces/entities.interface";
import styles from "../styles.module.css";

interface Props {
  entities: Entities;
}

const EntitiesCard = ({ entities }: Props) => {
  return (
    <Grid container spacing={2} className={styles.section}>
      {Object.entries(entities).map(([key, value]) => (
        <Grid item xs={12} sm={6} md={3} key={key}>
          <Paper elevation={3} className={styles.card}>
            <div>
              <img
                src={`/icons/${key.slice(0, -1)}.png`}
                height={50}
                alt={`${key} icon`}
                className={styles.icon}
              />
            </div>
            <div>
              <span>{value.length}</span>
              <h3>{getEntityLabel(key as Entity, value.length === 1)}</h3>
            </div>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default EntitiesCard;
