import dotenv from "dotenv";
import express from "express";
import { sequelize } from "./config/db.js";
import cors from "cors";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { seedDatabase } from "./config/seedDatabase.js";

import { ensurePostgresContainer } from "./config/db.js"; 
// import {apiMessage} from "./api/utils.js";

import {
  routerAgregarEvento,
  routerEditarEvento,
  routerObtenerEventosC,
  routerAnularInscripcionEvento,
  routerEliminar,
  routerInscripcionEvento,
  routerObtenerParticipantes,
  routerObtenerListaEventos,
  routerEventosParaNavBar
} from "./routes/rutasEvento.js";

import userDataRouter from "./routes/userDataRouter.js";
import routerJWT from "./routes/sessionRoute.js";
// import verifyGoogleRegister from "./routes/rutasModuloRegistroGoogle.js";
import normalRegister from "./routes/turaModuloRegistroNormal.js";
import routerModificarPerfil from "./routes/rutasModificarPerfil.js";

import {
  routerGetPlace,
  routerAgregarLugar,
  routerEliminarLugar,
  routerListarLugares
} from "./routes/rutasLugar.js";

import {
  routerModificarInteres,
  routerGetIntereses,
  routerInteresesUsuario,
  routerInteresesEvento,
  routerGetInteresesEvento
} from "./routes/rutasIntereses.js";

import {
  // routerRecoverPass,
  // routerRecoverPassToken,
  routerChangePass
} from "./routes/recoverPassword.js";

import routerGetCiudad from "./routes/rutasCiudad.js";

import './models/persona.js'
import './models/evento.js'
import './models/lugar.js'
import './models/interes.js'
import './models/eventoParticipa.js'
import './models/interesEvento.js'
import './models/interesPersona.js'

// ✅ dotenv primero
dotenv.config();

// ✅ inicia postgres container antes del servidor
await ensurePostgresContainer();

await sequelize.sync({ alter: true })
seedDatabase()

// ✅ Express setup
const app = express();
const port = process.env.SERVER_PORT;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// ✅ rutas
app.get("/asd", (req, res) => res.send("¡Hola desde el backend."));

app.use("/api", routerAgregarEvento);
app.use("/api", routerEditarEvento);
app.use("/api", routerObtenerEventosC);
app.use("/api", routerAnularInscripcionEvento);
app.use("/api", routerEliminar);
app.use("/api", routerInscripcionEvento);
app.use("/api", routerObtenerParticipantes);
app.use("/api", routerJWT);
app.use("/api", normalRegister);
app.use("/api", userDataRouter);
app.use("/api", routerAgregarLugar);
app.use("/api", routerEliminarLugar);
app.use("/api", routerModificarPerfil);
app.use("/api", routerGetPlace);
app.use("/api", routerListarLugares);
app.use("/api", routerModificarInteres);
app.use("/api", routerGetIntereses);
app.use("/api", routerInteresesUsuario);
app.use("/api", routerInteresesEvento);
app.use("/api", routerGetInteresesEvento);
app.use("/api", routerObtenerListaEventos);
// app.use("/api", routerRecoverPass);
// app.use("/api", routerRecoverPassToken);
app.use("/api", routerChangePass);
app.use("/api", routerGetCiudad);
app.use("/api", routerEventosParaNavBar);

// ✅ para los archivos estáticos
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use("/api/img", express.static(join(__dirname, "api/img")));

app.listen(port, () => {
  console.log(`\n✅ Servidor backend en ejecución en http://localhost:${port}`);
});
