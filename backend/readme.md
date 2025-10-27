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



Pasos para correr el proyecto.


celery -A core worker -l info --concurrency 1 -P solo