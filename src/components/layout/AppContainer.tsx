import { AppProvider } from "@context/index";
import { Container } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles.module.css";
import SideMenu from "./SideMenu";
interface Props {
  children: NonNullable<React.ReactNode>;
  isLoading?: boolean;
  hasError?: boolean;
  title?: string;
}

const AppContainer = ({ children, isLoading, hasError, title }: Props) => {
  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (hasError) {
    return <p>Ocorreu um erro ao carregar os dados</p>;
  }

  return (
    <main className={styles.appContainer}>
      <SideMenu title={title} />
      <Container className={styles.appContent}>
        <AppProvider>
          {children}
          <ToastContainer position="top-right" autoClose={5000} />
        </AppProvider>
      </Container>
    </main>
  );
};

export default AppContainer;
