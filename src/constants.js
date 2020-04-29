export const ROUTES = {
  REGISTRATION: process.env.PUBLIC_URL + "/rejestracja",
  LOGIN: process.env.PUBLIC_URL + "/logowanie",
  POST: process.env.PUBLIC_URL + "/ogloszenie",
  POST_NEW: process.env.PUBLIC_URL + "/nowe-ogloszenie",
  HOME: process.env.PUBLIC_URL + "/home",
  ROOT: process.env.PUBLIC_URL + "/",
};

export const ERRORS = {
  "auth/invalid-email": "Nieprawidłowy adres email.",
  "auth/wrong-password": "Nieprawidłowe hasło.",
  "auth/email-already-in-use": "Użytkownik o podanym emailu już istnieje.",
  "auth/user-not-found": "Użytkownik nie istnieje.",
  "auth/popup-closed-by-user": "Pop up zamknięty przez użytkownika.",
  "auth/weak-password": "Hasło za słabe.",
};
