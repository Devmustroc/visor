import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function convertFromMillUnit(value: number) {
  return value / 1000
}

export function convertToMillUnit(value: number) {
  return value * 1000
}

export const formatCurrency = (value: number) => {
  return Intl.NumberFormat("eu-EU", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(value)
}