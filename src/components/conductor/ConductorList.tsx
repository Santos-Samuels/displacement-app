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
} from "@material-ui/core";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";
import ConductorItem from "./ConductorItem";

interface Props {
  conductors?: Conductor[];
}

const ConductorList = ({ conductors }: Props) => {
  const { mutate } = useSWRConfig();

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
      <h1>Lista de Condutores</h1>

      {conductors?.length ? (
        <TableContainer component={Paper}>
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
              {conductors.map((conductor, index) => (
                <ConductorItem
                  {...conductor}
                  index={index + 1}
                  key={conductor.id}
                  onDelete={handleDelete}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>Não há condutores cadastrados</p>
      )}
    </div>
  );
};

export default ConductorList;
