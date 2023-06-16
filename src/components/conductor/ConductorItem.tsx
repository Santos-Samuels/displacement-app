import { Conductor } from "@/shared/interfaces/conductor.interface";
import {
  CircularProgress,
  IconButton,
  TableCell,
  TableRow,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useState } from "react";

interface Props extends Conductor {
  index: number;
  onDelete: (id: number) => Promise<void>;
}

const ConductorItem = ({
  id,
  nome,
  catergoriaHabilitacao,
  numeroHabilitacao,
  vencimentoHabilitacao,
  index,
  onDelete,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    await onDelete(id);
    setIsLoading(false);
  };

  return (
    <TableRow key={id}>
      <TableCell align="center">{index}</TableCell>
      <TableCell align="center">{nome}</TableCell>
      <TableCell align="center">{numeroHabilitacao}</TableCell>
      <TableCell align="center">{catergoriaHabilitacao}</TableCell>
      <TableCell align="center">
        {new Date(vencimentoHabilitacao).toLocaleDateString()}
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
      </TableCell>
    </TableRow>
  );
};

export default ConductorItem;
