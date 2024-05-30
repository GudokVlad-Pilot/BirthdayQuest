import { useEffect } from "react";
import { jsPDF } from "jspdf";

const AwardPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const downloadPDF = () => {
    const pdf = new jsPDF();
    const pdfElement = document.getElementById("pdfElement");

    // Проверяем, есть ли элемент с идентификатором "pdfElement"
    if (pdfElement) {
      pdf.text("Award Page", 10, 10); // Добавляем заголовок в PDF

      // Получаем размеры и содержимое элемента "pdfElement"
    //   const { width, height } = pdfElement.getBoundingClientRect();
      const htmlContent = pdfElement.innerHTML;

      // Добавляем содержимое элемента в PDF
      pdf.html(htmlContent, {
        callback: () => {
          // Сохраняем PDF файл с именем "award.pdf"
          pdf.save("award.pdf");
        },
      });
    }
  };

  return (
    <div className="landingPage">
      <div className="pageTitle">This is the award page.</div>
      <div className="pdfBox" id="pdfElement">
        Some text here
      </div>
      <button onClick={downloadPDF}>Download PDF</button>
    </div>
  );
};

export default AwardPage;