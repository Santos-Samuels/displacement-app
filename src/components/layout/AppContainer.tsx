import { AppProvider } from "@context/index";
import { Container } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  children: NonNullable<React.ReactNode>;
  isLoading?: boolean;
  hasError?: boolean;
}

const AppContainer = ({ children, isLoading, hasError }: Props) => {
  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (hasError) {
    return <p>Ocorreu um erro ao carregar os dados</p>;
  }

  return (
    <Container>
      <AppProvider>
        <ToastContainer position="top-right" autoClose={5000} />
        {children}
      </AppProvider>
    </Container>
  );
};

export default AppContainer;
