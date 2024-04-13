export default function ExportCSV(fileName, data) {
    // Create workbook XML
    let workbookXML = '<?xml version="1.0"?>';
    workbookXML += '<ss:Workbook xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">';
    //TAB MAP START
    data?.forEach(function (tab) {
      workbookXML += "<ss:Worksheet ss:Name='" + tab?.tabName + "'><ss:Table>";
      tab?.data?.forEach(function (row) {
        workbookXML += "<ss:Row>";
        row?.forEach(function (cell) {
          workbookXML += '<ss:Cell><ss:Data ss:Type="String">' + cell + "</ss:Data></ss:Cell>";
        });
        workbookXML += "</ss:Row>";
      });
      workbookXML += "</ss:Table></ss:Worksheet>";
    });
    //TAB MAP END
  
    workbookXML += "</ss:Workbook>";
  
    // Create a Blob with the workbook XML
    let blob = new Blob([workbookXML], { type: "application/vnd.ms-excel" });
    // Create a link element and trigger download
    let link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName || "data.xlsx";
    link.click();
  }


   function exportData() {
      let array = [];
      if (dashboardTwo !== null && Object.keys(dashboardTwo).length > 0) {
        let newArray = [["Status Name", "Status Count"]];
        Object.values(dashboardTwo).forEach(function (obj) {
          newArray.push(Object.values({ statusName: obj.statusName, statusCount: obj.statusCount }));
        });
        array.push({ tabName: "Status wise order count", data: newArray });
      }
      return array;
    }
  
  ExportCSV("Location_Report.xlsx", exportData());  