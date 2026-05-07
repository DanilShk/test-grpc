# test-grpc

NestJS monorepo with two apps communicating over gRPC:

- `producer` — HTTP API (port `3000`), acts as a gRPC client.
- `consumer` — gRPC microservice (port `50050`), implements the `users` service defined in `libs/proto/src/users/users.proto`.

Request flow:

```
HTTP client  →  producer (HTTP :3000)  →  gRPC  →  consumer (:50050)
```

## Project structure

```
apps/
  producer/   # HTTP gateway, calls consumer over gRPC
  consumer/   # gRPC microservice (users)
libs/
  proto/            # .proto definitions + generated TS types
  clients-global/   # global gRPC client module (USERS_PACKAGE_TOKEN)
```

## Environment variables

| Variable          | Service  | Default          | Description                              |
| ----------------- | -------- | ---------------- | ---------------------------------------- |
| `PORT`            | producer | `3000`           | HTTP port of the producer                |
| `GRPC_USERS_URL`  | producer | `0.0.0.0:50050`  | gRPC URL of the consumer (`host:port`)   |

## Run with Docker (recommended)

Only the producer port (`3000`) is exposed to the host. The producer reaches the consumer over the internal docker network using the service name.

Build and start:

```bash
git pull https://github.com/DanilShk/test-grpc.git
```

```bash
create .env file  based on .env.example 
```

```bash
docker compose up --build
```

Run in background:

```bash
docker compose up -d --build
```

Stop:

```bash
docker compose down
```

The HTTP API is then available at `http://localhost:3000`.
