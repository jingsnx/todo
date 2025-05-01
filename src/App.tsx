import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import {ToDoList} from "./components/ToDoList"

export default function App() {
  return <MantineProvider theme={theme}>
      <ToDoList/>
    </MantineProvider>;
}
