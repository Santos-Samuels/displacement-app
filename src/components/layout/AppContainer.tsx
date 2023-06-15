import { Container } from "@material-ui/core";

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

  return <Container>{children}</Container>;
};

export default AppContainer;
