import jsPDF from 'jspdf';
import { OrderSummary } from '../types';
import { format } from 'date-fns';

export const generateOrderSummaryPDF = (summary: OrderSummary) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPosition = 20;

  // Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Hotel Chillies - Order Summary', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 10;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated on: ${format(new Date(), 'PPP p')}`, pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 20;

  // Summary Stats
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Order Statistics:', 20, yPosition);
  yPosition += 10;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Total Orders: ${summary.totalOrders}`, 20, yPosition);
  yPosition += 7;
  doc.text(`Total Amount: ₹${summary.totalAmount}`, 20, yPosition);
  yPosition += 15;

  // Item Summary
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Item Summary:', 20, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Item', 20, yPosition);
  doc.text('Qty', 120, yPosition);
  doc.text('Customers', 140, yPosition);
  yPosition += 5;

  // Draw line
  doc.line(20, yPosition, pageWidth - 20, yPosition);
  yPosition += 5;

  doc.setFont('helvetica', 'normal');
  
  Object.entries(summary.itemSummary).forEach(([item, details]) => {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    const itemText = item.length > 30 ? item.substring(0, 30) + '...' : item;
    doc.text(itemText, 20, yPosition);
    doc.text(details.quantity.toString(), 120, yPosition);
    
    // Customer list (first 2 customers, then "..." if more)
    const customerDisplay = details.customers.length > 2 
      ? `${details.customers[0]}, ${details.customers[1]}...` 
      : details.customers.join(', ');
    
    const maxWidth = pageWidth - 150;
    const customerLines = doc.splitTextToSize(customerDisplay, maxWidth);
    doc.text(customerLines[0], 140, yPosition);
    
    yPosition += 7;
  });

  yPosition += 10;

  // Individual Orders
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Individual Orders:', 20, yPosition);
  yPosition += 10;

  summary.userOrders.forEach((order) => {
    if (yPosition > 240) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`${order.userName} - Room ${order.roomNumber}`, 20, yPosition);
    yPosition += 7;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Order Date: ${format(new Date(order.createdAt), 'PPP p')}`, 20, yPosition);
    yPosition += 5;
    doc.text(`Total: ₹${order.totalAmount}`, 20, yPosition);
    yPosition += 8;

    order.items.forEach((item) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.text(`• ${item.menuItemName} (${item.variantName}) x${item.quantity} - ₹${item.price * item.quantity}`, 25, yPosition);
      yPosition += 5;
    });
    
    yPosition += 5;
  });

  // Save the PDF
  doc.save(`Hotel-Chillies-Orders-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
};