import { Button } from "@mui/material"
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useSelector } from "react-redux";

const SaveAsPdf = ({onDownloadPDF}) => {
    const userList = useSelector((state)=>state.userLists.userList)   
    const handleSaveAsPDF = () => {
        // Create a new jsPDF instance
        const pdf = new jsPDF();
        console.log('printing')
        // Add content to the PDF
        pdf.text('My Table Data', 10, 10); // Title
        pdf.autoTable({
            head: [['Name', 'Email', 'Phone']],
            body: userList.map(row => [row.UserName, row.Email, row.Phone]),
          });
    
        // Save the PDF
        pdf.save('my_table.pdf');
        onDownloadPDF()
      };
  return (
    <Button color="primary" variant="contained" onClick={()=>handleSaveAsPDF()}>save as pdf</Button>
  )
}

export default SaveAsPdf