import React, { useEffect } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import DownloadIcon from '@mui/icons-material/Download';
import ForwardIcon from '@mui/icons-material/Forward';
import "../styles/AwardPage.css"

const AwardPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const downloadPDF = async () => {
    const pdfElement = document.getElementById("pdfElement");

    if (pdfElement) {
      // Увеличиваем масштаб, чтобы учесть границу и паддинг
      const scale = 3;
      const canvas = await html2canvas(pdfElement, { scale });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [297, 210], // A4 size in mm
      });

      const imgWidth = 210; // ширина листа А4
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("award.pdf");
    }
  };

  return (
    <div className="awardPage">
      <div className="contentBox">
          <div className="taskText">
            Поздравляем! 
          </div>
          <div className="subtaskText" style={{marginBottom: "20px"}}>
            Получи свою грамоту!
          </div>
      </div>
      <div className="awardEditor">
        <div
          className="pdfBox"
          id="pdfElement"
          style={{
            width: "190mm", // ширина A4 минус паддинг и граница
            height: "269mm", // высота A4 минус паддинг и граница
            border: "5mm solid #F9F1D2",
            padding: "10mm",
            boxSizing: "border-box",
            backgroundColor: "white"
          }}
        >
          Some text here
        </div>
        <div className="downloadButtonBox">
          <button className="downloadButton" onClick={downloadPDF}>
            Скачать
          <DownloadIcon style={{height:"60px", width: "60px"}}/>
          </button>
        </div>
        {/* <button onClick={downloadPDF}>Download PDF</button> */}
      </div>
      <a className="sendButtonBox"
        href="https://api.whatsapp.com/send/?phone=358465508147&text&type=phone_number&app_absent=0"
        target="_blank"
        rel="noopener noreferrer">
          <div className="sendButton">
            Отправить
          <ForwardIcon style={{height:"60px", width: "60px"}}/>
          </div>
      </a>
    </div>
  );
};

export default AwardPage;