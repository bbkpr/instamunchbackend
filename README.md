# Getting Started
* Copy `.env.example` to `.env`, and fill in your connection details
* `npm i`: Install dependencies
* `docker compose up -d`: Start the Postgres Docker container, listening on port 15432
* Make sure `db-data` is ignored/excluded in your IDE
* `npm run prisma:generate`: Generate the Prisma Client (`@prisma/client`) from `prisma/schema.prisma`
* `npm run prisma:seed`: Add seed data (see `prisma/seed.ts`)
* `npm run codegen`: Generate GraphQL code from `schema.graphql`
* `npm start`: Start the servers. Go to the displayed GraphQL URL in your browser to use the explorer.

# Database Migrations
* `npm run prisma:migrate`: Migrate the DB and Prisma Client using an updated `prisma/schema.prisma`

# GraphQL
* `npm run codegen` will run the GraphQL code generator, configured with `codegen.ts`, which outputs to `generated/graphql.ts`

# Testing
* `npm run test` to run Jest tests, configured by `jest.config.ts`
