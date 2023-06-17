import { AppContext } from "@/context";
import { Vehicle } from "@/shared/interfaces/vehicle.interface";
import { VehicleService } from "@/shared/services";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import { useContext } from "react";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";
import styles from "../styles.module.css";
import VehicleItem from "./VehicleItem";

interface Props {
  vehicles?: Vehicle[];
}

const VehicleList = ({ vehicles }: Props) => {
  const { mutate } = useSWRConfig();
  const { setCurrentVehicle } = useContext(AppContext);

  const handleDelete = async (id: number) => {
    try {
      await VehicleService().remove(id);
      toast.success("Veículo removido com sucesso.");
      mutate("/v1/veiculo");
    } catch (error) {
      toast.error("Erro ao remover o veículo.");
    }
  };

  return (
    <div>
      <h1 className={styles.title}>Lista de Veículos</h1>

      {vehicles?.length ? (
        <TableContainer className={styles.table} component={Paper}>
          <Table aria-label="lista de clientes">
            <TableHead>
              <TableRow>
                <TableCell align="center">Nº</TableCell>
                <TableCell align="center">Placa</TableCell>
                <TableCell align="center">Marca/Modelo</TableCell>
                <TableCell align="center">Ano</TableCell>
                <TableCell align="center">Km</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehicles.map((vehicle, index) => (
                <VehicleItem
                  {...vehicle}
                  index={index + 1}
                  key={vehicle.id}
                  onDelete={handleDelete}
                  onEdit={() => setCurrentVehicle(vehicle)}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>Não há veículos cadastrados</p>
      )}
    </div>
  );
};

export default VehicleList;
