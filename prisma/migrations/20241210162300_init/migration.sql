-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "basePrice" DOUBLE PRECISION,
    "expirationPeriod" TEXT,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MachineItem" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "machineId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "MachineItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MachineLocation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT,
    "city" TEXT NOT NULL,
    "stateOrProvince" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "MachineLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Machine" (
    "id" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Machine_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MachineItem" ADD CONSTRAINT "MachineItem_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MachineItem" ADD CONSTRAINT "MachineItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
