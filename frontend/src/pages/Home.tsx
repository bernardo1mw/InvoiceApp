// src/pages/InvoicesPage.tsx
import React from 'react';
import InvoiceList from '../components/InvoiceList';
import UploadForm from '../components/UploadForm';

const Home: React.FC = () => {
  return (
    <div>
      <h1 className='font-bold text-2xl my-5'>Notas Fiscais</h1>
      <UploadForm/>
      <InvoiceList />
    </div>
  );
};

export default Home;
