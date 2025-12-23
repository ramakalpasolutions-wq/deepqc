"use client";

import { useEffect } from "react";

export default function Background() {
  useEffect(() => {
    if (typeof window === "undefined") return;   // guard

    let vantaInstance = null;
    let threeScript, vantaScript;

    const loadScript = (src) =>
      new Promise((res, rej) => {
        const s = document.createElement("script");
        s.src = src;
        s.async = true;
        s.onload = () => res(s);
        s.onerror = rej;
        document.head.appendChild(s);
      });

    Promise.resolve()
      .then(() =>
        loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        )
      )
      .then((s) => {
        threeScript = s;
        return loadScript(
          "https://cdn.jsdelivr.net/npm/vanta/dist/vanta.net.min.js"
        );
      })
      .then((s) => {
        vantaScript = s;
      })
      .then(() => {
        try {
          const el = document.querySelector("#bg");
          if (el && window.VANTA && window.THREE && !el.__vanta) {
            vantaInstance = window.VANTA.NET({
              el: el,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.0,
              minWidth: 200.0,
              color: 0x1b4a7a,
              color2: 0x2d6fb2,
              backgroundColor: 0x05060a,
              backgroundAlpha: 0.55,
              points: 12.0,
              maxDistance: 20.0,
              spacing: 18.0,
            });
            el.__vanta = vantaInstance;
          }
        } catch (err) {
          console.error("[VANTA] Init error", err);
        }
      })
      .catch((err) => {
        console.error("[VANTA] Load error", err);
      });

    return () => {
      const el = document.querySelector("#bg");
      if (el && el.__vanta) {
        try {
          el.__vanta.destroy();
          delete el.__vanta;
        } catch {}
      }
      if (threeScript?.parentNode) threeScript.parentNode.removeChild(threeScript);
      if (vantaScript?.parentNode) vantaScript.parentNode.removeChild(vantaScript);
    };
  }, []);

  return (
    <div
      id="bg"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
