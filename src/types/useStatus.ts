
export type TStatusFunction = (id: number) => void;

export type TUseSatusOptions = {
  confirmPromptDelete: boolean;
  
}

export type TUseStatusResult = {
  statusById: (id: number) => void;
  statusFinally: (id: number) => Promise<void>;
  showConfirmationStatus: boolean;
  handleCancelStatus: () => void;
  resultStatus: any;
  idToStatus: number | undefined;
  loadingStatus: boolean;
  errorStatus: boolean;
  isSuccessStatus: boolean;
  setResultStatus: React.Dispatch<React.SetStateAction<string | undefined>>;

}