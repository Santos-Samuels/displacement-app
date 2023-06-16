import { Vehicle, VehicleCreateInput, VehicleUpdateInput } from "../interfaces/vehicle.interface";
import api from "./api";

const VehicleService = () => {
  async function create(input: VehicleCreateInput) {
    return api.post("/v1/veiculo", input);
  }

  async function update(input: VehicleUpdateInput) {
    return api.put(`/v1/veiculo/${input.id}`, input);
  }

  async function remove(id: number) {
    return api.delete(`/v1/veiculo/${id}`, { data: { id } });
  }

  async function getById(id: number) {
    return api.get<Vehicle>(`/v1/veiculo/${id}`);
  }

  async function getAll() {
    return api.get<Vehicle[]>("/v1/veiculo");
  }

  return {
    create,
    update,
    remove,
    getById,
    getAll,
  };
};

export default VehicleService;
