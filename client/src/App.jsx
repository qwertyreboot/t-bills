import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import BillPage from "./pages/BillPage";
import ProductPage from "./pages/ProductPage";
import Sidebar from "./components/Sidebar";
import SigninPage from "./pages/SigninPage";
import UserPage from "./pages/UserPage";
import { classNames } from "./utils";
import { useState } from "react";

const PageWithSidebar = ({ children }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  return (
    <div>
      <Sidebar onChangeSize={setIsMaximized} />
      <div className={classNames(isMaximized ? "ml-48" : "ml-16")}>
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/bills"
            element={
              <PageWithSidebar>
                <BillPage />
              </PageWithSidebar>
            }
          />
          <Route
            path="/products"
            element={
              <PageWithSidebar>
                <ProductPage />
              </PageWithSidebar>
            }
          />
          <Route path="/signin" element={<SigninPage />} />
          <Route
            path="/users"
            element={
              <PageWithSidebar>
                <UserPage />
              </PageWithSidebar>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
