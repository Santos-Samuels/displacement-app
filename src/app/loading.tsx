"use client"
import { AppContainer } from "@/components";
import LinearProgress from '@mui/material/LinearProgress';

const Loading = () => {
  return <AppContainer>
    <p>Carregando...</p>
    <LinearProgress />
  </AppContainer>
}

export default Loading