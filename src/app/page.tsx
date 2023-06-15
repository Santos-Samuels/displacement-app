"use client";
import DisplacementList from "@/components/displacment/DisplacementList";
import ConductorList from "@components/conductor/ConductorList";
import CustomerList from "@components/customer/CustomerList";
import VehicleList from "@components/vehicle/VehicleList";

export default function Home() {
  return (
    <main>
      <CustomerList />
      <VehicleList />
      <ConductorList />
      <DisplacementList />
    </main>
  );
}
