export const inputAlly = (elementBindName: string) => ({
  InputProps: {
    id: elementBindName,
  },
  InputLabelProps: {
    htmlFor: elementBindName,
  },
});
