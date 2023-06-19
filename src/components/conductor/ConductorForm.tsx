import { AppContext } from "@/context";
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
import { useContext, useEffect, useState } from "react";
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
    setValue,
    setError,
    clearErrors,
    setFocus,
  } = useForm<ConductorCreateInput>({
    defaultValues: { categoriaHabilitacao: "" },
  });
  const [isLoading, setIsLoading] = useState(false);
  const { currentConductor, setCurrentConductor } = useContext(AppContext);
  const [open, setOpen] = useState(false);
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

  const onUpdate: SubmitHandler<ConductorCreateInput> = async (data) => {
    if (!validateEditDate(data.vencimentoHabilitacao)) {
      setFocus("vencimentoHabilitacao");
      return;
    }

    setIsLoading(true);
    try {
      const vencimentoHabilitacao = new Date(
        data.vencimentoHabilitacao
      ).toISOString();

      await ConductorService().update({
        id: currentConductor!.id,
        categoriaHabilitacao: data.categoriaHabilitacao,
        vencimentoHabilitacao,
      });

      toast.success("Condutor atualizado com sucesso.");
      resetForm();
      mutate("/v1/condutor");
    } catch (error) {
      toast.error("Erro ao atualizar o condutor.");
    }
    setIsLoading(false);
  };

  const resetForm = () => {
    reset();
    setCurrentConductor(undefined);
  };

  const validateEditDate = (value: string) => {
    if (!currentConductor) return;

    const oldDate = new Date(currentConductor?.vencimentoHabilitacao).getTime();
    const newDate = new Date(value).getTime();

    if (newDate > oldDate) {
      clearErrors("vencimentoHabilitacao");
      return true;
    }
    
    setError("vencimentoHabilitacao", {
      type: "required",
      message: "A data de vencimento deve ser maior que a atual.",
    });

    return false;
  };

  useEffect(() => {
    if (currentConductor) {
      Object.entries(currentConductor).forEach(([key, value]) => {
        if (key === "catergoriaHabilitacao") {
          setValue("categoriaHabilitacao", value);
          return;
        }

        if (key === "vencimentoHabilitacao") {
          setValue(key, new Date(value).toISOString().split("T")[0]);
          return;
        }
        setValue(key as keyof ConductorCreateInput, value);
      });
    }
  }, [currentConductor]);

  return (
    <div className={styles.form}>
      <Grid container justifyContent="space-between" alignItems="center" onClick={() => setOpen(!open)}>
        <h1 className={styles.title}>Adicionar Condutor</h1>
        <IconButton
          aria-label="delete"
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
        <form onSubmit={handleSubmit(currentConductor ? onUpdate : onSubmit)}>
          <Grid container spacing={2} alignItems="flex-start">
            {!currentConductor && (
              <>
                <Grid item xs={12} md={9}>
                  <TextField
                    color={errors.nome ? "secondary" : "primary"}
                    label="Nome *"
                    type="text"
                    size="small"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
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
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("numeroHabilitacao", {
                      required: "Informe a CNH",
                      validate: (value) =>
                        validateEditDate(value),
                    })}
                  />
                  {errors.numeroHabilitacao && (
                    <span className={styles.errorMessage}>
                      {errors.numeroHabilitacao?.message}
                    </span>
                  )}
                </Grid>
              </>
            )}

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
                  onChange: (e) => {
                    validateEditDate(e.target.value);
                  },
                })}
              />
              {errors.vencimentoHabilitacao && (
                <span className={styles.errorMessage}>
                  {errors.vencimentoHabilitacao?.message}
                </span>
              )}
            </Grid>

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
                {currentConductor ? "Atualizar" : "Adicionar"}
              </Button>
            </Grid>
            {/* <Grid container spacing={2} justifyContent="flex-end">
          </Grid> */}
          </Grid>
        </form>
      </Collapse>
    </div>
  );
};

export default ConductorForm;
