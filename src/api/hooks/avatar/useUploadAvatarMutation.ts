// hooks/useUploadAvatarMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadAvatar } from '../../services/avatarService';

export const useUploadAvatarMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['avatar'] });
    },
    onError: (error) => {
      console.error('Ошибка загрузки аватара:', error);
    },
  });
};