import { Vehicle } from "@/shared/interfaces/vehicle.interface";
import VehicleService from "@/shared/services/vehicle.service";
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

const VehicleList = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const { data } = await VehicleService().getAll();
      setVehicles(data);
    };

    fetchVehicles();
  }, []);

  return (
    <div>
      <h1>Lista de Veículos</h1>

      {vehicles.length ? (
        <TableContainer component={Paper}>
          <Table aria-label="lista de clientes">
            <TableHead>
              <TableRow>
                <TableCell align="center">Nº</TableCell>
                <TableCell align="center">Placa</TableCell>
                <TableCell align="center">Marca/Modelo</TableCell>
                <TableCell align="center">Ano</TableCell>
                <TableCell align="center">Km</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehicles.map((vehicle, index) => (
                <TableRow key={vehicle.id}>
                  <TableCell align="center">{index}</TableCell>
                  <TableCell align="center">{vehicle.placa}</TableCell>
                  <TableCell align="center">
                    {vehicle.marcaModelo}
                  </TableCell>
                  <TableCell align="center">
                    {vehicle.anoFabricacao}
                  </TableCell>
                  <TableCell align="center">
                    {vehicle.kmAtual}
                  </TableCell>
                  <TableCell align="center">
                    -
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>Não há veículos cadastrados</p>
      )}
    </div>
  );
};

export default VehicleList;
