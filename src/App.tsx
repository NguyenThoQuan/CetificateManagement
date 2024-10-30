import "./App.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "mantine-react-table/styles.css";
import "@mantine/notifications/styles.css";
import { Box, Flex } from "@mantine/core";
import { NavbarNested } from "./components/ui/Navbar/NavbarNested";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Faculty from "./views/Faculty/Faculty";
import Major from "./views/Major/Major";
import Home from "./views/Home/Home";
import DegreeType from "./views/Degree/DegreeType/DegreeType";
import StudentGraduated from "./views/Student/StudentGraduated/StudentGraduated";

function App() {
  return (
    <BrowserRouter>
      <Flex w={"100%"}>
        <Box w={"20%"}>
          <NavbarNested />
        </Box>
        <Box w={"80%"} p={10}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/faculty/faculty-management" element={<Faculty />} />
            <Route path="/faculty/major-management" element={<Major />} />
            <Route
              path="/student/student-graduated"
              element={<StudentGraduated />}
            />
            <Route path="/degree/degree-type" element={<DegreeType />} />
          </Routes>
        </Box>
      </Flex>
    </BrowserRouter>
  );
}

export default App;
