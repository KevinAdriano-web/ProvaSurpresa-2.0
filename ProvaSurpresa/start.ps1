# Script para iniciar o projeto Prova Surpresa

Write-Host "=== Iniciando Prova Surpresa ===" -ForegroundColor Green

# Verifica se as dependências estão instaladas
Write-Host "`nVerificando dependências..." -ForegroundColor Yellow

if (!(Test-Path "Backend\node_modules")) {
    Write-Host "Instalando dependências do Backend..." -ForegroundColor Yellow
    Set-Location Backend
    npm install
    Set-Location ..
}

if (!(Test-Path "Frontend\node_modules")) {
    Write-Host "Instalando dependências do Frontend..." -ForegroundColor Yellow
    Set-Location Frontend
    npm install
    Set-Location ..
}

Write-Host "`nIniciando servidores..." -ForegroundColor Green
Write-Host "Backend: http://localhost:5010" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan

# Inicia o backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\Backend'; npm start"

# Aguarda 2 segundos para o backend iniciar
Start-Sleep -Seconds 2

# Inicia o frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\Frontend'; npm run dev"

Write-Host "`nServidores iniciados!" -ForegroundColor Green
Write-Host "Acesse o frontend em: http://localhost:3000" -ForegroundColor Cyan
