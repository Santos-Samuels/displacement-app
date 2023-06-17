import { VehicleCreateInput } from "@/shared/interfaces/vehicle.interface";
import { VehicleService } from "@/shared/services";
import {
  Button,
  Collapse,
  Grid,
  IconButton,
  TextField
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";
import styles from "../styles.module.css";

const VehicleForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<VehicleCreateInput>();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const { mutate } = useSWRConfig();

  const onSubmit: SubmitHandler<VehicleCreateInput> = async (data) => {
    setIsLoading(true);
    try {
      await VehicleService().create(data);
      toast.success("Veículo adicionado com sucesso.");
      reset();
      mutate("/v1/veiculo");
    } catch (error) {
      toast.error("Erro ao adicionar o veículo.");
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.form}>
      <Grid container justifyContent="space-between" alignItems="center">
        <h1 className={styles.title}>Adicionar Veículo</h1>

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            spacing={2}
            alignItems="flex-start"
            justifyContent="center"
          >
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                color={errors.placa ? "secondary" : "primary"}
                label="Placa *"
                type="text"
                size="small"
                fullWidth
                {...register("placa", { required: "Informe a Placa" })}
              />
              {errors.placa && (
                <span className={styles.errorMessage}>
                  {errors.placa?.message}
                </span>
              )}
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                color={errors.marcaModelo ? "secondary" : "primary"}
                label="Marca/Modelo *"
                type="text"
                size="small"
                fullWidth
                {...register("marcaModelo", {
                  required: "Informe a Marca/Modelo",
                })}
              />
              {errors.marcaModelo && (
                <span className={styles.errorMessage}>
                  {errors.marcaModelo?.message}
                </span>
              )}
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                color={errors.anoFabricacao ? "secondary" : "primary"}
                label="Ano de Fabricação *"
                type="number"
                size="small"
                fullWidth
                {...register("anoFabricacao", {
                  required: "Informe a Ano de Fabricação",
                })}
              />
              {errors.anoFabricacao && (
                <span className={styles.errorMessage}>
                  {errors.anoFabricacao?.message}
                </span>
              )}
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                color={errors.kmAtual ? "secondary" : "primary"}
                label="Km Atual *"
                type="number"
                size="small"
                fullWidth
                {...register("kmAtual", {
                  required: "Informe a Km Atual",
                })}
              />
              {errors.kmAtual && (
                <span className={styles.errorMessage}>
                  {errors.kmAtual?.message}
                </span>
              )}
            </Grid>
          </Grid>

          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item xs={12} md={3}>
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
                Adicionar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Collapse>
    </div>
  );
};

export default VehicleForm;
