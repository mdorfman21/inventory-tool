import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/collapse.js";

import SKU from "./components/SKU/SKU.module";
import CreateSKU from "./components/SKU/components/SKUCreate.component";
import ViewSKUS from "./components/SKU/components/SKUView.component";
import EditSKU from "./components/SKU/components/SKUEdit.component";
import CreateSize from "./components/Size/SizeCreate.component";
import CreateInventory from "./components/Inventory/create.component";

const router = createBrowserRouter([
  {
    path: "/sku",
    element: <ViewSKUS />,
  },
  {
    path: "/sku/create",
    element: <CreateSKU />,
  },
  {
    path: "/sku/edit/:sku_id",
    element: <EditSKU />,
  },
  {
    path: "/size/create",
    element: <CreateSize />,
  },
  {
    path: "/new/inventory/:id",
    element: <CreateInventory />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
