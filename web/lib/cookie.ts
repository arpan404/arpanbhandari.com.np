const getCookie = (name: string): string | null => {
  try {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const addCookie = (name: string, value: string, days: number = 7) => {
  try {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
  } catch (e) {
    console.error(e);
  }
};

export { getCookie, addCookie };
