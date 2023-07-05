import { AxiosResponse } from "axios";

export type TDeleteFunction = (id: number) => Promise<void>;
export type THandleResponseDelete = (isSuccess: boolean, data: any) => void;

export type TUseDeleteOptions = {
  confirmPromptDelete: boolean;
  handleResponseDelete: THandleResponseDelete;
}

export type TUseDeleteResult = {
  deleteById: (id: number) => void;
  deleteFinally: (id: number) => Promise<void>;
  showConfirmationDelete: boolean;
  handleCancelDelete: () => void;
  resultDelete: any;
  idToDelete: number | null;
  loadingDelete: boolean;
  errorDelete: boolean;
  isSuccessDelete: boolean;
}