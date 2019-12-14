export interface AuthUserObject {
  id?: string;
  name?: string;
  email?: string;
}

export interface Project {
  id: string;
  name?: string;
  description?: string;
  author?: AuthUserObject;
  thumbnail?: string;
  updatedAt?: string;
  createdAt?: string;
}
