export type MachineStatus = 'Running' | 'Idle' | 'Stopped';

export interface Machine {
  _id?: string;
  name: string;
  status: MachineStatus;
  temperature: number;
  energyConsumption: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface User{
  _id?: string;
  name: string;
  email: string;
  passwork: string;
  role: "Admin" | "User";
}
