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

  const handleFormatInterval = () => {
    const now = new Date().toISOString();

    if (!fimDeslocamento)
      return formatInterval(new Date(inicioDeslocamento), new Date(now));

    return formatInterval(
      new Date(inicioDeslocamento),
      new Date(fimDeslocamento)
    );
  };

  const calculateDistance = () => {
    if (!fimDeslocamento) return "-";

    return kmFinal - kmInicial;
  };

  const getStatus = () => {
    if (!fimDeslocamento) return "Em andamento";

    return "Finalizado";
  };

  return (
    <TableRow key={id}>
      <TableCell align="center">{index}</TableCell>
      <TableCell align="center">{calculateDistance()}</TableCell>
      <TableCell align="center">{handleFormatInterval()}</TableCell>
      <TableCell align="center">{getStatus()}</TableCell>
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
