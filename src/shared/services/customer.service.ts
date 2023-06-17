import {
  Customer,
  CustomerCreateInput,
  CustomerUpdateInput
} from "../interfaces/customer.interface";
import api from "./api";

const CustomerService = () => {
  async function create(input: CustomerCreateInput) {
    return api.post("/v1/cliente", input);
  }

  async function update(input: CustomerUpdateInput) {
    return api.put(`/v1/cliente/${input.id}`, input);
  }

  async function remove(id: number) {
    return api.delete(`/v1/cliente/${id}`, { data: { id } });
  }

  async function getById(id: number) {
    return api.get<Customer>(`/v1/cliente/${id}`);
  }

  async function getAll() {
    return api.get<Customer[]>("/v1/cliente");
  }

  return {
    create,
    update,
    remove,
    getById,
    getAll,
  };
};

export default CustomerService;
