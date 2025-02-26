#!/bin/bash

dependencies=(
  "@prisma/client"
  "axios"
  "cors"
  "dotenv"
  "express"
  "helmet"
  "pino"
  "pino-http"
  "pino-http-print"
  "serverless"
  "serverless-http"
  "serverless-offline"
  "serverless-plugin-ifelse"
  "serverless-prune-plugin"
  "zod"
)

devDependencies=(
  "@types/cors"
  "@types/express"
  "@types/node"
  "@types/supertest"
  "@vitest/coverage-v8"
  "eslint"
  "eslint-config-prettier"
  "eslint-config-standard-with-typescript"
  "eslint-plugin-import"
  "eslint-plugin-n"
  "eslint-plugin-prettier"
  "eslint-plugin-promise"
  "eslint-plugin-vitest"
  "npm-check-updates"
  "prettier"
  "prisma"
  "supertest"
  "testcontainers"
  "typescript"
  "vite-tsconfig-paths"
  "vitest"
)

install_packages() {
  local package_type=$1
  shift
  local packages=("$@")

  echo "Installing $package_type: ${packages[*]}"
  npm install $package_type "${packages[@]}"
}

install_packages "" "${dependencies[@]}"
install_packages "-D" "${devDependencies[@]}"

echo "Installation completed successfully."
