import { Customer } from "@/shared/interfaces/customer.interface";
import CostumerService from "@/shared/services/customer.service";
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

const CustomerList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const { data } = await CostumerService().getAll();
      setCustomers(data);
    };

    fetchCustomers();
  }, []);

  return (
    <div>
      <h1>Lista de Clientes</h1>

      {customers.length ? (
        <TableContainer component={Paper}>
          <Table aria-label="lista de clientes">
            <TableHead>
              <TableRow>
                <TableCell align="center">Nº</TableCell>
                <TableCell align="center">Nome</TableCell>
                <TableCell align="center">Documento</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell align="center">{customer.id}</TableCell>
                  <TableCell align="center">{customer.nome}</TableCell>
                  <TableCell align="center">
                    {customer.numeroDocumento}
                  </TableCell>
                  <TableCell align="center">-</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>Não há clientes cadastrados</p>
      )}
    </div>
  );
};

export default CustomerList;
