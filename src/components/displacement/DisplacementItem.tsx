import { useEntities } from "@/hooks/useEntities";
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
  fimDeslocamento,
  inicioDeslocamento,
  kmFinal,
  kmInicial,
  idVeiculo,
  idCondutor,
  idCliente,
  index,
  onDelete,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { entities } = useEntities([]);

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

  const getVehicle = () => {
    const vehicle = entities.vehicles.find((vehicle) => vehicle.id === idVeiculo)
    return vehicle?.placa || "-";
  };

  const getConductor = () => {
    const conductor = entities.conductors.find(
      (conductor) => conductor.id === idCondutor
    );

    const conductorName = conductor?.nome.split(" ")[0];
    return conductorName || "-";
  };

  const getCustomer = () => {
    const customer = entities.customers.find(
      (customer) => customer.id === idCliente
    );

    const customerDocument = `${customer?.tipoDocumento} ${customer?.numeroDocumento}`
    return customerDocument || "-";
  };

  return (
    <TableRow key={id}>
      <TableCell align="center">{index}</TableCell>
      <TableCell align="center">{calculateDistance()}</TableCell>
      <TableCell align="center">{handleFormatInterval()}</TableCell>
      <TableCell align="center">{getStatus()}</TableCell>
      <TableCell align="center">{getVehicle()}</TableCell>
      <TableCell align="center">{getConductor()}</TableCell>
      <TableCell align="center">{getCustomer()}</TableCell>
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
