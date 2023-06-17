import { ConductorCreateInput } from "@/shared/interfaces/conductor.interface";
import { ConductorService } from "@/shared/services";
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
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";
import styles from "../styles.module.css";

const ConductorForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ConductorCreateInput>({
    defaultValues: { categoriaHabilitacao: "" },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const { mutate } = useSWRConfig();

  const onSubmit: SubmitHandler<ConductorCreateInput> = async (data) => {
    setIsLoading(true);
    try {
      const vencimentoHabilitacao = new Date(
        data.vencimentoHabilitacao
      ).toISOString();

      await ConductorService().create({ ...data, vencimentoHabilitacao });
      toast.success("Condutor adicionado com sucesso.");
      reset();
      mutate("/v1/condutor");
    } catch (error) {
      toast.error("Erro ao adicionar o condutor.");
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.form}>
      <Grid container justifyContent="space-between" alignItems="center">
        <h1 className={styles.title}>Adicionar Condutor</h1>
        <IconButton
          aria-label="delete"
          onClick={() => setOpen(!open)}
          size="medium"
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
          <Grid container spacing={2} alignItems="flex-start">
            <Grid item xs={12}>
              <TextField
                color={errors.nome ? "secondary" : "primary"}
                label="Nome *"
                type="text"
                size="small"
                fullWidth
                {...register("nome", { required: "Informe o Nome" })}
              />
              {errors.nome && (
                <span className={styles.errorMessage}>
                  {errors.nome?.message}
                </span>
              )}
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                color={errors.numeroHabilitacao ? "secondary" : "primary"}
                label="CNH *"
                type="number"
                size="small"
                fullWidth
                {...register("numeroHabilitacao", {
                  required: "Informe a CNH",
                })}
              />
              {errors.numeroHabilitacao && (
                <span className={styles.errorMessage}>
                  {errors.numeroHabilitacao?.message}
                </span>
              )}
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel id="document-type-label">Categoria *</InputLabel>
                <Select
                  color={
                    errors.categoriaHabilitacao &&
                    !watch("categoriaHabilitacao")
                      ? "secondary"
                      : "primary"
                  }
                  labelId="document-type-label"
                  id="document-type"
                  value={watch("categoriaHabilitacao")}
                  fullWidth
                  {...register("categoriaHabilitacao", {
                    required: "Informe a Categoria",
                  })}
                >
                  <MenuItem value="" />
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="AB">AB</MenuItem>
                  <MenuItem value="C">C</MenuItem>
                  <MenuItem value="D">D</MenuItem>
                  <MenuItem value="E">E</MenuItem>
                </Select>
              </FormControl>
              {errors.categoriaHabilitacao &&
                !watch("categoriaHabilitacao") && (
                  <span className={styles.errorMessage}>
                    {errors.categoriaHabilitacao?.message}
                  </span>
                )}
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                color={errors.vencimentoHabilitacao ? "secondary" : "primary"}
                label="Vencimento *"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("vencimentoHabilitacao", {
                  required: "Informe o Vencimento",
                })}
              />
              {errors.vencimentoHabilitacao && (
                <span className={styles.errorMessage}>
                  {errors.vencimentoHabilitacao?.message}
                </span>
              )}
            </Grid>

            <Grid item xs={12} md={3}>
              <Button
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

export default ConductorForm;
