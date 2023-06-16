import { Customer } from "@/shared/interfaces/customer.interface";
import { CustomerService } from "@/shared/services";
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
import CustomerItem from "./CustomerItem";

interface Props {
  customers?: Customer[];
}

const CustomerList = ({ customers }: Props) => {
  const { mutate } = useSWRConfig();

  const handleDelete = async (id: number) => {
    try {
      await CustomerService().remove(id);
      toast.success("Cliente removido com sucesso.");
      mutate("/v1/cliente");
    } catch (error) {
      toast.error("Erro ao remover o cliente.");
    }
  };

  return (
    <div>
      <h1>Lista de Clientes</h1>

      {customers?.length ? (
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
              {customers.map((customer, index) => (
                <CustomerItem
                  index={index + 1}
                  onDelete={handleDelete}
                  {...customer}
                  key={customer.id}
                />
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
