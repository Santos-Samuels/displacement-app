import { AppContext } from "@/context";
import { Displacement } from "@/shared/interfaces/displacement.interface";
import { DisplacementService } from "@/shared/services";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { useContext } from "react";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";
import styles from "../styles.module.css";
import DisplacementItem from "./DisplacementItem";

interface Props {
  displacements?: Displacement[];
  handleFilter: (searchTerm: string) => void;
}

const DisplacementList = ({ displacements, handleFilter }: Props) => {
  const { mutate } = useSWRConfig();
  const { setCurrentDisplacement } = useContext(AppContext);

  const handleDelete = async (id: number) => {
    try {
      await DisplacementService().remove(id);
      toast.success("Deslocamento removido com sucesso.");
      mutate("/v1/deslocamento");
    } catch (error) {
      toast.error("Erro ao remover o deslocamento.");
    }
  };

  return (
    <div>
      <div className={styles.listHeader}>
        <h1 className={styles.title}>Lista de Deslocamentos</h1>

        <div>
          <TextField
            id="standard-basic"
            label="Filtrar por Placa ou Nome do Condutor"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => handleFilter(e.target.value.toLowerCase())}
          />
        </div>
      </div>

      {displacements?.length ? (
        <TableContainer className={styles.table} component={Paper}>
          <Table aria-label="lista de clientes">
            <TableHead>
              <TableRow>
                <TableCell align="center">Nº</TableCell>
                <TableCell align="center">Deslocamento</TableCell>
                <TableCell align="center">Tempo</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Veículo</TableCell>
                <TableCell align="center">Condutor</TableCell>
                <TableCell align="center">Cliente</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displacements.map((displacement, index) => (
                <DisplacementItem
                  {...displacement}
                  index={index + 1}
                  key={displacement.id}
                  onDelete={handleDelete}
                  onEdit={() => setCurrentDisplacement(displacement)}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>Nenhum deslocamentos encontrado!</p>
      )}
    </div>
  );
};

export default DisplacementList;
