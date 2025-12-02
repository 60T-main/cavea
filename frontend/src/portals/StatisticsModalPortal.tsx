import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function StatisticsModalPortal({ children }: any) {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalRoot(document.getElementById("overlay-portal-root"));
  }, []);

  return portalRoot ? createPortal(children, portalRoot) : null;
}
