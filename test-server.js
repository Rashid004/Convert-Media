/** @format */

// test-server.js
import express from "express";
import { createImageConversionMiddleware } from "./dist/index.js";

const app = express();
app.use(express.static("public"));

app.use(createImageConversionMiddleware({ debug: true }));

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
