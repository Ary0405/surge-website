import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

async function deleteUser(userId: string) {
  if (!userId || userId === '') {
    console.error('User ID is required.');
    return;
  }
  console.log(`Attempting to delete user with ID ${userId}...`);
  try {
    const user = await getUser(userId);
    if (user?.Team) {
      const teamIds = user.Team.map(team => team.id);
      await deleteTeams(teamIds);
    }
    const result = await db.user.delete({
      where: {
        id: userId,
      },
    });
    console.log(`User with ID ${userId} and all related fields have been deleted.`);
    console.log('Delete result:', result);
  } catch (error) {
    console.error('Error deleting user:', error);
  } finally {
    await db.$disconnect();
    console.log('Database connection closed.');
  }
}

async function deleteTeams(teamIds : string[]) {
  console.log(`Attempting to delete teams with IDs ${teamIds.join(', ')}...`);
  try {
    const result = await db.team.deleteMany({
      where: {
        id: { in: teamIds },
      },
    });
    console.log(`Teams with IDs ${teamIds.join(', ')} and all related fields have been deleted.`);
    console.log('Delete result:', result);
  } catch (error) {
    console.error('Error deleting teams:', error);
  }
}

async function getUser(userId : string) {
  console.log(`Attempting to get user with ID ${userId}...`);
  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        Team: true,
      },
    });
    console.log('User found:', user);
    return user;
  } catch (error) {
    console.error('Error getting user:', error);
  }
}

const deleteUserIds = [''];

deleteUserIds.forEach((userId) => {
  deleteUser(userId).then(() => {
    console.log('User deleted successfully');
  }).catch((error) => {
    console.error('Error deleting user:', error);
  });
});