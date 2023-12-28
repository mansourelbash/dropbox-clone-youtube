import { create } from "zustand";

interface AppState {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (open: boolean) => void;

  isRenameModalOpen: boolean;
  setIsRenameModalOpen: (open: boolean) => void;

  fileId: string | null;
  setFileId: (fileId: string | null) => void;

  filename: string;
  setFilename: (filename: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  fileId: null,
  setFileId: (fileId: string | null) => set({ fileId: fileId }),

  filename: "",
  setFilename: (filename: string) => set({ filename: filename }),

  isDeleteModalOpen: false,
  setIsDeleteModalOpen: (open: boolean) => set({ isDeleteModalOpen: open }),

  isRenameModalOpen: false,
  setIsRenameModalOpen: (open: boolean) => set({ isRenameModalOpen: open }),
}));
