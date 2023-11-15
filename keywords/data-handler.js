const { xlsx } = require('node-xlsx');

class DataHandler {

  /**
   * Method to read the first cell data from excel sheet. 
   * The excel test data file should be available in testData folder.
   * @author Sanoj Swaminathan
   * @since 11-07-2023
   * @param {*} excelFileName 
   * @param {*} sheetName 
   * @returns 
   */
  async getDataFromExcelSheet(excelFileName, sheetName) {
    const excelFile = xlsx.parse(`./test-data/${excelFileName}.xlsx`);
    const excelSheet = excelFile.find(sheets => sheets.name == sheetName);
    const excelSheetData = excelSheet.data;
    excelSheetData.shift();
    console.log(excelSheetData[0].toString());
    return excelSheetData[0].toString();
  }

  /**
   * Method to read the data from excel based on given row and column index. 
   * The excel test data file "TestData.xlsx" should be available in testData folder.
   * @author Sanoj Swaminathan
   * @since 11-07-2023
   * @param {*} sheetName 
   * @param {*} rowIndex 
   * @param {*} columnIndex 
   * @returns 
   */
  async getDataFromExcelRowColumn(sheetName, rowIndex, columnIndex) {
    const excelFile = xlsx.parse(`./test-data/TestData.xlsx`);
    const excelSheet = excelFile.find(sheets => sheets.name == sheetName);
    const excelSheetData = excelSheet.data;
    excelSheetData.shift();
    console.log(excelSheetData[rowIndex]);
    if (excelSheetData[rowIndex] && excelSheetData[rowIndex][columnIndex]) {
      const cellValue = excelSheetData[rowIndex][columnIndex].toString();
      console.log(cellValue);
      return cellValue;
    } else {
      console.log('Cell not found.');
    }
  }

  /**
   * Method to read the data from excel based on excel file path and given row-column index. 
   * @author Sanoj Swaminathan
   * @since 11-07-2023
   * @param {*} excelFilePath 
   * @param {*} sheetName 
   * @param {*} rowIndex 
   * @param {*} columnIndex 
   * @returns 
   */
  async getDataFromExcelFilePath(excelFilePath, sheetName, rowIndex, columnIndex) {
    const excelFile = xlsx.parse(excelFilePath);
    const excelSheet = excelFile.find(sheets => sheets.name == sheetName);
    const excelSheetData = excelSheet.data;
    excelSheetData.shift();
    console.log(excelSheetData[rowIndex]);
    if (excelSheetData[rowIndex] && excelSheetData[rowIndex][columnIndex]) {
      const cellValue = excelSheetData[rowIndex][columnIndex].toString();
      console.log(cellValue);
      return cellValue;
    } else {
      console.log('Cell not found.');
    }
  }

  /**
   * Method to read the data from excel based on given row and column index. 
   * The excel test data file should be available in testData folder.
   * @author Sanoj Swaminathan
   * @since 11-07-2023
   * @param {*} excelFileName 
   * @param {*} sheetName 
   * @param {*} rowIndex 
   * @param {*} columnIndex 
   * @returns 
   */
  async getDataFromExcel(excelFileName, sheetName, rowIndex, columnIndex) {
    const excelFile = xlsx.parse(`./test-data/${excelFileName}.xlsx`);
    const excelSheet = excelFile.find(sheets => sheets.name == sheetName);
    const excelSheetData = excelSheet.data;
    excelSheetData.shift();
    console.log(excelSheetData[rowIndex]);
    if (excelSheetData[rowIndex] && excelSheetData[rowIndex][columnIndex]) {
      const cellValue = excelSheetData[rowIndex][columnIndex].toString();
      console.log(cellValue);
      return cellValue;
    } else {
      console.log('Cell not found.');
    }
  }

  /**
   * Method to get the number of rows in an excel sheet; it won't count the heading. 
   * The excel test data file should be available in testData folder. 
   * @author Sanoj Swaminathan
   * @since 11-07-2023
   * @param {*} excelFileName 
   * @param {*} sheetName 
   * @returns 
   */
  async getRowCountFromExcelsheet(excelFileName, sheetName) {
    const excelFile = xlsx.parse(`./test-data/${excelFileName}.xlsx`);
    const excelSheet = excelFile.find(sheets => sheets.name == sheetName);
    const excelSheetData = excelSheet.data;
    excelSheetData.shift();
    const rowCount = excelSheetData.length;
    return rowCount;
  }

  /**
   * Method to get the number of rows in an excel sheet; it won't count the heading.
   * @author Sanoj Swaminathan
   * @since 11-07-2023
   * @param {*} excelFilePath 
   * @param {*} sheetName 
   * @returns 
   */
  async getRowCountFromExcelFile(excelFilePath, sheetName) {
    const excelFile = xlsx.parse(excelFilePath);
    const excelSheet = excelFile.find(sheets => sheets.name == sheetName);
    const excelSheetData = excelSheet.data;
    excelSheetData.shift();
    const rowCount = excelSheetData.length;
    return rowCount;
  }

  /**
   * Method to get the number of columns in an excel sheet. 
   * The excel test data file should be available in testData folder. 
   * @author Sanoj Swaminathan
   * @since 11-07-2023
   * @param {*} excelFileName 
   * @param {*} sheetName 
   * @returns 
   */
  async getColumnCountFromExcelsheet(excelFileName, sheetName) {
    const excelFile = xlsx.parse(`./test-data/${excelFileName}.xlsx`);
    const excelSheet = excelFile.find(sheets => sheets.name == sheetName);
    const excelSheetData = excelSheet.data;
    excelSheetData.shift();
    const columnCount = excelSheetData[0].length;
    return columnCount;
  }

  /**
   * Method to get the number of columns in an excel sheet. 
   * @author Sanoj Swaminathan
   * @since 11-07-2023
   * @param {*} excelFilePath 
   * @param {*} sheetName 
   * @returns 
   */
  async getColumnCountFromExcelFile(excelFilePath, sheetName) {
    const excelFile = xlsx.parse(excelFilePath);
    const excelSheet = excelFile.find(sheets => sheets.name == sheetName);
    const excelSheetData = excelSheet.data;
    excelSheetData.shift();
    const columnCount = excelSheetData[0].length;
    return columnCount;
  }
}

module.exports = DataHandler;