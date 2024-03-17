export const bigIntHelper = (param: any): any => {
  return JSON.stringify(
    param,
    (key, value) =>
      typeof value === 'bigint'
        ? value.toString()
        : value,
    2,
  );
};
