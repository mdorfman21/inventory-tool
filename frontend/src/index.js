import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import SKU from "./components/SKU/SKU.module";
import CreateSKU from "./components/SKU/components/SKUCreate.component";

const router = createBrowserRouter([
  {
    path: "/sku",
    element: <SKU />,
  },
  {
    path: "/sku/create",
    element: <CreateSKU />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);