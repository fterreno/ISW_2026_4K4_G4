import { Actividad } from "../models/models";

export const actividadesEnMemoria: Actividad[] = [
  {
    nombre: "Tirolesa",
    horarios: [
      { id: "TIR-1", hora: "09:00", cuposDisponibles: 8, parqueAbierto: true },
      { id: "TIR-2", hora: "11:00", cuposDisponibles: 0, parqueAbierto: true },
      { id: "TIR-3", hora: "14:00", cuposDisponibles: 5, parqueAbierto: true },
      { id: "TIR-4", hora: "17:00", cuposDisponibles: 3, parqueAbierto: false },
    ],
  },
  {
    nombre: "Safari",
    horarios: [
      { id: "SAF-1", hora: "08:30", cuposDisponibles: 12, parqueAbierto: true },
      { id: "SAF-2", hora: "12:00", cuposDisponibles: 6, parqueAbierto: true },
      { id: "SAF-3", hora: "16:00", cuposDisponibles: 0, parqueAbierto: true },
    ],
  },
  {
    nombre: "Palestra",
    horarios: [
      { id: "PAL-1", hora: "10:00", cuposDisponibles: 10, parqueAbierto: true },
      { id: "PAL-2", hora: "13:00", cuposDisponibles: 4, parqueAbierto: true },
      { id: "PAL-3", hora: "15:00", cuposDisponibles: 0, parqueAbierto: false },
    ],
  },
  {
    nombre: "Jardinería",
    horarios: [
      { id: "JAR-1", hora: "09:30", cuposDisponibles: 15, parqueAbierto: true },
      { id: "JAR-2", hora: "14:30", cuposDisponibles: 8, parqueAbierto: true },
    ],
  },
];
