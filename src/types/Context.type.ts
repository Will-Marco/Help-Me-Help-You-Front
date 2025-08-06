export type ContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
  showNavbar: boolean;
  setShowNavbar: (value: boolean) => void;
};
