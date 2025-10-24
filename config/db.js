// archivo que contiene los módulos para las peticiones a la base de datos
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Sequelize from 'sequelize'
import pkg from 'pg'
import Docker from 'dockerode'
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg

const containerName = process.env.CONTAINER_NAME
const user = process.env.PGUSER
const password = process.env.PGPWD
const host = process.env.PGHOST
const port = process.env.PGPORT
const db = process.env.PGDATABASE

console.log('📦 Variables Docker:', { containerName, user, password, db, port, host });


const sequelize = new Sequelize.Sequelize(db, user, password, {
  host: host,
  port: port,
  dialect: 'postgres',
  define: {
    freezeTableName: true
  }
})

// Configuración para pool de pg
const config = {
  user: user,
  password: password,
  database: db,
  host: host,
  port: port,
  schema: 'public'
}

const pool = new Pool(config)

const docker = new Docker()

export async function ensurePostgresContainer() {
  try {
    const containers = await docker.listContainers({ all: true });
    const existing = containers.find(c =>
      c.Names.some(name => name.includes(containerName))
    );

    if (!existing) {
      console.log('🔍 Verificando imagen de PostgreSQL...');
      const images = await docker.listImages();
      const hasImage = images.some(img =>
        img.RepoTags && img.RepoTags.includes('postgres:latest')
      );

      if (!hasImage) {
        console.log('⬇️ Descargando imagen postgres:latest...');
        await new Promise((resolve, reject) => {
          docker.pull('postgres:latest', (err, stream) => {
            if (err) return reject(err);
            docker.modem.followProgress(stream, (err, res) => err ? reject(err) : resolve(res));
          });
        });
        console.log('✅ Imagen postgres:latest descargada');
      }

      console.log('🚀 Creando contenedor PostgreSQL...');
      const container = await docker.createContainer({
        Image: 'postgres:latest',
        name: containerName,
        Env: [
          `POSTGRES_USER=${user}`,
          `POSTGRES_PASSWORD=${password}`,
          `POSTGRES_DB=${db}`,
          `POSTGRES_PORT=${port}`
        ],
        HostConfig: {
          PortBindings: {
            '5432/tcp': [{ HostPort: `${port}` }]
          }
        }
      });
      await container.start();
    } else {
      console.log('📦 Contenedor PostgreSQL ya existe');
      if (existing.State !== 'running') {
        const container = docker.getContainer(existing.Id);
        await container.start();
      }
    }

    console.log('⏳ Esperando a que PostgreSQL esté listo...');
    console.log(`✅ PostgreSQL disponible en localhost:${port}`);
  } catch (error) {
    console.error('❌ Error al iniciar PostgreSQL:', error);
  }
}

export const validarSesion = async (req, res) => {
  const nickname = req.body.nickname
  const password = req.body.password
  try {
    const query = `
      SELECT * FROM persona
      WHERE nickname = $1
      LIMIT 1
    `
    const { rows } = await pool.query(query, [nickname])

    if (rows.length === 0) {
      return { ingresoCorrecto: false }
    }

    if (!(await bcrypt.compare(password, rows[0].contraseña))) {
      return { ingresoCorrecto: false }
    }

    return {
      ingresoCorrecto: true,
      id: rows[0].id
    }
  } catch (error) {
    console.error('Error al realizar el inicio de sesión:', error)
  }
}

export const registrarPersonaGoogle = async (req, res) => {
  await pool.query(
    `INSERT INTO persona(
      id, tipo_de_usuario, nickname, nombre, apellido, correo_electronico)
      VALUES ('${req.id}', 'Google','${req.nickname}','${req.firstName}', '${req.lastName}', '${req.email}');`
  )

  const token = jwt.sign({ id: req.id }, 'ds1g3')
  return token
}

export const generarIdentificadorUnico = () => {
  const fechaActual = new Date()
  const milisegundos = fechaActual.getMilliseconds()
  return `${milisegundos}`
}

export const uuidEventoParticipa = () => {
  const fechaActual = new Date()
  const mes = fechaActual.getMonth() + 1
  const dia = fechaActual.getDate()
  const hora = fechaActual.getHours()
  const minutos = fechaActual.getMinutes()
  return `${mes}${dia}${hora}${minutos}`
}

export const encriptarPass = async password => {
  const salt = await bcrypt.genSalt()
  const encript = await bcrypt.hash(password, salt)
  return encript
}

export const registrarPersonaNormal = async (req, res) => {
  const id = generarIdentificadorUnico()
  const password = await encriptarPass(req.password)

  await pool.query(
    `INSERT INTO persona(
      id, tipo_de_usuario, nickname, nombre, apellido, "contraseña", correo_electronico)
      VALUES ('${id}', 'Normal','${req.nickname}','${req.nombre}', '${req.apellido}', '${password}', '${req.email}');`
  )

  const token = jwt.sign({ id }, 'ds1g3')
  return token
}

export const verificarCorreoExistente = async correo => {
  try {
    const query = 'SELECT * FROM public.persona WHERE correo_electronico = $1'
    const result = await pool.query(query, [correo])
    return result.rowCount > 0
  } catch (error) {
    console.error('Error al verificar el correo en la base de datos', error)
    throw error
  }
}

export {
  pool,
  sequelize
}
