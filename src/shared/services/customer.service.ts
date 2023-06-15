import { Customer, CustomerCreateInput } from "../interfaces/customer.interface";
import api from "./api";

const CustomerService = () => {
  async function create(input: CustomerCreateInput) {
    return api.post('/v1/cliente', input);
  }

  async function update(input: Customer) {
    return api.put(`/v1/cliente/${input.id}`, input);
  }

  async function remove(id: string) {
    return api.delete(`/v1/cliente/${id}`);
  }

  async function getById(id: string) {
    return api.get<Customer>(`/v1/cliente/${id}`);
  }

  async function getAll() {
    return api.get<Customer[]>('/v1/cliente');
  }

  return {
    create,
    update,
    remove,
    getById,
    getAll,
  };
}

export default CustomerService;