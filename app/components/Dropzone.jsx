'use client'
import { useCallback, useMemo,useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { Canvas } from 'react-three-fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from '@react-three/drei';
import { useThree } from 'react-three-fiber';

const Dropzone = ({ className,onProcessModels }) => {
  const [files, setFiles] = useState([])
  const [rejected, setRejected] = useState([])
  const [processedModels, setProcessedModels] = useState([]);

  const ModelPreview = ({ file }) => {
    const { scene } = useThree();

    useEffect(() => {
        const loader = new OBJLoader();
        loader.load(URL.createObjectURL(file), object => {
          scene.add(object); // Agrega el objeto al escenario
    
          // Limpiar el objeto al desmontar
          return () => {
            scene.remove(object);
          };
        });
      }, [file]);};
  
  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles(previousFiles => [
        // If allowing multiple files
        ...previousFiles,
        ...acceptedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      ])
    }

    if (rejectedFiles?.length) {
      setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: '.obj',
    
    onDrop
  })

  const removeFile = name => {
    setFiles(files => files.filter(file => file.name !== name))
  }

  const removeAll = () => {
    setFiles([])
    setRejected([])
  }

  const removeRejected = name => {
    setRejected(files => files.filter(({ file }) => file.name !== name))
  }

  function action(e) {
    onProcessModels(files);
   console.log(e)
   console.log(files)
  
  }
  

  return (
    
    <form onSubmit={action}>
      <div
        {...getRootProps({
          className: className
        })}
      >
        <input {...getInputProps({ name: 'file' })} />
        <div className='flex flex-col items-center justify-center gap-4'>
          <ArrowUpTrayIcon className='w-5 h-5 fill-current' />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag & drop files here, or click to select files</p>
          )}
        </div>
      </div>

      {/* Preview */}
      <section className='mt-10'>
        
          <h2 className='text-3xl font-semibold title'>Preview</h2>
          <div className='flex gap-4 mt-10'>
          <button
            type='button'
            onClick={removeAll}
            className='mt-1 rounded-md border border-rose-400 px-3 text-[12px] font-bold uppercase tracking-wider  transition-colors bg-rose-400 hover:bg-rose-600 text-white'
          >
            Remove all files
          </button>
          <button
            type='submit'
            className='ml-auto mt-1 rounded-md border-indigo-800  px-3 text-[12px] font-bold uppercase tracking-wider bg-indigo-700 text-white hover:bg-indigo-900 focus:shadow-outline focus:outline-none transition-colors '
          >
            Process
          </button>
          
        </div>

        {/* Accepted files */}
        <h3 className='pb-3 mt-10 text-lg font-semibold text-white border-b title'>
          Accepted Files
        </h3>
        <ul className='grid grid-cols-1 gap-10 mt-6 sm:grid-cols-2 '>
          {files.map(file => (
            <li key={file.name} className='relative h-32 bg-black rounded-md shadow-lg'>
            <Canvas camera={{ position: [2, 2, 0] ,zoom:2}}>
              <ModelPreview file={file} />
              <ambientLight intensity={0.5} />
              <directionalLight intensity={0.5} position={[10, 10, 5]} />
              <OrbitControls />
              
            </Canvas>
              <button
                type='button'
                className='absolute flex items-center justify-center transition-colors border rounded-full -right-3 -top-3 h-7 w-7 border-rose-400 bg-rose-400 hover:bg-white'
                onClick={() => removeFile(file.name)}
              >
                <XMarkIcon className='w-5 h-5 transition-colors fill-white hover:fill-rose-400' />
              </button>
              <p className='mt-2 text-[12px] font-medium text-white'>
                {file.name}
              </p>
            </li>
          ))}
        </ul>

        {/* Rejected Files */}
        <h3 className='pb-3 mt-24 text-lg font-semibold text-white border-b title'>
          Rejected Files
        </h3>
        <ul className='flex flex-col mt-6'>
          {rejected.map(({ file, errors }) => (
            <li key={file.name} className='flex items-start justify-between'>
              <div>
                <p className='mt-2 text-sm font-medium text-white'>
                  {file.name}
                </p>
                <ul className='text-[12px] text-red-400'>
                  {errors.map(error => (
                    <li key={error.code}>{error.message}</li>
                  ))}
                </ul>
              </div>
              <button
                type='button'
                className='mt-1 rounded-md border border-rose-400 px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-stone-500 transition-colors  hover:bg-rose-400 hover:text-white'
                onClick={() => removeRejected(file.name)}
              >
                remove
              </button>
            </li>
          ))}
        </ul>
      </section>
    </form>
    
  )
}

export default Dropzone