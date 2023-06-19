import { AppProvider } from "@context/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles.module.css";
import SideMenu from "./SideMenu";
interface Props {
  children: NonNullable<React.ReactNode>;
  hasError?: boolean;
  title?: string;
}

const AppContainer = ({ children, hasError, title }: Props) => {
  if (hasError) {
    return <p>Ocorreu um erro ao carregar os dados</p>;
  }

  return (
    <main className={styles.appContainer}>
      <SideMenu title={title} />
      <div className={styles.appContent}>
        <AppProvider>
          {children}
          <ToastContainer position="top-right" autoClose={5000} />
        </AppProvider>
      </div>
    </main>
  );
};

export default AppContainer;
