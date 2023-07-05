import { useState } from "react";
import { TStatusFunction, TUseStatusResult } from "../types/useStatus";

const useStatus = (
  StatusFunction: TStatusFunction,
  confirmPromptStatus: boolean,
  
): TUseStatusResult => {
  const [showConfirmationStatus, setShowConfirmationStatus] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [resultStatus, setResultStatus] = useState<string | undefined>(undefined);
  const [idToStatus, setIdToStatus] = useState<number | undefined>(undefined);
  const [isSuccessStatus, setIsSuccessStatus] = useState(false);

  const statusById = (id: number) => {
    if (confirmPromptStatus) {
        setIdToStatus(id);
      setShowConfirmationStatus(true);
      
    } else {
        statusFinally(id);
    }
  };

  const statusFinally =  async (id: number) => {
    try {
        setLoadingStatus(true);
      const response = await StatusFunction(id);
     
      } catch (error) {
      setErrorStatus(true);
      
    } finally {
        setLoadingStatus(false);
    }
  };

  const handleCancelStatus = () => {
    setShowConfirmationStatus(false);
  };

  return {
    statusById,
    statusFinally,
    showConfirmationStatus,
    handleCancelStatus,
    resultStatus,
    idToStatus,
    loadingStatus,
    errorStatus,
    isSuccessStatus,
    setResultStatus
  };
};

export default useStatus;
