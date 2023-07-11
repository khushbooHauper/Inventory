export type EditFunction = (id: number, data: any) => Promise<any>;
export type HandleResponse = (isSuccess: boolean, result: any) => void;

export interface UseEditProps {
  editFunction: EditFunction;
  handleResponse: HandleResponse;
}