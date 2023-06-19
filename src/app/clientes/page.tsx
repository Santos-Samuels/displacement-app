"use client";
import { AppContainer, CustomerForm, CustomerList } from "@/components";
import { Customer } from "@/shared/interfaces/customer.interface";
import { CustomerService } from "@/shared/services";
import { useState } from "react";
import useSWR from "swr";

const CustomerPage = () => {
  const { data, error } = useSWR("/v1/cliente", fetchCustomers);
  const [filteredItems, setFilteredItems] = useState<Customer[]>();

  const handleFilter = (searchTerm: string) => {
    if (!searchTerm) {
      setFilteredItems(undefined);
      return;
    }

    const filteredItems = data?.filter((customer) => {
      return (
        customer.nome.toLowerCase().includes(searchTerm) ||
        customer.numeroDocumento.toLowerCase().includes(searchTerm)
      );
    });

    setFilteredItems(filteredItems);
  };

  return (
    <AppContainer hasError={error} title="Clientes">
      <CustomerForm />
      <CustomerList customers={filteredItems ?? data} handleFilter={handleFilter} />
    </AppContainer>
  );
};

export default CustomerPage;

const fetchCustomers = async () => {
  const { data } = await CustomerService().getAll();
  return data;
};
