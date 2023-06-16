import { Displacement } from "@/shared/interfaces/displacement.interface";
import { formatInterval } from "@/shared/utils/calculateInterval";
import {
  CircularProgress,
  IconButton,
  TableCell,
  TableRow,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useState } from "react";

interface Props extends Displacement {
  index: number;
  onDelete: (id: number) => Promise<void>;
}

const DisplacementItem = ({
  id,
  checkList,
  fimDeslocamento,
  inicioDeslocamento,
  kmFinal,
  kmInicial,
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
      <TableCell align="center">
        {kmFinal - kmInicial}
      </TableCell>
      <TableCell align="center">
        {formatInterval(
          new Date(inicioDeslocamento),
          new Date(fimDeslocamento)
        )}
      </TableCell>
      <TableCell align="center">{checkList}</TableCell>
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

export default DisplacementItem;
