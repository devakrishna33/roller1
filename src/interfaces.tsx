export interface AuthUserObject {
  id?: string;
  name?: string;
  email?: string;
}

export interface Project {
  id: string;
  title?: string;
  description?: string;
  author?: AuthUserObject;
  photo?: string;
  updatedAt?: string;
  createdAt?: string;
  status?: string;
}

export interface Coordinate {
  lng: number;
  lat: number;
}

export interface Annotation {
  id: string;
  author: AuthUserObject;
  project?: Project;
  name: string;
  groups?: Annotation[];
  parent?: Annotation;
  isLeaf: boolean;
  points?: Point[];
}

export interface Point {
  id: string;
  name: string;
  parent?: Annotation;
  project: Project;
  coordinte: Coordinate;
  color: string;
  size: number;
  description?: string;
}
