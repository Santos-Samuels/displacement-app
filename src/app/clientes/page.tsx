"use client";
import { AppContainer, CustomerList } from "@/components";
import { CustomerService } from "@/shared/services";
import useSWR from "swr";

const CustomerPage = () => {
  const { data, error, isLoading } = useSWR("/v1/cliente", fetchCustomers);

  return (
    <AppContainer isLoading={isLoading} hasError={error}>
      <CustomerList customers={data} />
    </AppContainer>
  );
};

export default CustomerPage;

const fetchCustomers = async () => {
  const { data } = await CustomerService().getAll();
  return data;
};