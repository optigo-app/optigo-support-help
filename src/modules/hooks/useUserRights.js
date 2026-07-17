import { useState, useEffect } from "react";

function useUserRights() {
  // safe parse wrapper
  const safeParse = (str) => {
    try {
      return JSON.parse(str);
    } catch {
      return null;
    }
  };

  // read once on mount
  const [userRights, setUserRights] = useState(() => {
    const raw = sessionStorage.getItem("userRights");
    return raw ? safeParse(raw) : null;
  });

  // optional: keep in sync if other tabs/windows update it
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "userRights") {
        setUserRights(e.newValue ? safeParse(e.newValue) : null);
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return [userRights, setUserRights];
}

export { useUserRights };
