import { useState } from "react";
import { UseEditProps } from "../types/useEdit";




export const useEdit = ({ editFunction, handleResponse }: UseEditProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [idToEdit, setIdToEdit] = useState<number | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [updatedData, setUpdatedData] = useState<any | null>(null);

  const EditById = (id: number, data: any) => {
    setIdToEdit(id);
    setUpdatedData(data || {});
    setShowConfirmation(true);
  };

  const editFinally = async (id: number, data: any) => {
    try {
      setLoading(true);
      const response = await editFunction(id, data);

      handleResponse(true, response);
    } catch (error) {
      setError(true);
      handleResponse(false, null);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return {
    EditById,
    editFinally,
    showConfirmation,
    handleCancel,
    result,
    idToEdit,
    setIdToEdit,
    loading,
    error,
    isSuccess,
    updatedData,
    setUpdatedData,
  };
};
