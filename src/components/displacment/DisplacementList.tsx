import { Displacement } from "@/shared/interfaces/displacement.interface";
import { formatInterval } from "@/shared/utils/calculateInterval";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

interface Props {
  displacements?: Displacement[];
}

const DisplacementList = ({ displacements }: Props) => {
  return (
    <div>
      <h1>Lista de Deslocamentos</h1>

      {displacements?.length ? (
        <TableContainer component={Paper}>
          <Table aria-label="lista de clientes">
            <TableHead>
              <TableRow>
                <TableCell align="center">Nº</TableCell>
                <TableCell align="center">Deslocamento</TableCell>
                <TableCell align="center">Tempo</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displacements.map((displacement, index) => (
                <TableRow key={displacement.id}>
                  <TableCell align="center">{index}</TableCell>
                  <TableCell align="center">
                    {displacement.kmFinal - displacement.kmInicial}
                  </TableCell>
                  <TableCell align="center">
                    {formatInterval(
                      new Date(displacement.inicioDeslocamento),
                      new Date(displacement.fimDeslocamento)
                    )}
                  </TableCell>
                  <TableCell align="center">{displacement.checkList}</TableCell>
                  <TableCell align="center">-</TableCell>
                </TableRow>
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
