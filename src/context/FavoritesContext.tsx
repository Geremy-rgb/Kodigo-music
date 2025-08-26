import type { FavoritesContextType } from "./types";
import { createContext } from "react";

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);