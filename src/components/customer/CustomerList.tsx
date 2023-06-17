import { AppContext } from "@/context";
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
import { useContext } from "react";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";
import styles from "../styles.module.css";
import CustomerItem from "./CustomerItem";

interface Props {
  customers?: Customer[];
}

const CustomerList = ({ customers }: Props) => {
  const { mutate } = useSWRConfig();
  const { setCurrentCustomer } = useContext(AppContext);

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
      <h1 className={styles.title}>Lista de Clientes</h1>

      {customers?.length ? (
        <TableContainer className={styles.table} component={Paper}>
          <Table aria-label="lista de clientes">
            <TableHead>
              <TableRow>
                <TableCell align="center">Nº</TableCell>
                <TableCell align="center">Nome</TableCell>
                <TableCell align="center">Documento</TableCell>
                <TableCell align="center">Tipo</TableCell>
                <TableCell align="center">Cidade</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer, index) => (
                <CustomerItem
                  index={index + 1}
                  onDelete={handleDelete}
                  onEdit={() => setCurrentCustomer(customer)}
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
