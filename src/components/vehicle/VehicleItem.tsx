import { Vehicle } from "@/shared/interfaces/vehicle.interface";
import {
  CircularProgress,
  IconButton,
  TableCell,
  TableRow,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useState } from "react";

interface Props extends Vehicle {
  index: number;
  onDelete: (id: number) => Promise<void>;
}

const VehicleItem = ({
  id,
  placa,
  marcaModelo,
  anoFabricacao,
  kmAtual,
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
      <TableCell align="center">{placa}</TableCell>
      <TableCell align="center">{marcaModelo}</TableCell>
      <TableCell align="center">{anoFabricacao}</TableCell>
      <TableCell align="center">{kmAtual}</TableCell>
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

export default VehicleItem;
