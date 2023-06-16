import {
  Displacement,
  DisplacementCreateInput,
  DisplacementUpdateInput,
} from "../interfaces/displacement.interface";
import api from "./api";

const DisplacementService = () => {
  async function create(input: DisplacementCreateInput) {
    return api.post("/v1/deslocamento/iniciardeslocamento", input);
  }

  async function update(input: DisplacementUpdateInput) {
    return api.put(`/v1/deslocamento/encerrardeslocamento/${input.id}`, input);
  }

  async function remove(id: number) {
    return api.delete(`/v1/deslocamento/${id}`, { data: { id } });
  }

  async function getById(id: number) {
    return api.get<Displacement>(`/v1/deslocamento/${id}`);
  }

  async function getAll() {
    return api.get<Displacement[]>("/v1/deslocamento");
  }

  return {
    create,
    update,
    remove,
    getById,
    getAll,
  };
};

export default DisplacementService;
