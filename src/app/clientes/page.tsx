"use client";
import { AppContainer, CustomerForm, CustomerList } from "@/components";
import { CustomerService } from "@/shared/services";
import useSWR from "swr";

const CustomerPage = () => {
  const { data, error } = useSWR("/v1/cliente", fetchCustomers);

  return (
    <AppContainer hasError={error} title="Clientes">
      <CustomerForm />
      <CustomerList customers={data} />
    </AppContainer>
  );
};

export default CustomerPage;

const fetchCustomers = async () => {
  const { data } = await CustomerService().getAll();
  return data;
};
