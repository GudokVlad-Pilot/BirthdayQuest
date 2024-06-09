import React, { useEffect } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

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
    <div className="landingPage">
      <div className="contentBox">
          <div className="taskText">
            Поздравляем! 
          </div>
          <div className="subtaskText" style={{marginBottom: "20px"}}>
            Введите имя, чтобы начать
          </div>
      </div>
      <div
        className="pdfBox"
        id="pdfElement"
        style={{
          width: "190mm", // ширина A4 минус паддинг и граница
          height: "269mm", // высота A4 минус паддинг и граница
          border: "5mm solid black",
          padding: "10mm",
          boxSizing: "border-box",
        }}
      >
        Some text here
      </div>
      <button onClick={downloadPDF}>Download PDF</button>
    </div>
  );
};

export default AwardPage;