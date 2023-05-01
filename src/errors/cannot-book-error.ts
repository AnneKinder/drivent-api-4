import { ApplicationError } from '@/protocols';

export function cannotAccessBookingError(): ApplicationError {
  return {
    name: 'CannotAccessBookingError',
    message: 'Cannot access booking.',
  };
}
