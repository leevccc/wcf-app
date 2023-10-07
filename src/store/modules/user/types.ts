export type RoleType = '' | '*' | 'admin' | 'user';

export interface RoleState {
  id?: number;
  name?: string;
}

export interface UserOptions {
  id: number;
  name: string;
}

export interface UserState {
  id?: number;
  username?: string;
  email?: string;
  name?: string;
  avatar?: string;
  gender?: string;
  address?: string;
  idNumber?: string;
  hireDate?: string;
  resignationDate?: string;
  role: RoleType;
  roles?: Array<RoleState>;
  createTime?: string;
  updateTime?: string;
}
