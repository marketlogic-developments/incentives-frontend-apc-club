export const setTokenSessionStorage = (value: string): void => {
  sessionStorage.setItem("token", value);
};

export const getTokenSessionStorage = (): string | null => {
  const tk = sessionStorage.getItem("token");

  if (!tk) {
console.error("Error to catch token");
    return null
  }

  return tk;
};

