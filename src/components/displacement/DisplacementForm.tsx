import { AppContext } from "@/context";
import { useEntities } from "@/hooks/useEntities";
import { DisplacementCreateInput } from "@/shared/interfaces/displacement.interface";
import { DisplacementService } from "@/shared/services";
import {
  Button,
  Collapse,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";
import styles from "../styles.module.css";

const DisplacementForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<DisplacementCreateInput>({
    defaultValues: { idCondutor: 0, idVeiculo: 0, idCliente: 0 },
  });
  const [isLoading, setIsLoading] = useState(false);
  const { currentDisplacement, setCurrentDisplacement } =
    useContext(AppContext);
  console.log(
    "🚀 ~ file: DisplacementForm.tsx:38 ~ DisplacementForm ~ currentDisplacement:",
    currentDisplacement
  );
  const [open, setOpen] = useState(true);
  const { mutate } = useSWRConfig();
  const { entities } = useEntities([]);
  const { conductors, customers, vehicles } = entities;

  const onSubmit: SubmitHandler<DisplacementCreateInput> = async (data) => {
    setIsLoading(true);
    try {
      const observacao = data.observacao || "";

      await DisplacementService().create({
        ...data,
        observacao,
        checkList: "",
        motivo: "",
      });
      toast.success("Deslocamento adicionado com sucesso.");
      reset();
      mutate("/v1/deslocamento");
    } catch (error) {
      toast.error("Erro ao adicionar o deslocamento.");
    }
    setIsLoading(false);
  };

  const onUpdate: SubmitHandler<DisplacementCreateInput> = async (data) => {
    setIsLoading(true);
    try {
      const observacao = data.observacao || "";
      const { kmFinal, fimDeslocamento } = data;

      await DisplacementService().update({
        id: currentDisplacement!.id,
        kmFinal: kmFinal || 0,
        fimDeslocamento: fimDeslocamento || new Date().toISOString(),
        observacao,
      });
      toast.success("Deslocamento encerrado com sucesso.");
      resetForm();
      mutate("/v1/deslocamento");
    } catch (error) {
      toast.error("Erro ao encerrar o deslocamento.");
    }
    setIsLoading(false);
  };

  const resetForm = () => {
    reset();
    setCurrentDisplacement(undefined);
  };

  const formatDate = (value?: string) => {
    let date: Date;
    value ? (date = new Date(value)) : (date = new Date());

    const formatedDate = date.toISOString().split(".")[0].split(":");
    formatedDate.pop();

    return formatedDate.join(":");
  };

  useEffect(() => {
    if (currentDisplacement) {
      Object.entries(currentDisplacement).forEach(([key, value]) => {
        if (key === "fimDeslocamento") return setValue(key, formatDate(value));

        setValue(key as keyof DisplacementCreateInput, value);
      });
    }
  }, [currentDisplacement]);

  return (
    <div className={styles.form}>
      <Grid container justifyContent="space-between" alignItems="center">
        <h1 className={styles.title}>
          {currentDisplacement
            ? "Encerrar Deslocamento"
            : "Adicionar Deslocamento"}
        </h1>

        <IconButton
          aria-label="delete"
          onClick={() => setOpen(!open)}
          size="small"
        >
          {open ? (
            <KeyboardArrowUpIcon fontSize="large" />
          ) : (
            <KeyboardArrowDownIcon fontSize="large" />
          )}
        </IconButton>
      </Grid>

      <Collapse in={open}>
        <form onSubmit={handleSubmit(currentDisplacement ? onUpdate : onSubmit)}>
          <Grid
            container
            spacing={2}
            alignItems="flex-start"
            justifyContent="center"
          >
            {currentDisplacement ? (
              <>
                <Grid item xs={12} sm={4} md={2}>
                  <TextField
                    color={errors.kmFinal ? "secondary" : "primary"}
                    label="Km Final *"
                    type="number"
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    {...register("kmFinal", {
                      required: "Informe o Km Final",
                    })}
                  />
                  {errors.kmFinal && (
                    <span className={styles.errorMessage}>
                      {errors.kmFinal?.message}
                    </span>
                  )}
                </Grid>

                <Grid item xs={12} sm={8} md={4}>
                  <TextField
                    color={errors.fimDeslocamento ? "secondary" : "primary"}
                    label="Horário de Fim *"
                    type="datetime-local"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("fimDeslocamento", {
                      required: "Informe o Horário de Fim",
                    })}
                  />
                  {errors.fimDeslocamento && (
                    <span className={styles.errorMessage}>
                      {errors.fimDeslocamento?.message}
                    </span>
                  )}
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} sm={4} md={2}>
                  <TextField
                    color={errors.kmInicial ? "secondary" : "primary"}
                    label="Km Inicial *"
                    type="number"
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    {...register("kmInicial", {
                      required: "Informe o Km Inicial",
                    })}
                  />
                  {errors.kmInicial && (
                    <span className={styles.errorMessage}>
                      {errors.kmInicial?.message}
                    </span>
                  )}
                </Grid>

                <Grid item xs={12} sm={8} md={4}>
                  <TextField
                    color={errors.inicioDeslocamento ? "secondary" : "primary"}
                    label="Horário de Início *"
                    type="datetime-local"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("inicioDeslocamento", {
                      required: "Informe o Horário de Início",
                    })}
                  />
                  {errors.inicioDeslocamento && (
                    <span className={styles.errorMessage}>
                      {errors.inicioDeslocamento?.message}
                    </span>
                  )}
                </Grid>
              </>
            )}

            <Grid item xs={12} md={6}>
              <TextField
                color={errors.observacao ? "secondary" : "primary"}
                label="Observação"
                type="text"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                {...register("observacao")}
              />
              {errors.observacao && (
                <span className={styles.errorMessage}>
                  {errors.observacao?.message}
                </span>
              )}
            </Grid>

            {!currentDisplacement && (
              <>
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="document-type-label">Condutor *</InputLabel>
                    <Select
                      color={
                        errors.idCondutor && !watch("idCondutor")
                          ? "secondary"
                          : "primary"
                      }
                      labelId="document-type-label"
                      id="document-type"
                      value={watch("idCondutor")}
                      fullWidth
                      {...register("idCondutor", {
                        required: "Informe o Condutor",
                      })}
                    >
                      <MenuItem value="" />
                      {conductors.map((conductor) => (
                        <MenuItem key={conductor.id} value={conductor.id}>
                          {conductor.nome}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {errors.idCondutor && !watch("idCondutor") && (
                    <span className={styles.errorMessage}>
                      {errors.idCondutor?.message}
                    </span>
                  )}
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="document-type-label">Veículo *</InputLabel>
                    <Select
                      color={
                        errors.idVeiculo && !watch("idVeiculo")
                          ? "secondary"
                          : "primary"
                      }
                      labelId="document-type-label"
                      id="document-type"
                      value={watch("idVeiculo")}
                      fullWidth
                      {...register("idVeiculo", {
                        required: "Informe o Veículo",
                      })}
                    >
                      <MenuItem value="" />
                      {vehicles.map((vehicle) => (
                        <MenuItem key={vehicle.id} value={vehicle.id}>
                          {vehicle.placa}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {errors.idVeiculo && !watch("idVeiculo") && (
                    <span className={styles.errorMessage}>
                      {errors.idVeiculo?.message}
                    </span>
                  )}
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="document-type-label">Cliente *</InputLabel>
                    <Select
                      color={
                        errors.idCliente && !watch("idCliente")
                          ? "secondary"
                          : "primary"
                      }
                      labelId="document-type-label"
                      id="document-type"
                      value={watch("idCliente")}
                      fullWidth
                      {...register("idCliente", {
                        required: "Informe o Cliente",
                      })}
                    >
                      <MenuItem value="" />
                      {customers.map((customer) => (
                        <MenuItem key={customer.id} value={customer.id}>
                          {`${customer.nome.split(" ")[0]} - ${
                            customer.numeroDocumento
                          } (${customer.tipoDocumento})`}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {errors.idCliente && !watch("idCliente") && (
                    <span className={styles.errorMessage}>
                      {errors.idCliente?.message}
                    </span>
                  )}
                </Grid>
              </>
            )}
          </Grid>

          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item xs={12} sm={6} md={3}>
              <Button
                className={styles.button}
                variant="contained"
                type="button"
                size="large"
                onClick={resetForm}
                fullWidth
                disabled={isLoading}
              >
                Limpar
              </Button>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Button
                className={styles.button}
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                disabled={isLoading}
                startIcon={<AddIcon />}
              >
                {currentDisplacement ? "Encerrar" : "Adicionar"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Collapse>
    </div>
  );
};

export default DisplacementForm;
