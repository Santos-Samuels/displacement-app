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
import { useEffect, useState } from "react";

const ConductorList = () => {
  const [conductors, setConductors] = useState<Conductor[]>([]);

  useEffect(() => {
    const fetchConductors = async () => {
      const { data } = await ConductorService().getAll();
      setConductors(data);
    };

    fetchConductors();
  }, []);

  return (
    <div>
      <h1>Lista de Condutores</h1>

      {conductors.length ? (
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
                <TableRow key={conductor.id}>
                  <TableCell align="center">{index}</TableCell>
                  <TableCell align="center">{conductor.nome}</TableCell>
                  <TableCell align="center">
                    {conductor.numeroHabilitacao}
                  </TableCell>
                  <TableCell align="center">
                    {conductor.catergoriaHabilitacao}
                  </TableCell>
                  <TableCell align="center">
                    {new Date(
                      conductor.vencimentoHabilitacao
                    ).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">-</TableCell>
                </TableRow>
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
