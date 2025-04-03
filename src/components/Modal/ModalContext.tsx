import {createContext} from "react";
import {ModalConfig, ModalContextType} from "@components/Modal/types.ts";

export const ModalContext = createContext<ModalContextType | undefined>(undefined);