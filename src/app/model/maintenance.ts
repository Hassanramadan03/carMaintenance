import { User } from "./user";
import { UserCar } from "./user-car";
export class Maintenance {
  kilometers: String;
  userCarId: Number;
  requestId: Number;
  creationDate: Date;
  targetDate: Date;
  deliverDate: Date;
  code: String;
  note: String;
  userId: Number;
  requestStatus: Number;
  approvedDate: Number;
  disapproveDate: Number;
  //serviceId: Number;
  isReaded: Boolean;
  owner: User;
  serviceId: any;
  userCar: UserCar;
}
