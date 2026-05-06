export class Usermodel {
  id: number = 0;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password?: string;
  dateOfBirth: string = '';
  age: number = 0;
  gender: string = '';
  country: string = '';
  address: string = '';
  termsAccepted: boolean = false;
  createdOn?: string;
}