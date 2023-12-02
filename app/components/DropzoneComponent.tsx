'use client';
import { cn } from '@/lib/utils';
import React from 'react'
import Dropzone from 'react-dropzone'
const DropzoneComponent = () => {
  // max size file 20MB
  const maxSize = 20971520
  return (
    <div className='m-4'>
    <Dropzone
    minSize={0}
    maxSize={maxSize}
     onDrop={acceptedFiles => console.log(acceptedFiles)}>
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