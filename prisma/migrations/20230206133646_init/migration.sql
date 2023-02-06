-- CreateTable
CREATE TABLE "PokemonTeam" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Pokemon" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,
    "specie" TEXT NOT NULL,
    "teamId" TEXT,
    CONSTRAINT "Pokemon_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "PokemonTeam" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "PokemonTeam_name_key" ON "PokemonTeam"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_name_key" ON "Pokemon"("name");
