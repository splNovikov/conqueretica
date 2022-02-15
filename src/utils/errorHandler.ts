// todo [after release]: error handling
// todo throw(error)
// eslint-disable-next-line no-console
export const httpErrorHandler = (e: unknown) => console.error(e);

// eslint-disable-next-line no-console
export const defaultErrorHandler = (message: string) => console.error(message);
