export const handleSuccess = async (response: any) => {
  return Promise.resolve(response);
};
export const handleError = async (error: any) => {
  return Promise.reject(error);
};
