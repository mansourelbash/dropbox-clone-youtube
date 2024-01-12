'use client';
import { db, storage } from '@/firebase';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import toast from 'react-hot-toast';
const DropzoneComponent = () => {
  const [loading, setLoading] = useState(false);
  const {isLoaded, isSignedIn, user} = useUser()
  const onDrop = (acceptedFiles: File[]) =>{
    acceptedFiles.forEach((file)=>{
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading is aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = async () => {
        await uploadPost(file);
      }
      reader.readAsArrayBuffer(file);
    })
  }

  const uploadPost = async (selectedFile: File) =>{
    if(loading) return;
    if(!user) return;
    setLoading(true);
    const todoId = toast.loading("Uploading ...")


    const docRef = await addDoc(collection(db,"users", user.id ,"files"),{
      userId: user.id,
      filename: selectedFile.name,
      fullname: user.fullName,
      profileImage: user.imageUrl,
      timestamp: serverTimestamp(),
      type: selectedFile.type,
      size: selectedFile.size
    })
    const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);
    uploadBytes(imageRef, selectedFile).then(async (snapshot)=>{
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(db, "users", user.id, "files",docRef.id),{
        downloadURL: downloadURL,
      });
    })
    toast.success("Uploaded Successfully", {
      id: todoId
    })
    setLoading(false);


  }
  // max size file 20MB
  const maxSize = 20971520
  return (
    <div className='m-4'>
    <Dropzone
    minSize={0}
    maxSize={maxSize}
     onDrop={onDrop}>
      {({getRootProps, getInputProps, isDragActive, isDragReject, fileRejections}) => {
        const IsFileTooLarge = fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
        return (
        <section>
          <div {...getRootProps()}
          className={cn("w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center", isDragActive ? "bg-[#035FFE] text-white animate-pulse" : "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400" 
          )}
          >
            <input {...getInputProps()} />
            {!isDragActive && "Click here or drop a file to upload !"}
            {isDragActive && !isDragReject && "Drop to upload this file!"}
            {isDragReject && "File type is not accepted!"}
            {IsFileTooLarge && "File is too large"}
          </div>
        </section>
        )
      }
      }
    </Dropzone>
    </div>
  )
}

export default DropzoneComponent