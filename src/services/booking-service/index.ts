import ticketService from '../tickets-service';
import { cannotAccessBookingError, notFoundError } from '@/errors';
import ticketsRepository from '@/repositories/tickets-repository';
import bookingRepository from '@/repositories/booking-repository';

async function getTicketByUserId(userId: number) {
  try {
    const ticket = await ticketService.getTicketByUserId(userId);
    const { TicketType } = await ticketsRepository.findTickeWithTypeById(ticket.id);
    if (!ticket || ticket.status === 'RESERVED' || TicketType.isRemote || !TicketType.includesHotel) {
      throw cannotAccessBookingError();
    }

    return ticket;
  } catch {
    throw cannotAccessBookingError();
  }
}

async function getBookingByUserId(userId: number) {
  try {
    const booking = await bookingRepository.findBookingByUserId(userId);
    if (!booking) {
      throw notFoundError();
    }

    const roomInfo = await bookingRepository.findRoomById(booking.roomId);

    const result = {
      id: booking.id,
      Room: roomInfo,
    };

    return result;
  } catch {
    throw notFoundError();
  }
}

async function createBooking(userId: number, roomId: number) {
  await getTicketByUserId(userId);

  try {
    const room = await bookingRepository.findRoomById(roomId);
    if (!room) {
      throw notFoundError();
    }

    const takenSpotsinRoom = await bookingRepository.countTakenSpots(roomId);
    if (Number(takenSpotsinRoom) >= Number(room.capacity)) {
      throw cannotAccessBookingError();
    }

    await bookingRepository.create(userId, roomId);

    const { id } = await bookingRepository.findBookingByUserId(userId);
    return id;
  } catch {
    throw cannotAccessBookingError();
  }
}

const bookingService = {
  getTicketByUserId,
  getBookingByUserId,
  createBooking,
};

export default bookingService;
