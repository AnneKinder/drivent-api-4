import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { changeBooking, getBooking, postBooking } from '@/controllers/booking-controller';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .post('/', postBooking)
  .get('/', getBooking)
  .put('/:bookingId', changeBooking);

export { bookingRouter };
