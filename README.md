brandanbites/
│
├── public/               # Archivos estáticos
│   ├── css/              # Estilos
│   ├── js/               # Scripts
│   └── index.html        # Página principal
│
├── src/                  # Código backend
│   └── app.js            # Lógica del servidor con Node.js
│
├── config/               # Configuraciones
│   └── db.js             # Configuración de PostgreSQL
│
├── node_modules/         # Dependencias
├── package.json          # Información del proyecto y dependencias
├── .env                  # Variables de entorno (por ejemplo, claves API)
└── README.md             # Documentación del proyecto

# Brandan Bites

Brandan Bites es un kiosco virtual que ofrece una variedad de productos en tres categorías: dulces, salados y bebidas.

## Configuración

1. Asegúrate de tener Node.js y PostgreSQL instalados en tu sistema.

2. Clona este repositorio:
   ```
   git clone https://github.com/tu-usuario/brandan-bites.git
   cd brandan-bites
   ```

3. Instala las dependencias:
   ```
   npm install
   ```

4. Configura la base de datos:
   - Crea una base de datos llamada `brandan_bites` en PostgreSQL.
   - Ejecuta el siguiente script SQL para crear la tabla de 



se usa: postgreSQL ; Node.js; Express.js ; html,css,js ; 

 -------------
|BASE DE DATOS|
 -------------
el archivo config/db.js para configurar la conexión en postgreSQL
en el archivo .env en la raíz con los detalles de conexión

-------------
  JAVASCRIPT
-------------

archivo src/app.js con un servidor básico que sirva el archivo HTML

En EL archivo .env, agrega tu clave privada de Mercado Pago:

En src/app.js, agrega la lógica para iniciar el pago, MP

En public/index.html, una página simple que muestre productos y permita realizar el pago

En public/js/acript.js, agrega la lógica para mostrar productos y gestionar el pago

