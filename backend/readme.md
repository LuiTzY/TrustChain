┌───────────────────────────────┐
│     Presentation Layer        │  ← Interfaz con el mundo exterior (API REST, CLI, etc.)
│     (views, serializers)      │
└───────────────┬───────────────┘
                │
┌───────────────▼───────────────┐
│  Application Layer (UseCases) │  ← Orquesta la lógica del negocio
│  (services, handlers)         │     Usa entidades y repositorios a través de interfaces
└───────────────┬───────────────┘
                │
┌───────────────▼───────────────┐
│     Domain Layer              │  ← Núcleo: Reglas de negocio, Entidades, Interfaces
│  (entities, value objects)    │
└───────────────┬───────────────┘
                │
┌───────────────▼───────────────┐
│  Infrastructure Layer         │  ← Implementa dependencias externas
│  (ORM, APIs, DB, Web3, etc.)  │     Cumple los contratos definidos en el dominio
└───────────────────────────────┘



Flujo esperado:

Blockchain Event (ItemListed)
        ↓
Infrastructure: Web3Listener → parsea el evento
        ↓
Application: CreateProductFromEventService → ejecuta el caso de uso
        ↓
Domain: ProductEntity → aplica reglas de negocio
        ↓
Infrastructure: DjangoProductRepository → guarda en BD

Solo tendriamos que crear evento en la capa de la aplicacion, para que siga el mismo flujo



Correr celery celery -A src worker -l info
celery -A core worker -l info --concurrency 1 -P solo