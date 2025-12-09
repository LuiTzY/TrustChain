# 📘 TrustChain — Documentación Técnica

> Plataforma descentralizada de marketplace con tecnología blockchain

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Docker](https://img.shields.io/badge/docker-ready-green.svg)](https://docker.com)
[![React](https://img.shields.io/badge/react-18.x-blue.svg)](https://reactjs.org)
[![Django](https://img.shields.io/badge/django-4.x-green.svg)](https://djangoproject.com)

---

## 📋 Tabla de Contenidos

- [Descripción General](#-descripción-general)
- [Stack Tecnológico](#-stack-tecnológico)
- [Arquitectura](#-arquitectura)
- [Servicios Docker](#-servicios-docker)
- [Arquitectura Backend](#-arquitectura-backend)
- [Autenticación](#-autenticación)
- [Integración Blockchain](#-integración-blockchain)
- [Comandos de Despliegue](#%EF%B8%8F-comandos-de-despliegue)
- [Ejecución Manual](#-ejecución-manual)
- [Accesos y URLs](#-accesos-y-urls)
- [Capturas del Proyecto](#-capturas-del-proyecto)

---

## 🚀 Descripción General

TrustChain es una plataforma descentralizada que combina las ventajas de blockchain con una arquitectura moderna de aplicaciones web. Permite la gestión de productos y transacciones de manera segura y transparente mediante contratos inteligentes.

### Características Principales

- ✅ Marketplace descentralizado con blockchain
- ✅ Autenticación JWT segura
- ✅ Chat en tiempo real con WebSockets
- ✅ Procesamiento asíncrono de tareas
- ✅ API REST completa
- ✅ Interfaz moderna y responsiva

---

## 🛠 Stack Tecnológico

| Categoría | Tecnología | Versión |
|-----------|-----------|---------|
| **Frontend** | React + Vite + TypeScript | 18.x |
| **Backend** | Django + DRF | 4.x |
| **Blockchain** | Hardhat + Solidity | Latest |
| **Base de Datos** | MySQL | 8.0.41 |
| **Cache/Broker** | Redis | 7.2.11 |
| **Task Queue** | Celery | Latest |
| **Web Server** | Nginx | Stable |
| **Containerización** | Docker + Docker Compose | Latest |

---

## 🧱 Arquitectura

### Diagrama de Arquitectura General

```mermaid
flowchart LR
    A[Frontend React] -->|REST API / WebSocket| B(API Django)
    B -->|SQL Queries| C[(MySQL Database)]
    B -->|Message Broker| D[(Redis)]
    B -->|Smart Contract Calls| E[Hardhat Node]
    D --> F[Celery Worker]
    F --> B
    F --> E
```

### Diagrama de proceso de compras
```
sequenceDiagram
    actor User as 👤 Usuario
    participant FE as Frontend React
    participant API as Backend API
    participant Celery as Celery Worker
    participant BC as Blockchain
    participant DB as MySQL
    
    User->>FE: Crear Producto
    FE->>API: POST /api/products/
    API->>DB: Guardar Producto (pending)
    API->>Celery: Publicar en Blockchain (async)
    API-->>FE: Response (producto creado)
    FE-->>User: Confirmación inicial
    
    Celery->>BC: createProduct(productData)
    BC-->>Celery: Transaction Hash
    Celery->>BC: Esperar confirmación
    BC-->>Celery: Transaction Confirmed
    Celery->>DB: Actualizar 
    
    BC->>API: Event: ListItem
    API->>DB: Sincronizar estado
    FE-->>User: ✅ Publicado en Blockchain

```
### Flujo de Datos

1. **Usuario** interactúa con el **Frontend React**
2. Frontend realiza peticiones REST a la **API Django**
3. API valida y procesa mediante **Services**
4. **Repositories** consultan/modifican datos en **MySQL**
5. Operaciones blockchain se delegan a **Celery Workers**
6. Workers interactúan con el **nodo Hardhat** local
7. Resultados se devuelven al usuario

---

## 🐳 Servicios Docker

### 2.1 Hardhat Node (Blockchain)

Nodo local para el despliegue y ejecución del contrato `Marketplace`.

```yaml
hardhat:
  build:
    context: ./hardart
    dockerfile: Dockerfile
  container_name: hardhat-node
  ports:
    - 8545:8545
  volumes:
    - ./hardart:/blockchain-node/
    - /blockchain-node/node_modules
  healthcheck:
    test: ["CMD-SHELL", "nc -z 127.0.0.1 8545 || exit 1"]
    interval: 5s
    timeout: 3s
    retries: 5
    start_period: 60s
  networks:
    - trustChainNet
```

**Comandos manuales (fuera de Docker):**

```bash
# Levantar el nodo local
npx hardhat node

# Desplegar contrato Marketplace
npx hardhat run scripts/deploy.ts --network localhost
```

---

### 2.2 API (Backend Django + DRF + JWT)

Maneja la lógica del negocio, expone endpoints REST y coordina con blockchain.

```yaml
api:
  build:
    context: ./backend
    dockerfile: Dockerfile
  container_name: BACKEND-TRUSTCHAIN
  image: trustchain-backend:latest
  depends_on:
    db:
      condition: service_healthy
  ports:
    - 8000:8000
  volumes:
    - ./hardart/artifacts:/app/artifacts
  command: ["sh", "-c", "/app/sh.sh"]
  environment:
    HARDHAT_SERVER_URL: http://host.docker.internal:8545
    HARDHAT_ABI_PATH: /app/artifacts/contracts/Marketplace.sol/Marketplace.json
    HARDHAT_MARKETPLACE_PATH_ADDRESS: /app/artifacts/Marketaddress.json
    DJANGO_SETTINGS_MODULE: core.environments.prod
    DATABASE_NAME_PROD: trustdb
    DATABASE_USER_PROD: trustuser
    DATABASE_PASSWORD_PROD: 1234
    DATABASE_HOST_PROD: db
    DATABASE_PORT_PROD: 3307
  networks:
    - trustChainNet
```

**Comandos manuales (fuera de Docker):**

```bash
# Aplicar migraciones
python manage.py migrate --settings=core.environments.prod

# Crear superusuario
python manage.py createsuperuser --settings=core.environments.prod

# Iniciar servidor
python manage.py runserver 0.0.0.0:8000 --settings=core.environments.prod
```

---

### 2.3 Celery Worker

Procesa tareas asíncronas como validaciones blockchain y operaciones pesadas.

```yaml
celery:
  container_name: CELERY-TRUSTCHAIN
  image: trustchain-backend:latest
  command: ["celery", "-A", "core", "worker", "-l", "info"]
  depends_on:
    api:
      condition: service_started
    hardhat:
      condition: service_healthy
  volumes:
    - ./hardart/artifacts:/app/artifacts
  environment:
    DJANGO_SETTINGS_MODULE: core.environments.prod
    DATABASE_NAME_PROD: trustdb
  networks:
    - trustChainNet
```

**Comando manual:**

```bash
# Worker recomendado para desarrollo
celery -A core worker -l info --concurrency 1 -P solo
```

---

### 2.4 Base de Datos MySQL

```yaml
db:
  container_name: db
  image: mysql:8.0.41-oraclelinux9
  ports:
    - 3307:3306
  healthcheck:
    test: ["CMD", "mysqladmin", "ping", "-u","root","-p1234","-h","localhost"]
    interval: 10s
    timeout: 5s
    retries: 5
  environment:
    MYSQL_ROOT_PASSWORD: 1234
    MYSQL_DATABASE: trustdb
    MYSQL_USER: trustuser
    MYSQL_PASSWORD: 1234
  networks:
    - trustChainNet
```

**Acceder manualmente:**

```bash
docker exec -it db mysql -u root -p1234
```

---

### 2.5 Redis (Broker de Celery)

```yaml
redis:
  ports:
    - 6379:6379
  image: redis:7.2.11-alpine3.21
  networks:
    - trustChainNet
```

---

### 2.6 Frontend (React + Nginx)

```yaml
frontend:
  build:
    context: ./frontend
    dockerfile: Dockerfile
    args:
      VITE_APP_API_BASE_URL: http://host.docker.internal:8000
      VITE_APP_API_WEBSOCKET_BASE_URL: ws://host.docker.internal:8000/api/chat/
  container_name: TRUSTCHAIN-FRONTEND
  image: trustchain-frontend/latest
  ports:
    - 9000:80 
  depends_on:
    - api
  networks:
    - trustChainNet
```

⚠️ **Modificar los hosts del frontend:**

- **API REST:** `/frontend/src/api/api.ts`
- **WebSocket del chat:** `/frontend/src/apps/products/components/ChatDialog.tsx`

---

## 🧱 Arquitectura Backend

El backend sigue un diseño modular en capas:

### Estructura de Capas

```
┌─────────────────────────────────────┐
│         Views (Endpoints)           │
│  - Autenticación y permisos         │
│  - Validación de requests           │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Serializers (DRF)              │
│  - Transformación de datos          │
│  - Validación de campos             │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│        Services (Lógica)            │
│  - Reglas de negocio                │
│  - Integración blockchain           │
│  - Validaciones complejas           │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│       Repositories (Data)           │
│  - Consultas a MySQL                │
│  - ORM de Django                    │
└─────────────────────────────────────┘
```

### Responsabilidades por Capa

| Capa | Responsabilidad | Ejemplo |
|------|----------------|---------|
| **Views** | Endpoints REST, autenticación JWT, permisos | `ProductViewSet` |
| **Serializers** | Transformación modelo ↔ JSON | `ProductSerializer` |
| **Services** | Lógica de negocio, llamadas blockchain | `ProductService` |
| **Repositories** | Acceso a datos, queries SQL | `ProductRepository` |

---

## 🔐 Autenticación

Sistema basado en **JWT (JSON Web Tokens)** con:

- ✅ **Access Token** (corta duración)
- ✅ **Refresh Token** (larga duración)

Implementado con `djangorestframework-simplejwt`.

### Endpoints de Autenticación

```bash
POST /api/auth/login/          # Obtener tokens
POST /api/auth/token/refresh/        # Renovar access token
POST /api/auth/register/       # Registro de usuario
POST /api/auth/token/verify/       # Registro de usuario

```

### Ejemplo de Uso

```bash
# Login
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"user","password":"pass"}'

# Response
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}

# Usar token
curl http://localhost:8000/api/products/ \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc..."
```

---

## 📡 Estandarización de Respuestas

Cada endpoint retorna respuestas en formato consistente:

```json
{
  "success": true,
  "message": "Acción realizada correctamente",
  "data": {
    // Datos específicos de la respuesta
  }
}
```

### Ejemplo de Error

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": {
    "field": ["Este campo es requerido"]
  }
}
```

---

## ⚙️ Integración Blockchain

### Variables de Entorno Clave

```bash
HARDHAT_SERVER_URL=http://host.docker.internal:8545
HARDHAT_ABI_PATH=/app/artifacts/contracts/Marketplace.sol/Marketplace.json
HARDHAT_MARKETPLACE_PATH_ADDRESS=/app/artifacts/Marketaddress.json
```

### Funciones Críticas

1. **Deploy automático** del contrato Marketplace
2. **Lectura** de datos desde el contrato
3. **Escritura** de transacciones (crear productos, transferencias)
4. **Validación** de transacciones blockchain

### Flujo de Transacción

```mermaid
sequenceDiagram
    participant User
    participant API
    participant Celery
    participant Blockchain
    
    User->>API: Crear producto
    API->>Celery: Tarea asíncrona
    Celery->>Blockchain: Llamada al contrato
    Blockchain-->>Celery: Transaction Hash
    Celery-->>API: Confirmación
    API-->>User: Producto creado
```

---

## ⚙️ Comandos de Despliegue

### 🔷 1. Construir imágenes

```bash
docker-compose build
```

### 🔷 2. Levantar todos los servicios

```bash
docker-compose up -d
```

### 🔷 3. Ver logs específicos

```bash
# Backend
docker logs -f BACKEND-TRUSTCHAIN

# Frontend
docker logs -f TRUSTCHAIN-FRONTEND

# Celery
docker logs -f CELERY-TRUSTCHAIN

# Todos
docker-compose logs -f
```

### 🔷 4. Reiniciar un servicio específico

```bash
docker-compose restart api
docker-compose restart frontend
docker-compose restart celery
```

### 🔷 5. Detener todo

```bash
docker-compose down
```

### 🔷 6. Limpiar volúmenes y reconstruir

```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

---

## 🧪 Ejecución Manual

### Backend Django

```bash
cd backend
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate --settings=core.environments.prod
python manage.py runserver --settings=core.environments.prod
```

### Celery Worker

```bash
cd backend
celery -A core worker -l info --concurrency 1 -P solo
```

### Hardhat Blockchain

```bash
cd hardart
npm install
npx hardhat node

# En otra terminal
npx hardhat run scripts/deploy.ts --network localhost
```

### Frontend React

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Accesos y URLs

| Servicio | URL | Puerto | Descripción |
|----------|-----|--------|-------------|
| **Frontend** | http://localhost:9000 | 9000 | Aplicación React |
| **API Django** | http://localhost:8000 | 8000 | Backend REST API |
| **Admin Django** | http://localhost:8000/admin | 8000 | Panel de administración |
| **Blockchain Node** | http://localhost:8545 | 8545 | Nodo Hardhat RPC |
| **MySQL** | localhost:3307 | 3307 | Base de datos |
| **Redis** | localhost:6379 | 6379 | Cache/Broker |

---

## 📸 Capturas del Proyecto

### 🏠 Dashboard Principal

![Página Principal](./docs/screenshots/home.png)

*Descripción: Landing page con búsqueda y productos destacados*

---

### 🏠 Mis productos

![Página Principal](./docs/screenshots/my.png)

*Descripción: Landing page con búsqueda y productos destacados*


---

### 🔐 Autenticación

#### Login
![Login](./docs/screenshots/login.png)

*Descripción: Formulario de inicio de sesión con validación*

#### Registro
![Registro](./docs/screenshots/register.png)

*Descripción: Formulario de registro de nuevos usuarios*

---

### Mi perfil

![Lista de Productos](./docs/screenshots/profile.png)

*Descripción: Mi perfil*


####  Editar Perfil
![Lista de Productos](./docs/screenshots/edit.png)

*Descripción: Editar perfil*


#### Crear Producto
![Crear Producto](./docs/screenshots/create.png)

*Descripción: Formulario para publicar nuevos productos*

---

### 💬 Chat en Tiempo Real

![Chat](./docs/screenshots/chat.png)

*Descripción: Sistema de mensajería WebSocket entre compradores y vendedores*

---

### 👤 Perfil de Usuario

#### Mi Perfil
![Mi Perfil](./docs/screenshots/profile.png)

*Descripción: Información personal y configuración de cuenta*

#### Mis Productos
![Mis Productos](./docs/screenshots/my-products.png)

*Descripción: Gestión de productos publicados por el usuario*

---

### 🔗 Blockchain

#### Mis Compras
![Mis Compras](./docs/screenshots/transactions.png)

*Descripción: Historial de compras realizadas*

#### Wallet
![Wallet](./docs/screenshots/wallet.png)

*Descripción: Gestion de tu billetera para ver tu balance*

---

## 📁 Estructura de Directorios

```
trustchain/
├── backend/              # Django REST API
│   ├── apps/            # Módulos de la aplicacion, marketplace, common (Listeners, repositories, Background tasks, Models, Presentation, Urls)
|   |__
│   ├── core/            # Configuración del proyecto
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/            # React + Vite
│   ├── src/
│   │   ├── apps/       # Modulos por feature
│   │   ├── components/ # Componentes reutilizables
│   │   └── api/        # Cliente API
│   ├── package.json
│   └── Dockerfile
├── hardart/             # Hardhat blockchain
│   ├── contracts/      # Smart contracts Solidity
│   ├── scripts/        # Scripts de despliegue
│   └── hardhat.config.ts
├── docs/               # Documentación
│   └── screenshots/    # Capturas del proyecto
├── docker-compose.yml
└── README.md
```

---

## 🤝 Contribución

Si deseas contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Notas Adicionales

### Consideraciones de Seguridad

- Cambiar las credenciales de MySQL en producción
- Usar variables de entorno para secrets
- Implementar HTTPS en producción
- Configurar CORS apropiadamente

### Optimizaciones Recomendadas

- Implementar caché con Redis para consultas frecuentes
- Usar CDN para archivos estáticos
- Configurar límites de rate limiting
- Implementar paginación en listados grandes

### Testing

```bash
# Backend
python manage.py test

# Frontend
npm run test

# E2E
npm run test:e2e
```

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 👥 Equipo

Desarrollado por: 

- Luis David Marte Vasquez 

---

- **GitHub:** https://github.com/trustchain

---

