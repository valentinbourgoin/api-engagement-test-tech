# Usage

## Installation

```bash
git clone https://github.com/valentinbourgoin/api-engagement-test-tech.git
cd api-engagement-test-tech
npm install
npx prisma migrate dev
```

## Lancer le serveur

```bash
npm run dev
```

## Données de démonstration

Les données de démonstration sont dans le fichier `src/prisma/seed.ts`

- Mission 1: ab35d276-6215-43db-9918-a1169cef471f
- Publisher 1: b0d4c3e0-a0f8-4b9c-b2c5-f0e8f5e3f4e9

Celles-ci ont été importées dans la base de données lors de la création de celle-ci.
Si besoin, on peut lancer manuellement un script de seeding avec la commande suivante:

```bash
npm run seed
```

# Endpoints

## Mission

### GET /r/:missionId/:publisherId

Retourne l'URL de l'application pour la mission et le publisher

## Application

### GET /r/apply?missionId=:missionId&publisherId=:publisherId&view=:view

Crée une application pour la mission et le publisher

## Impression

### GET /r/impression/:missionId/:publisherId

Crée une impression pour la mission et le publisher
