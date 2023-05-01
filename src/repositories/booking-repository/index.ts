import { Booking, Room } from '@prisma/client';
import { prisma } from '@/config';

async function findBookingByUserId(userId: number): Promise<Booking> {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
  });
}

async function create(userId: number, roomId: number): Promise<Booking> {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}

async function findRoomById(roomId: number): Promise<Room> {
  return prisma.room.findFirst({
    where: {
      id: roomId,
    },
  });
}

async function countTakenSpots(roomId: number): Promise<any> {
  return prisma.booking.count({
    where: {
      roomId,
    },
  });
}

async function updateBooking(bookingId: number, roomId: number) {
  await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      roomId,
    },
  });
}

const bookingRepository = {
  findBookingByUserId,
  create,
  findRoomById,
  countTakenSpots,
  updateBooking,
};

export default bookingRepository;
