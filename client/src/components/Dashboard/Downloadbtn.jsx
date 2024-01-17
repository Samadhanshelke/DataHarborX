
import { useState } from 'react';
import CustomModal from './CustomModal';
import { Button } from '@mui/material';


const Downloadbtn = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    const handleDownloadPDF = () => {
      // Logic for downloading PDF
      closeModal();
    };
  
    const handleDownloadCSV = () => {
      // Logic for downloading CSV
      closeModal();
    };
  return (
    <div>
      {/* Your content here */}
      <Button color="primary" variant="contained" onClick={openModal}>download</Button>

      <CustomModal isOpen={isModalOpen} onRequestClose={closeModal} onDownloadPDF={handleDownloadPDF} onDownloadCSV={handleDownloadCSV} />
    </div>
  );
};

export default Downloadbtn;
