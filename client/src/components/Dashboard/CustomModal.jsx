
import Modal from 'react-modal';
import SaveAsPdf from './SaveAsPdf';
import SaveAsCsv from './SaveAsCsv';

const CustomModal = ({ isOpen, onRequestClose, onDownloadPDF, onDownloadCSV }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Download Modal"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-md"
      shouldCloseOnOverlayClick={true} // Enable closing on overlay click
    >
      <h2 className="text-2xl mb-4">Download Options</h2>
      <div className="flex gap-4">
        {/* <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onDownloadPDF}>
          Download PDF
        </button> */}
        <SaveAsPdf onDownloadPDF={onDownloadPDF}/>
        {/* <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={onDownloadCSV}>
          Download CSV
        </button> */}
        <SaveAsCsv onDownloadCSV={onDownloadCSV}/>
      </div>
    </Modal>
  );
};

export default CustomModal;
