
import { Button } from '@mui/material';
import 'jspdf-autotable';
import Papa from 'papaparse';
import { useSelector } from 'react-redux';

const SaveAsCsv = ({onDownloadCSV}) => {
 
  const userList = useSelector((state)=>state.userLists.userList)   

  const handleSaveAsCSV = () => {
    // Convert the data to CSV format
    const formattedData = userList.map(({ UserName, Email, Phone }) => ({ UserName, Email, Phone }));

    // Convert the data to CSV format
    const csv = Papa.unparse(formattedData);
    // Create a Blob from the CSV data
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    // Create a link element to trigger the download
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'my_table.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      onDownloadCSV()
    } else {
      console.error('Your browser does not support the download attribute.');
    }
  };

  return (
    <div>
   
   
      <Button color="primary" variant="contained" onClick={handleSaveAsCSV}>save as csv</Button>
    </div>
  );
};

export default SaveAsCsv;
