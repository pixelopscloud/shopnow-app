# ShopNow - E-Commerce Microservices Platform

A production-grade e-commerce application built with microservices architecture, deployed on Kubernetes using GitOps principles.

## Architecture

ShopNow is built with 5 independent microservices — User Service (Auth + JWT), Product Service (Catalog + Search), Order Service (Cart + Checkout), Payment Service (Processing + Invoices), Notification Service (Email alerts) — plus a React.js frontend, all communicating through an Nginx Ingress Controller.

## Tech Stack

- **Frontend:** React.js + Vite
- **Backend:** Node.js + Express.js (REST APIs)
- **Database:** PostgreSQL (separate DB per service)
- **Cache:** Redis
- **Container:** Docker
- **Orchestration:** Kubernetes (Docker Desktop)
- **CI/CD:** GitHub Actions
- **Security Scanning:** Trivy (filesystem + image scanning)
- **Registry:** Docker Hub
- **GitOps:** ArgoCD + Helm Charts
- **Monitoring:** Prometheus + Grafana

## CI/CD Pipeline Flow

```
Code Push → Detect Changed Services → Trivy Security Scan →
Docker Build → Image Scan → Push to Docker Hub →
Update shopnow-infra repo → ArgoCD Auto Deploy
```

## DevSecOps Features

- Path-based triggers — only changed service gets built
- Trivy filesystem scan before Docker build
- Trivy image scan after Docker build
- Staging branch for testing, main branch for production
- CI Bot automatically updates image tags in infra repo

## Docker Images

```
pixelopscloud/shopnow-user-service
pixelopscloud/shopnow-product-service
pixelopscloud/shopnow-order-service
pixelopscloud/shopnow-payment-service
pixelopscloud/shopnow-notification-service
pixelopscloud/shopnow-frontend
```

## Project Structure

```
shopnow-app/
├── services/
│   ├── user-service/          # Auth, JWT, User Profile
│   ├── product-service/       # Catalog, Search, Categories
│   ├── order-service/         # Cart, Checkout, Order History
│   ├── payment-service/       # Payment Processing
│   └── notification-service/  # Email Notifications
├── frontend/                  # React.js + Vite
└── .github/
    └── workflows/
        └── ci.yml             # GitHub Actions CI Pipeline
```

## Related Repository

Infrastructure & Helm Charts → [shopnow-infra](https://github.com/pixelopscloud/shopnow-infra)
