// hooks/useUploadImagesMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadImages } from '../../services/imagesService';
import { useDispatch } from "react-redux";
import { addLogEntry, createLog } from "../../../store/slices/logsSlice";

export const useUploadImagesMutation = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: uploadImages,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
      dispatch(addLogEntry(createLog({ message: "Изображение загружено", type: "info" })));
    },
    onError: (error) => {
      console.error('Ошибка загрузки изображений:', error);
      dispatch(addLogEntry(createLog({ message: "Ошибка загрузки", type: "error" })));
    },
  });
};