# 🚀 Local Microservices Development Environment

## 📌 Overview

This repository provides a **complete local development setup** for microservices, integrating **Traefik**, **Prometheus**, **Grafana**, **Loki**, **Tempo**, and **OpenTelemetry Collector** with **Docker Compose**. The goal is to offer **full observability**, including logging, metrics, and tracing, in a structured and scalable way.

## 📁 Directory Structure

```
├── docker-compose.yml            # Main Docker Compose file
├── loki-config.yml               # Loki configuration for logging
├── otel-collector-config.yml     # OpenTelemetry Collector configuration
├── prometheus.yml                # Prometheus scraping rules
├── promtail-config.yml           # Promtail configuration for log collection
├── tempo-config.yml              # Tempo configuration for distributed tracing
├── service-1/
│   ├── Dockerfile                 # Service-1 container configuration
│   ├── src/                        # Service-1 source code
│   ├── prisma/                     # Database schema and migrations
│   ├── config/                     # Configurations (MongoDB, Prisma, RabbitMQ)
│   ├── models/                     # Database models
│   ├── middlewares/                # Middleware logic
│   └── utils/                       # Utility functions
│
├── service-2/                     # Identical structure to service-1
├── service-3/                     # Identical structure to service-1
```

## 🛠️ Services Overview

### ✅ Reverse Proxy & Routing

- **Traefik** - Routes requests to microservices dynamically.
- **Configured with labels** in `docker-compose.yml`.

### 📜 Centralized Logging

- **Loki & Promtail** - Collect logs from all microservices.
- **Dozzle** - Real-time container log viewer (`http://localhost/dozzle`).

### 📊 Metrics & Monitoring

- **Prometheus** - Scrapes service metrics (`http://localhost:9090`).
- **Grafana** - Dashboards for logs & metrics (`http://localhost:3000`).
- **cAdvisor & Node Exporter** - Container & system-level metrics.

### 🔎 Distributed Tracing

- **OpenTelemetry Collector** - Aggregates traces from services.
- **Grafana Tempo** - Stores & visualizes traces (`http://localhost:3200`).

## 🏗️ Setup & Running

### 📌 Prerequisites

- Install **Docker & Docker Compose** (Compose v3.8+ required).

### 🚀 Start All Services

Run the following command to start the full stack:

```sh
docker-compose up -d --build
```

### 🛠️ Test Microservices

Verify the services are running by sending requests using **Postman** or **cURL**:

```sh
curl http://localhost:80/service-1/api/v1/
```

**Example Response:**

```json
{
  "status": "🟢 healthy",
  "message": "✅ Response from Backend NodeTS Server-1",
  "serverStartTime": "2025-02-04T16:58:52.878Z",
  "currentTime": "2025-02-04T16:59:30.094Z",
  "uptime": "54.464408293 seconds",
  "version": "1.0.0"
}
```

You can also use **Postman** to send a `GET` request to:

```
http://localhost:80/service-1/api/v1/
```

### 🔄 Code Changes & Hot Reloading

When you **modify the code and save it**, the changes are automatically reflected in the running services. This is possible because the microservices are running with **nodemon** in a mounted volume setup. No need to restart the container manually!

### 🔍 Verify Logs, Metrics & Traces

- **Logs:** View logs in Dozzle (`http://localhost/dozzle`) or Loki.
- **Metrics:** Open Prometheus (`http://localhost:9090`) & Grafana (`http://localhost:3000`).
- **Traces:** View traces in Grafana under Tempo (`http://localhost:3200`).

## 🛑 Stopping the Stack

To stop all services, run:

```sh
docker-compose down
```

## ⚡ Troubleshooting

- **Port Conflicts?** Ensure ports **80, 3000, 8080** are not in use.
- **Logs not appearing?** Check volume mappings for Promtail & Loki.
- **Traefik issues?** Double-check `PathPrefix` rules in service labels.
- **Traces missing?** Verify OpenTelemetry endpoint configurations.

## 📖 Additional Resources

- [Traefik Documentation](https://doc.traefik.io/traefik/)
- [Prometheus Docs](https://prometheus.io/docs/)
- [Grafana Docs](https://grafana.com/docs/)
- [Loki & Promtail](https://grafana.com/docs/loki/latest/)
- [OpenTelemetry Collector](https://opentelemetry.io/docs/collector/)

🚀 **Happy Coding!** 🛠️
