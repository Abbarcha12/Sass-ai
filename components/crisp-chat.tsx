"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("c363ec7c-c861-43f4-8817-1862c1957953");
  }, []);

  return null;
};