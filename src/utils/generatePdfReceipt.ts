import jsPDF from 'jspdf';
import type { TicketBooking } from '../types';

export const generatePdfReceipt = (ticket: TicketBooking) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a5', // Compact boarding pass format
  });

  // Color Palette Definitions
  const darkBlue = [13, 95, 166];     // #0D5FA6
  const midBlue = [33, 128, 166];     // #2180A6
  const turquoise = [55, 166, 166];   // #37A6A6
  const mintGreen = [75, 191, 158];   // #4BBF9E
  const bgLight = [242, 242, 242];    // #F2F2F2

  // 1. Header Bar
  doc.setFillColor(darkBlue[0], darkBlue[1], darkBlue[2]);
  doc.rect(0, 0, 148, 26, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('MovilisTurismo EC', 10, 12);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('COMPROBANTE DE TICKET DIGITAL & PASE DE ABORDAJE', 10, 18);

  // Status Badge
  doc.setFillColor(mintGreen[0], mintGreen[1], mintGreen[2]);
  doc.roundedRect(100, 7, 38, 12, 3, 3, 'F');
  doc.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('PAGO EXITOSO', 104, 14);

  // 2. Ticket Code Box
  doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
  doc.roundedRect(10, 32, 128, 14, 2, 2, 'F');
  doc.setDrawColor(midBlue[0], midBlue[1], midBlue[2]);
  doc.roundedRect(10, 32, 128, 14, 2, 2, 'D');

  doc.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('CÓDIGO DE TICKET:', 14, 40);

  doc.setTextColor(turquoise[0], turquoise[1], turquoise[2]);
  doc.setFontSize(12);
  doc.text(ticket.ticketCode, 58, 40);

  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text(`Fecha emisión: ${new Date().toLocaleDateString('es-EC')}`, 92, 40);

  // 3. Passenger Info Section
  doc.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2]);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('1. INFORMACIÓN DEL PASAJERO', 10, 54);

  doc.setLineWidth(0.5);
  doc.setDrawColor(turquoise[0], turquoise[1], turquoise[2]);
  doc.line(10, 56, 138, 56);

  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50, 50, 50);
  doc.text(`Nombre Completo:`, 10, 63);
  doc.setFont('helvetica', 'bold');
  doc.text(ticket.passengerName, 45, 63);

  doc.setFont('helvetica', 'normal');
  doc.text(`Cédula / Documento:`, 10, 70);
  doc.setFont('helvetica', 'bold');
  doc.text(ticket.passengerDoc, 45, 70);

  doc.setFont('helvetica', 'normal');
  doc.text(`Teléfono WhatsApp:`, 10, 77);
  doc.setFont('helvetica', 'bold');
  doc.text(ticket.passengerPhone || 'N/A', 45, 77);

  // 4. Route & Boarding Section
  doc.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2]);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('2. DETALLES DEL VIAJE & PARADA INTERMEDIA', 10, 89);
  doc.line(10, 91, 138, 91);

  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50, 50, 50);

  doc.text(`Paquete / Ruta:`, 10, 98);
  doc.setFont('helvetica', 'bold');
  doc.text(ticket.packageName, 45, 98);

  doc.setFont('helvetica', 'normal');
  doc.text(`Origen ➔ Destino:`, 10, 105);
  doc.setFont('helvetica', 'bold');
  doc.text(`${ticket.origin} ➔ ${ticket.destination}`, 45, 105);

  doc.setFont('helvetica', 'normal');
  doc.text(`Punto de Recogida:`, 10, 112);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2]);
  doc.text(ticket.intermediatePickup, 45, 112);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50, 50, 50);
  doc.text(`Hora de Salida:`, 10, 119);
  doc.setFont('helvetica', 'bold');
  doc.text(ticket.departureTime, 45, 119);

  doc.setFont('helvetica', 'normal');
  doc.text(`Asiento Asignado:`, 10, 126);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(mintGreen[0], mintGreen[1], mintGreen[2]);
  doc.text(ticket.seatNumber, 45, 126);

  // 5. Payment Box & QR Verification Code
  doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
  doc.roundedRect(10, 134, 128, 25, 2, 2, 'F');

  doc.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2]);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('VALOR TOTAL PAGADO:', 14, 142);

  doc.setFontSize(14);
  doc.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2]);
  doc.text(`$${ticket.totalPaid} USD`, 14, 150);

  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.setFont('helvetica', 'normal');
  doc.text('Incluye Transporte VIP + Hotel + Desayuno + Tours', 14, 155);

  // Simulated QR String
  doc.setDrawColor(darkBlue[0], darkBlue[1], darkBlue[2]);
  doc.rect(105, 137, 28, 20, 'D');
  doc.setFontSize(7);
  doc.setTextColor(turquoise[0], turquoise[1], turquoise[2]);
  doc.text('CÓDIGO QR PWA', 106, 144);
  doc.text('VALIDADO', 111, 150);

  // Footer Note
  doc.setFontSize(7.5);
  doc.setTextColor(120, 120, 120);
  doc.text('Este documento sirve como pase de abordaje directo sin necesidad de acudir a terminales físicas.', 10, 168);
  doc.text('MovilisTurismo PWA Ecuador - Todos los derechos reservados 2026.', 10, 172);

  // Trigger Download
  doc.save(`Comprobante_MovilisTurismo_${ticket.ticketCode}.pdf`);
};
