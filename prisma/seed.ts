import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create manufacturers
  const automaticProducts = await prisma.machineManufacturer.upsert({
    where: { id: '7f7f7f7f-7f7f-7f7f-7f7f-7f7f7f7f7f7f' },
    update: {},
    create: {
      id: '7f7f7f7f-7f7f-7f7f-7f7f-7f7f7f7f7f7f',
      name: 'Automatic Products',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  });

  const crane = await prisma.machineManufacturer.upsert({
    where: { id: '8f8f8f8f-8f8f-8f8f-8f8f-8f8f8f8f8f8f' },
    update: {},
    create: {
      id: '8f8f8f8f-8f8f-8f8f-8f8f-8f8f8f8f8f8f',
      name: 'Crane',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  });

  const wittern = await prisma.machineManufacturer.upsert({
    where: { id: '9f9f9f9f-9f9f-9f9f-9f9f-9f9f9f9f9f9f' },
    update: {},
    create: {
      id: '9f9f9f9f-9f9f-9f9f-9f9f-9f9f9f9f9f9f',
      name: 'Wittern',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  });

  const ap132 = await prisma.machineType.upsert({
    where: { id: 'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1' },
    update: {},
    create: {
      id: 'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1',
      name: 'AP 132',
      manufacturerId: automaticProducts.id,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  });

  const crane167 = await prisma.machineType.upsert({
    where: { id: 'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2' },
    update: {},
    create: {
      id: 'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2',
      name: '167',
      manufacturerId: crane.id,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  });

  const witternFsi = await prisma.machineType.upsert({
    where: { id: 'c3c3c3c3-c3c3-c3c3-c3c3-c3c3c3c3c3c3' },
    update: {},
    create: {
      id: 'c3c3c3c3-c3c3-c3c3-c3c3-c3c3c3c3c3c3',
      name: 'FSI USI 3589',
      manufacturerId: wittern.id,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  });

  // Create items
  const items = await Promise.all([
    prisma.item.upsert({
      where: { id: 'd1d1d1d1-d1d1-d1d1-d1d1-d1d1d1d1d1d1' },
      update: {},
      create: {
        id: 'd1d1d1d1-d1d1-d1d1-d1d1-d1d1d1d1d1d1',
        name: 'Lenny & Larry\'s Complete Cookie - Chocolate Chip',
        basePrice: 3.00,
        expirationPeriod: 180,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }),
    prisma.item.upsert({
      where: { id: 'd2d2d2d2-d2d2-d2d2-d2d2-d2d2d2d2d2d2' },
      update: {},
      create: {
        id: 'd2d2d2d2-d2d2-d2d2-d2d2-d2d2d2d2d2d2',
        name: 'Quaker Rice Crisps - Cheddar',
        basePrice: 2.50,
        expirationPeriod: 120,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }),
    prisma.item.upsert({
      where: { id: 'd3d3d3d3-d3d3-d3d3-d3d3-d3d3d3d3d3d3' },
      update: {},
      create: {
        id: 'd3d3d3d3-d3d3-d3d3-d3d3-d3d3d3d3d3d3',
        name: 'Kind Bar - Dark Chocolate Nuts & Sea Salt',
        basePrice: 2.50,
        expirationPeriod: 240,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }),
    prisma.item.upsert({
      where: { id: 'd4d4d4d4-d4d4-d4d4-d4d4-d4d4d4d4d4d4' },
      update: {},
      create: {
        id: 'd4d4d4d4-d4d4-d4d4-d4d4-d4d4d4d4d4d4',
        name: 'Smartwater - 20oz',
        basePrice: 2.00,
        expirationPeriod: 365,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
  ]);

  // Create locations
  const locations = await Promise.all([
    prisma.location.upsert({
      where: { id: 'e1e1e1e1-e1e1-e1e1-e1e1-e1e1e1e1e1e1' },
      update: {},
      create: {
        id: 'e1e1e1e1-e1e1-e1e1-e1e1-e1e1e1e1e1e1',
        address1: '800 W Olympic Blvd',
        city: 'Los Angeles',
        stateOrProvince: 'CA',
        postalCode: '90015',
        country: 'USA',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }),
    prisma.location.upsert({
      where: { id: 'e2e2e2e2-e2e2-e2e2-e2e2-e2e2e2e2e2e2' },
      update: {},
      create: {
        id: 'e2e2e2e2-e2e2-e2e2-e2e2-e2e2e2e2e2e2',
        address1: '6000 Santa Monica Blvd',
        city: 'Los Angeles',
        stateOrProvince: 'CA',
        postalCode: '90038',
        country: 'USA',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }),
    prisma.location.upsert({
      where: { id: 'e3e3e3e3-e3e3-e3e3-e3e3-e3e3e3e3e3e3' },
      update: {},
      create: {
        id: 'e3e3e3e3-e3e3-e3e3-e3e3-e3e3e3e3e3e3',
        address1: '1000 Universal Studios Blvd',
        city: 'Universal City',
        stateOrProvince: 'CA',
        postalCode: '91608',
        country: 'USA',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
  ]);

  // Create machines
  const machines = await Promise.all([
    prisma.machine.upsert({
      where: { id: 'f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1' },
      update: {},
      create: {
        id: 'f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1',
        name: 'LA Live Snack Machine 1',
        machineTypeId: ap132.id,
        manufacturerId: automaticProducts.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }),
    prisma.machine.upsert({
      where: { id: 'f2f2f2f2-f2f2-f2f2-f2f2-f2f2f2f2f2f2' },
      update: {},
      create: {
        id: 'f2f2f2f2-f2f2-f2f2-f2f2-f2f2f2f2f2f2',
        name: 'Hollywood Forever Drinks',
        machineTypeId: crane167.id,
        manufacturerId: crane.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }),
    prisma.machine.upsert({
      where: { id: 'f3f3f3f3-f3f3-f3f3-f3f3-f3f3f3f3f3f3' },
      update: {},
      create: {
        id: 'f3f3f3f3-f3f3-f3f3-f3f3-f3f3f3f3f3f3',
        name: 'Universal Studios Combo 1',
        machineTypeId: witternFsi.id,
        manufacturerId: wittern.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
  ]);

  // Create machine locations
  await Promise.all([
    prisma.machineLocation.upsert({
      where: { id: 'g1g1g1g1-g1g1-g1g1-g1g1-g1g1g1g1g1g1' },
      update: {},
      create: {
        id: 'g1g1g1g1-g1g1-g1g1-g1g1-g1g1g1g1g1g1',
        name: 'LA Live Main Entrance',
        machineId: machines[0].id,
        locationId: locations[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }),
    prisma.machineLocation.upsert({
      where: { id: 'g2g2g2g2-g2g2-g2g2-g2g2-g2g2g2g2g2g2' },
      update: {},
      create: {
        id: 'g2g2g2g2-g2g2-g2g2-g2g2-g2g2g2g2g2g2',
        name: 'Cemetery Main Gate',
        machineId: machines[1].id,
        locationId: locations[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }),
    prisma.machineLocation.upsert({
      where: { id: 'g3g3g3g3-g3g3-g3g3-g3g3-g3g3g3g3g3g3' },
      update: {},
      create: {
        id: 'g3g3g3g3-g3g3-g3g3-g3g3-g3g3g3g3g3g3',
        name: 'Universal Studios Entry Plaza',
        machineId: machines[2].id,
        locationId: locations[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
  ]);

  // Create machine items
  await Promise.all([
    prisma.machineItem.upsert({
      where: { id: 'h1h1h1h1-h1h1-h1h1-h1h1-h1h1h1h1h1h1' },
      update: {},
      create: {
        id: 'h1h1h1h1-h1h1-h1h1-h1h1-h1h1h1h1h1h1',
        machineId: machines[0].id,
        itemId: items[0].id,
        quantity: 15
      }
    }),
    prisma.machineItem.upsert({
      where: { id: 'h2h2h2h2-h2h2-h2h2-h2h2-h2h2h2h2h2h2' },
      update: {},
      create: {
        id: 'h2h2h2h2-h2h2-h2h2-h2h2-h2h2h2h2h2h2',
        machineId: machines[1].id,
        itemId: items[3].id,
        quantity: 24
      }
    }),
    prisma.machineItem.upsert({
      where: { id: 'h3h3h3h3-h3h3-h3h3-h3h3-h3h3h3h3h3h3' },
      update: {},
      create: {
        id: 'h3h3h3h3-h3h3-h3h3-h3h3-h3h3h3h3h3h3',
        machineId: machines[2].id,
        itemId: items[2].id,
        quantity: 18
      }
    })
  ]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
