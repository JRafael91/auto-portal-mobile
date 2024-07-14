export interface IOrder {
  id: number;
  uid: string;
  info_date: string;
  brand: string;
  model: string;
  year: string;
  vehicle: Vehicle;
  customer: string;
  status: Status;

  items: any[];
}

export enum Vehicle{
  TRUCK = "TRUCK",
  SEDAN = "SEDAN"
}

export enum Status {
  PROCESO = "PROCESO"
}