import ErrorPage from "@/pages/ErrorPage";
import Home from "@/pages/Home";
import RecipeID from "@/pages/RecipeID";
import { Route, Routes } from "react-router";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipe/:id" element={<RecipeID />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};
export default AppRoutes;
