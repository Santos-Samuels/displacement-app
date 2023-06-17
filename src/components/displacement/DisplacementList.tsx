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
} from "@material-ui/core";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";
import styles from "../styles.module.css";
import DisplacementItem from "./DisplacementItem";

interface Props {
  displacements?: Displacement[];
}

const DisplacementList = ({ displacements }: Props) => {
  const { mutate } = useSWRConfig();

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
      <h1 className={styles.title}>Lista de Deslocamentos</h1>

      {displacements?.length ? (
        <TableContainer className={styles.table} component={Paper}>
          <Table aria-label="lista de clientes">
            <TableHead>
              <TableRow>
                <TableCell align="center">Nº</TableCell>
                <TableCell align="center">Deslocamento (Km)</TableCell>
                <TableCell align="center">Tempo</TableCell>
                <TableCell align="center">Status</TableCell>
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
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>Não há deslocamentos cadastrados</p>
      )}
    </div>
  );
};

export default DisplacementList;
