"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { locations } from "@/lib/content";
import type { Location } from "@/lib/schemas";

const KEY = "wackys.location";

type Ctx = {
  slug: string | null;
  location: Location | undefined;
  setLocation: (slug: string | null) => void;
  pickerOpen: boolean;
  openPicker: () => void;
  closePicker: () => void;
};

const LocationContext = createContext<Ctx | null>(null);

/** Keeps the guest's chosen restaurant for the whole browsing session (sessionStorage), so offers, hours and contact follow them. */
export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [slug, setSlug] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(KEY);
      if (saved && locations.some((l) => l.slug === saved)) setSlug(saved);
    } catch { /* storage blocked — location just isn't remembered */ }
  }, []);

  const setLocation = useCallback((next: string | null) => {
    setSlug(next);
    try {
      if (next) sessionStorage.setItem(KEY, next);
      else sessionStorage.removeItem(KEY);
    } catch { /* ignore */ }
  }, []);

  const value = useMemo<Ctx>(() => ({
    slug,
    location: locations.find((l) => l.slug === slug),
    setLocation,
    pickerOpen,
    openPicker: () => setPickerOpen(true),
    closePicker: () => setPickerOpen(false),
  }), [slug, setLocation, pickerOpen]);

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}

export function useLocationChoice() {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error("useLocationChoice must be used inside LocationProvider");
  return ctx;
}
