import { CustomerCreateInput } from "@/shared/interfaces/customer.interface";
import { CustomerService } from "@/shared/services";
import {
  Button,
  Collapse,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
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

const CustomerForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CustomerCreateInput>({
    defaultValues: { tipoDocumento: "" },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const { mutate } = useSWRConfig();

  const onSubmit: SubmitHandler<CustomerCreateInput> = async (data) => {
    setIsLoading(true);
    try {
      await CustomerService().create(data);
      toast.success("Cliente adicionado com sucesso.");
      reset();
      mutate("/v1/cliente");
    } catch (error) {
      toast.error("Erro ao adicionar o cliente.");
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.form}>
      <Grid container justifyContent="space-between" alignItems="center">
        <h1 className={styles.title}>Adicionar Cliente</h1>

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

            <Grid item xs={12} sm={6}>
              <TextField
                color={errors.numeroDocumento ? "secondary" : "primary"}
                label="Documento *"
                type="number"
                size="small"
                fullWidth
                {...register("numeroDocumento", {
                  required: "Informe o Documento",
                })}
              />
              {errors.numeroDocumento && (
                <span className={styles.errorMessage}>
                  {errors.numeroDocumento?.message}
                </span>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="document-type-label">
                  Tipo de Documento *
                </InputLabel>
                <Select
                  color={
                    errors.tipoDocumento && !watch("tipoDocumento")
                      ? "secondary"
                      : "primary"
                  }
                  labelId="document-type-label"
                  id="document-type"
                  value={watch("tipoDocumento")}
                  fullWidth
                  {...register("tipoDocumento", {
                    required: "Informe o Tipo de Documento",
                  })}
                >
                  <MenuItem value="" />
                  <MenuItem value="RG">RG</MenuItem>
                  <MenuItem value="CPF">CPF</MenuItem>
                  <MenuItem value="CNPJ">CNPJ</MenuItem>
                </Select>
              </FormControl>
              {errors.tipoDocumento && !watch("tipoDocumento") && (
                <span className={styles.errorMessage}>
                  {errors.tipoDocumento?.message}
                </span>
              )}
            </Grid>

            <div className={styles.formSection}>
              <h2 className={styles.subTitle}>Endereço</h2>

              <Grid container spacing={2} alignItems="flex-start">
                <Grid item xs={12} sm={10} md={6}>
                  <TextField
                    color={errors.logradouro ? "secondary" : "primary"}
                    label="Rua *"
                    type="text"
                    fullWidth
                    {...register("logradouro", {
                      required: "Informe a Rua",
                    })}
                  />
                  {errors.logradouro && (
                    <span className={styles.errorMessage}>
                      {errors.logradouro?.message}
                    </span>
                  )}
                </Grid>

                <Grid item xs={12} sm={2} md={2}>
                  <TextField
                    color={errors.numero ? "secondary" : "primary"}
                    label="Nº *"
                    type="text"
                    fullWidth
                    {...register("numero", {
                      required: "Informe o Número",
                    })}
                  />
                  {errors.numero && (
                    <span className={styles.errorMessage}>
                      {errors.numero?.message}
                    </span>
                  )}
                </Grid>

                <Grid item xs={12} sm={5} md={4}>
                  <TextField
                    color={errors.bairro ? "secondary" : "primary"}
                    label="Bairro *"
                    type="text"
                    fullWidth
                    {...register("bairro", {
                      required: "Informe o Bairro",
                    })}
                  />
                  {errors.bairro && (
                    <span className={styles.errorMessage}>
                      {errors.bairro?.message}
                    </span>
                  )}
                </Grid>

                <Grid item xs={12} sm={5} md={6}>
                  <TextField
                    color={errors.cidade ? "secondary" : "primary"}
                    label="Cidade *"
                    type="text"
                    fullWidth
                    {...register("cidade", {
                      required: "Informe a Cidade",
                    })}
                  />
                  {errors.cidade && (
                    <span className={styles.errorMessage}>
                      {errors.cidade?.message}
                    </span>
                  )}
                </Grid>

                <Grid item xs={12} sm={2} md={2}>
                  <TextField
                    color={errors.uf ? "secondary" : "primary"}
                    label="UF *"
                    type="text"
                    fullWidth
                    {...register("uf", {
                      required: "Informe a UF",
                    })}
                  />
                  {errors.uf && (
                    <span className={styles.errorMessage}>
                      {errors.uf?.message}
                    </span>
                  )}
                </Grid>
              </Grid>
            </div>
          </Grid>

          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item xs={12} md={4}>
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

export default CustomerForm;
