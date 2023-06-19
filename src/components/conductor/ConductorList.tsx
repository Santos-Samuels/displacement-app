import { AppContext } from "@/context";
import { Conductor } from "@/shared/interfaces/conductor.interface";
import { ConductorService } from "@/shared/services";
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
import ConductorItem from "./ConductorItem";

interface Props {
  conductors?: Conductor[];
  handleFilter: (searchTerm: string) => void;
}

const ConductorList = ({ conductors, handleFilter }: Props) => {
  const { mutate } = useSWRConfig();
  const { setCurrentConductor } = useContext(AppContext);

  const handleDelete = async (id: number) => {
    try {
      await ConductorService().remove(id);
      toast.success("Condutor removido com sucesso.");
      mutate("/v1/condutor");
    } catch (error) {
      toast.error("Erro ao remover o condutor.");
    }
  };

  return (
    <div>
      <div className={styles.listHeader}>
        <h1 className={styles.title}>Lista de Condutores</h1>

        <div>
          <TextField
            id="standard-basic"
            label="Filtrar por Nome ou CNH"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => handleFilter(e.target.value.toLowerCase())}
          />
        </div>
      </div>

      {conductors?.length ? (
        <TableContainer component={Paper} className={styles.table}>
          <Table aria-label="lista de clientes">
            <TableHead>
              <TableRow>
                <TableCell align="center">Nº</TableCell>
                <TableCell align="center">Nome</TableCell>
                <TableCell align="center">CNH</TableCell>
                <TableCell align="center">Categoria</TableCell>
                <TableCell align="center">Vencimento</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {conductors?.map((conductor, index) => (
                <ConductorItem
                  {...conductor}
                  index={index + 1}
                  key={conductor.id}
                  onDelete={handleDelete}
                  onEdit={() => setCurrentConductor(conductor)}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>Nenhum conductor encontrado!</p>
      )}
    </div>
  );
};

export default ConductorList;
