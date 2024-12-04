import { $http } from '@/utils';

export interface ICat {
  name: string;
  age: number;
}

export interface IResponse<T> {
  data: T;
  total: number;
}

export const getCats = async () => {
  const response = await $http.get<IResponse<ICat[]>>('/api/cats/all');
  return {
    data: response.data.data,
    total: response.data.total,
  };
};
