export enum EmployeeStatus {
  ACTIVE = 'ACTIVE',
  OFFBOARDED = 'OFFBOARDED'
}

export interface Equipment {
  id: string;
  name: string;
}

export interface Employee {
  id: string;
  name: string;
  department: string;
  status: EmployeeStatus;
  email: string;
  equipments: Equipment[];
}

export interface OffboardRequest {
  address: {
    streetLine1: string;
    country: string;
    postalCode: string;
    receiver: string;
  };
  notes: string;
  phone: string;
  email: string;
}
