import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import { BrowserRouter, Routes, Navigate, useNavigate } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
