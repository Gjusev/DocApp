'use client'
import Dropzone from '../components/Dropzone'
import React, { useState } from 'react';
import FileForm from '../components/FileForm.jsx'

export default function Home() {
  
  const [processedModels, setProcessedModels] = useState([]);
  const [showFileForm, setShowFileForm] = useState(false);
  
  const processModels = (models) => {
  
  setProcessedModels(models);
  setShowFileForm(true); // Show FileForm after processing models
  }


  return (
    <section className='py-10'>
      <div className='container '>
        {!showFileForm && <h1 className='text-3xl font-bold'>Upload Files</h1>}
        {showFileForm && <h1 className='text-3xl font-bold'>File Form</h1>}
        {!showFileForm && <Dropzone className='p-16 mt-10 border border-neutral-200' onProcessModels={processModels} />}
        {showFileForm && <FileForm processedModels={processedModels} />}
    
        
      </div>
    </section>
  )
}
//<Dropzone className='p-16 mt-10 border border-neutral-200' />