import "./App.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "mantine-react-table/styles.css";
import {
  Box,
  Button,
  createTheme,
  Flex,
  MantineProvider,
  rem,
} from "@mantine/core";
import { NavbarNested } from "./components/ui/Navbar/NavbarNested";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Faculty from "./views/Faculty/Faculty";
import { RepositoryBase } from "./service/RepositoryBase";
import { FacultyModelQuery } from "./model/Faculty";
import { ResponseBase } from "./model/ReponseBase";

const theme = createTheme({
  fontSizes: {
    xs: rem(10),
    sm: rem(12),
    md: rem(14),
    lg: rem(16),
    xl: rem(20),
  },
  lineHeights: {
    xs: "1.4",
    sm: "1.45",
    md: "1.55",
    lg: "1.6",
    xl: "1.65",
  },
  components: {
    Button: Button.extend({
      defaultProps: {
        color: "cyan",
        variant: "outline",
      },
    }),
  },
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Flex w={"100%"}>
          <Box w={"20%"}>
            <NavbarNested />
          </Box>
          <Box w={"80%"} p={10}>
            <Routes>
              <Route path="/faculty/faculty-management" element={<Faculty />} />
            </Routes>
          </Box>
        </Flex>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
