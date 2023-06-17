import { Conductor } from "@/shared/interfaces/conductor.interface";
import { Customer } from "@/shared/interfaces/customer.interface";
import { Displacement } from "@/shared/interfaces/displacement.interface";
import { Vehicle } from "@/shared/interfaces/vehicle.interface";
import { PropsWithChildren, createContext, useState } from "react";

interface AppContextProps {
  currentConductor?: Conductor;
  currentCustomer?: Customer;
  currentDisplacement?: Displacement;
  currentVehicle?: Vehicle;
  
  setCurrentConductor: (conductor?: Conductor) => void;
  setCurrentCustomer: (customer?: Customer) => void;
  setCurrentDisplacement: (displacement?: Displacement) => void;
  setCurrentVehicle: (vehicle?: Vehicle) => void;
}

export const AppContext = createContext({} as AppContextProps)

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentConductor, setCurrentConductor] = useState<Conductor>();
  const [currentCustomer, setCurrentCustomer] = useState<Customer>();
  const [currentDisplacement, setCurrentDisplacement] = useState<Displacement>();
  const [currentVehicle, setCurrentVehicle] = useState<Vehicle>();

  return (
    <AppContext.Provider value={{
      currentConductor,
      currentCustomer,
      currentDisplacement,
      currentVehicle,
      setCurrentConductor,
      setCurrentCustomer,
      setCurrentDisplacement,
      setCurrentVehicle
    }}>
      {children}
    </AppContext.Provider>
  )
}