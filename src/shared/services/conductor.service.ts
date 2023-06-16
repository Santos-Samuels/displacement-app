import {
  Conductor,
  ConductorCreateInput,
  ConductorUpdateInput,
} from "../interfaces/conductor.interface";
import api from "./api";

const ConductorService = () => {
  async function create(input: ConductorCreateInput) {
    return api.post("/v1/condutor", input);
  }

  async function update(input: ConductorUpdateInput) {
    return api.put(`/v1/condutor/${input.id}`, input);
  }

  async function remove(id: number) {
    return api.delete(`/v1/condutor/${id}`, { data: { id } });
  }

  async function getById(id: number) {
    return api.get<Conductor>(`/v1/condutor/${id}`);
  }

  async function getAll() {
    return api.get<Conductor[]>("/v1/condutor");
  }

  return {
    create,
    update,
    remove,
    getById,
    getAll,
  };
};

export default ConductorService;
