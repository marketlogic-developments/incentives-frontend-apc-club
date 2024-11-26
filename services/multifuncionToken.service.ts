export const setTokenSessionStorage = (value: string): void => {
  sessionStorage.setItem("token", value);
};

export const getTokenSessionStorage = (): string | void => {
  const tk = sessionStorage.getItem("token");

  if (!tk) {
    return console.error("Error to catch token");
  }

  return tk;
};
