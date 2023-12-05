"use client";
import { useState, useEffect } from 'react';
import { CrispChat } from "@/components/crisp-chat";
const [isClient, setIsClient] = useState(false)
useEffect(() => {
  setIsClient(true)
}, [])
export const CrispProvider = () => {
  return <CrispChat />
};