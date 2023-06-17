import { AppContext } from "@/context";
import { Customer } from "@/shared/interfaces/customer.interface";
import {
  CircularProgress,
  IconButton,
  TableCell,
  TableRow,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useContext, useState } from "react";

interface Props extends Customer {
  index: number;
  onDelete: (id: number) => Promise<void>;
  onEdit: () => void;
}

const CustomerItem = ({
  id,
  nome,
  index,
  numeroDocumento,
  tipoDocumento,
  cidade,
  uf,
  onDelete,
  onEdit,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentCustomer } = useContext(AppContext);

  const handleDelete = async () => {
    setIsLoading(true);
    await onDelete(id);
    setIsLoading(false);
  };

  return (
    <TableRow key={id} selected={currentCustomer && currentCustomer.id === id ? true : false}>
      <TableCell align="center">{index}</TableCell>
      <TableCell align="center">{nome}</TableCell>
      <TableCell align="center">{numeroDocumento}</TableCell>
      <TableCell align="center">{tipoDocumento}</TableCell>
      <TableCell align="center">
        {cidade} - {uf}
      </TableCell>
      <TableCell align="center" size="small">
        <IconButton
          aria-label="delete"
          onClick={handleDelete}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={18} />
          ) : (
            <DeleteIcon fontSize="inherit" />
          )}
        </IconButton>

        <IconButton
          aria-label="delete"
          onClick={() => onEdit()}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={18} />
          ) : (
            <EditIcon fontSize="inherit" />
          )}
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default CustomerItem;
