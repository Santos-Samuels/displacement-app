import { AppContext } from "@/context";
import { Vehicle } from "@/shared/interfaces/vehicle.interface";
import {
  CircularProgress,
  IconButton,
  TableCell,
  TableRow,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useContext, useState } from "react";

interface Props extends Vehicle {
  index: number;
  onDelete: (id: number) => Promise<void>;
  onEdit: () => void;
}

const VehicleItem = ({
  id,
  placa,
  marcaModelo,
  anoFabricacao,
  kmAtual,
  index,
  onDelete,
  onEdit,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentVehicle } = useContext(AppContext);

  const handleDelete = async () => {
    setIsLoading(true);
    await onDelete(id);
    setIsLoading(false);
  };

  return (
    <TableRow
      key={id}
      selected={currentVehicle && currentVehicle.id === id ? true : false}
    >
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

        <IconButton aria-label="edit" onClick={onEdit} disabled={isLoading}>
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

export default VehicleItem;
