import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Calendar } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Reports = () => {
  const [reportType, setReportType] = useState('sales');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  const generateCSV = async () => {
    try {
      setLoading(true);
      
      const result = await window.electronAPI.getOrders({
        startDate,
        endDate,
        limit: 1000
      });

      if (result.success) {
        const orders = result.orders;
        
        let csvContent = '';
        
        if (reportType === 'sales') {
          // Sales Report CSV
          csvContent = 'Order ID,Date,Customer,Phone,Items,Subtotal,Tax,Total,Payment Method,Status\n';
          
          orders.forEach(order => {
            const itemsCount = order.items?.length || 0;
            const row = [
              order.orderId || order._id.slice(-8),
              new Date(order.createdAt).toLocaleString(),
              order.customerName,
              order.phone,
              itemsCount,
              order.subtotal || 0,
              order.tax || 0,
              order.total,
              order.paymentMethod,
              order.status
            ];
            csvContent += row.map(field => `"${field}"`).join(',') + '\n';
          });
        } else {
          // Items Report CSV
          csvContent = 'Order ID,Date,Item Name,Category,Quantity,Price,Total\n';
          
          orders.forEach(order => {
            order.items?.forEach(item => {
              const row = [
                order.orderId || order._id.slice(-8),
                new Date(order.createdAt).toLocaleString(),
                item.name,
                item.category,
                item.quantity,
                item.price,
                item.price * item.quantity
              ];
              csvContent += row.map(field => `"${field}"`).join(',') + '\n';
            });
          });
        }

        // Download CSV
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `${reportType}-report-${Date.now()}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error generating CSV:', error);
      alert('Failed to generate CSV report');
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = async () => {
    try {
      setLoading(true);
      
      const result = await window.electronAPI.getOrders({
        startDate,
        endDate,
        limit: 1000
      });

      if (result.success) {
        const orders = result.orders;
        const doc = new jsPDF();

        // Title
        doc.setFontSize(20);
        doc.setTextColor(255, 59, 0);
        doc.text('JUSHHH', 14, 20);
        
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.text(`${reportType === 'sales' ? 'Sales' : 'Items'} Report`, 14, 30);
        
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 38);
        
        if (startDate && endDate) {
          doc.text(`Period: ${startDate} to ${endDate}`, 14, 44);
        }

        // Summary
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
        const totalOrders = orders.length;
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Total Orders: ${totalOrders}`, 14, 54);
        doc.text(`Total Revenue: Rs ${totalRevenue.toFixed(2)}`, 14, 60);

        // Table
        if (reportType === 'sales') {
          const tableData = orders.map(order => [
            order.orderId?.slice(-8) || order._id.slice(-8),
            new Date(order.createdAt).toLocaleDateString(),
            order.customerName,
            order.items?.length || 0,
            `Rs ${order.total.toFixed(2)}`,
            order.status
          ]);

          doc.autoTable({
            startY: 70,
            head: [['Order ID', 'Date', 'Customer', 'Items', 'Total', 'Status']],
            body: tableData,
            theme: 'grid',
            headStyles: { fillColor: [255, 59, 0] },
            styles: { fontSize: 8 }
          });
        } else {
          const tableData = [];
          orders.forEach(order => {
            order.items?.forEach(item => {
              tableData.push([
                order.orderId?.slice(-8) || order._id.slice(-8),
                item.name,
                item.category,
                item.quantity,
                `Rs ${item.price.toFixed(2)}`,
                `Rs ${(item.price * item.quantity).toFixed(2)}`
              ]);
            });
          });

          doc.autoTable({
            startY: 70,
            head: [['Order ID', 'Item', 'Category', 'Qty', 'Price', 'Total']],
            body: tableData,
            theme: 'grid',
            headStyles: { fillColor: [255, 59, 0] },
            styles: { fontSize: 8 }
          });
        }

        // Save PDF
        doc.save(`${reportType}-report-${Date.now()}.pdf`);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Reports</h1>
        <p className="text-ui-gray-medium">Generate and export detailed reports</p>
      </div>

      {/* Report Configuration */}
      <div className="bg-ui-surface-dark border border-ui-gray-dark rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Report Configuration</h2>
        
        <div className="space-y-4">
          {/* Report Type */}
          <div>
            <label className="block text-ui-gray-medium text-sm mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-4 py-3 bg-ui-gray-dark border border-ui-gray-medium rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-red"
            >
              <option value="sales">Sales Report</option>
              <option value="items">Items Report</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-ui-gray-medium text-sm mb-2">Start Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-ui-gray-medium" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-ui-gray-dark border border-ui-gray-medium rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-red"
                />
              </div>
            </div>

            <div>
              <label className="block text-ui-gray-medium text-sm mb-2">End Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-ui-gray-medium" />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-ui-gray-dark border border-ui-gray-medium rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-red"
                />
              </div>
            </div>
          </div>

          {/* Quick Date Filters */}
          <div>
            <label className="block text-ui-gray-medium text-sm mb-2">Quick Filters</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  const today = new Date();
                  setStartDate(today.toISOString().split('T')[0]);
                  setEndDate(today.toISOString().split('T')[0]);
                }}
                className="px-4 py-2 bg-ui-gray-dark hover:bg-primary-red text-white rounded-lg transition-colors"
              >
                Today
              </button>
              <button
                onClick={() => {
                  const today = new Date();
                  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                  setStartDate(lastWeek.toISOString().split('T')[0]);
                  setEndDate(today.toISOString().split('T')[0]);
                }}
                className="px-4 py-2 bg-ui-gray-dark hover:bg-primary-red text-white rounded-lg transition-colors"
              >
                Last 7 Days
              </button>
              <button
                onClick={() => {
                  const today = new Date();
                  const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
                  setStartDate(lastMonth.toISOString().split('T')[0]);
                  setEndDate(today.toISOString().split('T')[0]);
                }}
                className="px-4 py-2 bg-ui-gray-dark hover:bg-primary-red text-white rounded-lg transition-colors"
              >
                Last 30 Days
              </button>
              <button
                onClick={() => {
                  const today = new Date();
                  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
                  setStartDate(firstDay.toISOString().split('T')[0]);
                  setEndDate(today.toISOString().split('T')[0]);
                }}
                className="px-4 py-2 bg-ui-gray-dark hover:bg-primary-red text-white rounded-lg transition-colors"
              >
                This Month
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export CSV */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-ui-surface-dark border border-ui-gray-dark rounded-xl p-6 cursor-pointer"
          onClick={generateCSV}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-accent-orange p-3 rounded-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Export as CSV</h3>
              <p className="text-ui-gray-medium text-sm">Download data in spreadsheet format</p>
            </div>
          </div>
          <button
            disabled={loading}
            className="w-full bg-accent-orange hover:bg-accent-orange/80 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Download className="w-5 h-5" />
            {loading ? 'Generating...' : 'Download CSV'}
          </button>
        </motion.div>

        {/* Export PDF */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-ui-surface-dark border border-ui-gray-dark rounded-xl p-6 cursor-pointer"
          onClick={generatePDF}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-primary-red p-3 rounded-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Export as PDF</h3>
              <p className="text-ui-gray-medium text-sm">Download formatted PDF report</p>
            </div>
          </div>
          <button
            disabled={loading}
            className="w-full bg-primary-red hover:bg-primary-red-dark text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Download className="w-5 h-5" />
            {loading ? 'Generating...' : 'Download PDF'}
          </button>
        </motion.div>
      </div>

      {/* Report Info */}
      <div className="bg-ui-surface-dark border border-ui-gray-dark rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Report Information</h3>
        <div className="space-y-2 text-sm">
          <p className="text-ui-gray-medium">
            • <span className="text-white font-medium">Sales Report:</span> Contains order summaries with customer details, totals, and status
          </p>
          <p className="text-ui-gray-medium">
            • <span className="text-white font-medium">Items Report:</span> Detailed breakdown of all items sold with quantities and prices
          </p>
          <p className="text-ui-gray-medium">
            • Reports can be filtered by date range for specific time periods
          </p>
          <p className="text-ui-gray-medium">
            • CSV files can be opened in Excel, Google Sheets, or any spreadsheet application
          </p>
          <p className="text-ui-gray-medium">
            • PDF files are formatted and ready for printing or sharing
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reports;

