# Product Registration Front-end - Angular, PrimeNG, Docker

![Angular](https://img.shields.io/badge/angular-v18-red)
![PrimeNG](https://img.shields.io/badge/primeng-v16.0.0-blue)
![TypeScript](https://img.shields.io/badge/typescript-v5.0.0-blue)
![Docker](https://img.shields.io/badge/docker-v24.0.0-blue)

This project is the front-end for the product registration system, developed using [Angular](https://angular.io/) and [PrimeNG](https://primeng.org/). The project is containerized using Docker.

## Technologies Used
- Angular 18
- PrimeNG
- TypeScript
- Docker

## Prerequisites
To run the project, you need to have:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

Make sure that port `4200` (for the front-end) is available on your system.

## How to Run the Project with Docker

1. Clone the repository:

```bash
# Clone repo
$ git clone https://github.com/voibhiv/product-frontend

# Go to main folder
$ cd product-frontend
```

2. Run Docker Compose

```bash
# Build containers
$ docker-compose up --build -d
``` 

## Project Structure

```bash
📦src
 ┣ 📂app
 ┃ ┣ 📂core
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂dialog-shops
 ┃ ┃ ┃ ┃ ┣ 📜dialog-shops.component.html
 ┃ ┃ ┃ ┃ ┣ 📜dialog-shops.component.scss
 ┃ ┃ ┃ ┃ ┣ 📜dialog-shops.component.spec.ts
 ┃ ┃ ┃ ┃ ┗ 📜dialog-shops.component.ts
 ┃ ┃ ┃ ┣ 📂form-product
 ┃ ┃ ┃ ┃ ┣ 📜form-product.component.html
 ┃ ┃ ┃ ┃ ┣ 📜form-product.component.scss
 ┃ ┃ ┃ ┃ ┣ 📜form-product.component.spec.ts
 ┃ ┃ ┃ ┃ ┗ 📜form-product.component.ts
 ┃ ┃ ┃ ┣ 📂form-product-register
 ┃ ┃ ┃ ┃ ┣ 📜form-product-register.component.html
 ┃ ┃ ┃ ┃ ┣ 📜form-product-register.component.scss
 ┃ ┃ ┃ ┃ ┣ 📜form-product-register.component.spec.ts
 ┃ ┃ ┃ ┃ ┗ 📜form-product-register.component.ts
 ┃ ┃ ┃ ┣ 📂header-info
 ┃ ┃ ┃ ┃ ┣ 📜header-info.component.html
 ┃ ┃ ┃ ┃ ┣ 📜header-info.component.scss
 ┃ ┃ ┃ ┃ ┣ 📜header-info.component.spec.ts
 ┃ ┃ ┃ ┃ ┗ 📜header-info.component.ts
 ┃ ┃ ┃ ┣ 📂list-products
 ┃ ┃ ┃ ┃ ┣ 📜list-products.component.html
 ┃ ┃ ┃ ┃ ┣ 📜list-products.component.scss
 ┃ ┃ ┃ ┃ ┣ 📜list-products.component.spec.ts
 ┃ ┃ ┃ ┃ ┗ 📜list-products.component.ts
 ┃ ┃ ┃ ┗ 📂list-shops
 ┃ ┃ ┃ ┃ ┣ 📜list-shops.component.html
 ┃ ┃ ┃ ┃ ┣ 📜list-shops.component.scss
 ┃ ┃ ┃ ┃ ┣ 📜list-shops.component.spec.ts
 ┃ ┃ ┃ ┃ ┗ 📜list-shops.component.ts
 ┃ ┃ ┣ 📂interfaces
 ┃ ┃ ┃ ┣ 📜dialog-shop.interface.ts
 ┃ ┃ ┃ ┣ 📜navigation-product-register.interface.ts
 ┃ ┃ ┃ ┣ 📜paginate.interface.ts
 ┃ ┃ ┃ ┣ 📜product.interface.ts
 ┃ ┃ ┃ ┣ 📜shop-list.interface.ts
 ┃ ┃ ┃ ┗ 📜shops.interface.ts
 ┃ ┃ ┣ 📂services
 ┃ ┃ ┃ ┣ 📂header
 ┃ ┃ ┃ ┃ ┗ 📜header.service.ts
 ┃ ┃ ┃ ┣ 📂product
 ┃ ┃ ┃ ┃ ┣ 📂interfaces
 ┃ ┃ ┃ ┃ ┃ ┣ 📜create-product.request.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜error-default.response.interface.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜get-paginate-products.interface.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜product-delete.response.interface.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜product-get.response.interface.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜product-save.response.interface.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜shop-product-create.interface.ts
 ┃ ┃ ┃ ┃ ┗ 📜product.service.ts
 ┃ ┃ ┃ ┣ 📂shop
 ┃ ┃ ┃ ┃ ┣ 📂interfaces
 ┃ ┃ ┃ ┃ ┃ ┣ 📜get-all-shops.interface.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜shop-get.response.interface.ts
 ┃ ┃ ┃ ┃ ┗ 📜shop.service.ts
 ┃ ┃ ┃ ┗ 📂toast
 ┃ ┃ ┣ 📂shared
 ┃ ┃ ┃ ┗ 📂pipes
 ┃ ┃ ┃ ┃ ┗ 📜buffer-to-image.pipe.ts
 ┃ ┃ ┗ 📂store
 ┃ ┃ ┃ ┣ 📂products
 ┃ ┃ ┃ ┃ ┣ 📜action.ts
 ┃ ┃ ┃ ┃ ┣ 📜effects.ts
 ┃ ┃ ┃ ┃ ┣ 📜reducer.ts
 ┃ ┃ ┃ ┃ ┗ 📜selector.ts
 ┃ ┃ ┃ ┗ 📂shops
 ┃ ┃ ┃ ┃ ┣ 📜action.ts
 ┃ ┃ ┃ ┃ ┣ 📜effects.ts
 ┃ ┃ ┃ ┃ ┣ 📜reducer.ts
 ┃ ┃ ┃ ┃ ┗ 📜selector.ts
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📂home
 ┃ ┃ ┃ ┣ 📜home.component.html
 ┃ ┃ ┃ ┣ 📜home.component.scss
 ┃ ┃ ┃ ┣ 📜home.component.spec.ts
 ┃ ┃ ┃ ┗ 📜home.component.ts
 ┃ ┃ ┣ 📂page-not-found
 ┃ ┃ ┃ ┣ 📜page-not-found.component.html
 ┃ ┃ ┃ ┣ 📜page-not-found.component.scss
 ┃ ┃ ┃ ┣ 📜page-not-found.component.spec.ts
 ┃ ┃ ┃ ┗ 📜page-not-found.component.ts
 ┃ ┃ ┗ 📂product-detail
 ┃ ┃ ┃ ┣ 📜product-detail.component.html
 ┃ ┃ ┃ ┣ 📜product-detail.component.scss
 ┃ ┃ ┃ ┣ 📜product-detail.component.spec.ts
 ┃ ┃ ┃ ┗ 📜product-detail.component.ts
 ┃ ┣ 📂styles
 ┃ ┃ ┗ 📜_variables.scss
 ┃ ┣ 📜app.component.html
 ┃ ┣ 📜app.component.scss
 ┃ ┣ 📜app.component.spec.ts
 ┃ ┣ 📜app.component.ts
 ┃ ┣ 📜app.config.ts
 ┃ ┗ 📜app.routes.ts
 ┣ 📂assets
 ┃ ┗ 📂images
 ┃ ┃ ┗ 📜no-image.jpg
 ┣ 📂environments
 ┃ ┗ 📜environment.ts
 ┣ 📜index.html
 ┣ 📜main.ts
 ┗ 📜styles.scss
 ```