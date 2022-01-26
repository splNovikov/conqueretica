import { defaultErrorHandler, httpErrorHandler } from './errorHandler';

describe('Error Handler', () => {
  it('Default Error Handler should log error', () => {
    console.error = jest.fn();
    const errMessage = 'Error handler activated!';

    defaultErrorHandler(errMessage);
    expect(console.error).toHaveBeenCalledWith(errMessage);
  });

  it('Http Error Handler should log error', () => {
    console.error = jest.fn();
    const err = { msg: 'Error handler activated!' };

    httpErrorHandler(err);
    expect(console.error).toHaveBeenCalledWith(err);
  });
});
