import httpStatus from 'http-status';
import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';

export async function getBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;

  try {
    const booking = await bookingService.getBookingByUserId(userId);
    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    next(error);
  }
}

export async function postBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const { roomId } = req.body;

  try {
    const id = await bookingService.createBooking(userId, Number(roomId));
    return res.status(httpStatus.OK).send(id);
  } catch (error) {
    next(error);
  }
}

export async function changeBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { bookingId } = req.params;
  const { roomId } = req.body;
  const { userId } = req;

  try {
    await bookingService.updateBooking(Number(bookingId), roomId, userId);

    const result = {
      bookingId: Number(bookingId),
    };
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    next(error);
  }
}
