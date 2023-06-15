import { Costumer, CostumerCreateInput } from "../interfaces/customer.interface";
import api from "./api";

const CostumerService = () => {
  async function create(input: CostumerCreateInput) {
    return api.post('/v1/cliente', input);
  }

  async function update(input: Costumer) {
    return api.put(`/v1/cliente/${input.id}`, input);
  }

  async function remove(id: string) {
    return api.delete(`/v1/cliente/${id}`);
  }

  async function getById(id: string) {
    return api.get<Costumer>(`/v1/cliente/${id}`);
  }

  async function getAll() {
    return api.get<Costumer[]>('/v1/cliente');
  }

  return {
    create,
    update,
    remove,
    getById,
    getAll,
  };
}

export default CostumerService;