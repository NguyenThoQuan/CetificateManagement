import "./App.css";
import "@mantine/core/styles.css";

import { Button, createTheme, MantineProvider, rem } from "@mantine/core";
import { NavbarNested } from "./views/Navbar/NavbarNested";

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
      <NavbarNested />
    </MantineProvider>
  );
}

export default App;
