import { useState } from "react";
import { TDeleteFunction, THandleResponseDelete, TUseDeleteResult } from "../types/useDelete";

const useDelete = (
  deleteFunction: TDeleteFunction,
  confirmPromptDelete: boolean,
  handleResponseDelete: THandleResponseDelete
): TUseDeleteResult => {
  const [showConfirmationDelete, setShowConfirmationDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [errorDelete, setErrorDelete] = useState(false);
  const [resultDelete, setResultDelete] = useState<any>(null);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  const [isSuccessDelete, setIsSuccessDelete] = useState(false);

  const deleteById = (id: number) => {
    if (confirmPromptDelete) {
      setIdToDelete(id);
      setShowConfirmationDelete(true);
    } else {
      deleteFinally(id);
    }
  };

  const deleteFinally = async (id: number) => {
    try {
      setLoadingDelete(true);
      const response = await deleteFunction(id);
      handleResponseDelete(true, response);
    } catch (error) {
      setErrorDelete(true);
      handleResponseDelete(false, null);
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmationDelete(false);
  };

  return {
    deleteById,
    deleteFinally,
    showConfirmationDelete,
    handleCancelDelete,
    resultDelete,
    idToDelete,
    loadingDelete,
    errorDelete,
    isSuccessDelete,
  };
};

export default useDelete;
