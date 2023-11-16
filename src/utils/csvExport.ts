import * as XLSX from "xlsx";

export const handleCSVExport = (statement: any,statementName: string) => {
    console.log(statement);
    const csvData: any = [];

    statement?.items?.forEach((item: any) => {
      csvData.push({
        account: item.element,
        N: item.value,
      });
    });
  

    if (csvData.length > 0) {
      const csvHeaders = Object.keys(csvData[0] as any);
      const csvContent = [
        csvHeaders,
        ...csvData.map((item: any) =>
          csvHeaders.map((header: any) => item[header])
        ),
      ];
      const csvWorkbook = XLSX.utils.book_new();
      const csvWorksheet = XLSX.utils.aoa_to_sheet(csvContent);

      const boldStyle = { bold: true };
      const headerRange = XLSX.utils.decode_range(csvWorksheet["!ref"] as any);
      for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
        const cell = csvWorksheet[cellAddress];
        cell.s = boldStyle;
      }

      XLSX.utils.book_append_sheet(csvWorkbook, csvWorksheet, "Sheet 1");
      const excelBuffer = XLSX.write(csvWorkbook, {
        type: "buffer",
        bookType: "xlsx",
      });
      const excelData = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const excelUrl = URL.createObjectURL(excelData);
      const link = document.createElement("a");
      link.href = excelUrl;
      link.download = statementName + ".xlsx" || "statement.xlsx";
      link.click();
      URL.revokeObjectURL(excelUrl);
    }
  };
