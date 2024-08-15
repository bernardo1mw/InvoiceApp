// src/components/UploadForm.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { uploadInvoice } from '../api/invoiceApi';

interface FormData {
  file: FileList;
}

const UploadForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<FormData>();
  const [uploadError, setUploadError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    if (data.file.length > 0) {
      try {
        const file = data.file[0];
        if (file.type !== 'application/xml' && !file.name.endsWith('.xml')) {
          setError('file', {
            type: 'manual',
            message: 'Apenas arquivos XML são aceitos.'
          });
          return;
        }
        await uploadInvoice(file);
        alert('Arquivo enviado com sucesso!');
        setUploadError(null); // Clear any previous error
        window.location.reload();
      } catch (error: any) {
        console.error('Erro ao enviar arquivo', error);
        setUploadError(`Erro ao enviar arquivo: ${error.message}`);
      }
    }
  };

  return (
    <form className='my-5' onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="file">
          <div className='text-lg'>
            Escolha um arquivo XML:
          </div>
            </label>
        <input
          className='text-md font-semibold'
          type="file"
          id="file"
          {...register('file', { required: true })}
        />
        {errors.file && <span style={{ color: 'red' }}>{errors.file.message}</span>}
        </div>
        {uploadError && <div style={{ color: 'red' }}>{uploadError}</div>}

      <button className='bg-blue-500 px-4 py-2 text-slate-800 font-bold hover:bg-blue-700' type="submit">
        Enviar
        </button>
    </form>
  );
};

export default UploadForm;
