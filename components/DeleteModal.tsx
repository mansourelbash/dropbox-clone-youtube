'use client'
import { CopyIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAppStore } from "@/store/store"
import { useUser } from "@clerk/nextjs"
import { db, storage } from "@/firebase"
import {deleteObject, ref} from "firebase/storage"
import { deleteDoc, doc } from "firebase/firestore"

export function DeleteModal() {
  const {user} = useUser();

  const [setIsDeleteModalOpen, isDeleteModalOpen, fileId, setFileId] = useAppStore((state)=>[
    state.setIsDeleteModalOpen,
    state.isDeleteModalOpen,
    state.fileId,
    state.setFileId
  ])

  async function deleteFile(){
    if(!user || !fileId ) return ;
    const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);
    try {
      deleteObject(fileRef).then(async () =>{
        deleteDoc(doc(db, "users",user.id, "files", fileId)).then(()=>{
          console.log('deleted file');
        });
      })
    } catch (error) {
      console.log('error deleting',error);
    }
    setIsDeleteModalOpen(false);

  }

  return (
    <Dialog 
    open={isDeleteModalOpen}
    onOpenChange={(isOpen)=>{
      setIsDeleteModalOpen(isOpen);
    }}
      >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete ? </DialogTitle>
          <DialogDescription>
            this action cannot be undone this will permantley delete your file !
          </DialogDescription>
        </DialogHeader>


        <div className="flex py-3 space-x-2">
          <Button 
          size="sm"
          className="px-3 flex-1"
          variant={"ghost"}
          onClick={()=> setIsDeleteModalOpen(false)}>
            <span className="sr-only"> cancel</span>
            <span> cancel</span>
          </Button>
          <Button
          type="submit"
          size="sm"
          className="px-3 flex-1"
          onClick={()=> deleteFile()}>
            <span className="sr-only"> Delete</span>
            <span > Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
