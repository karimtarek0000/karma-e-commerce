export const useCacheExpire = (fetchedAt: Date, timeForExpire: number) => {
  const expireDate = new Date(fetchedAt);
  expireDate.setTime(expireDate.getTime() + timeForExpire);
  const isExpire = expireDate.getTime() > Date.now();

  return isExpire;
};
