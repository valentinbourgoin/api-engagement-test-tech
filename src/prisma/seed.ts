import prisma from '../prisma/client';

async function main() {

    const missionUid = "ab35d276-6215-43db-9918-a1169cef471f";
    const publisherUid = "b0d4c3e0-a0f8-4b9c-b2c5-f0e8f5e3f4e9";

    const mission = await prisma.mission.upsert({
        where: {
            id: missionUid
        },
        update: {},
        create: {
            id: missionUid,
            name: 'Mission 1',
            applicationUrl: 'https://valentinbourgoin.fr',
        }
    });

    const publisher = await prisma.publisher.upsert({
        where: {
            id: publisherUid
        },
        update: {},
        create: {
            id: publisherUid,
            name: 'Publisher 1',
        }
    });
  console.log({ mission, publisher })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })