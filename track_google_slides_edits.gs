
// Google Apps Script to list edited Google Slides presentations within a date range

function listEditedPresentations() {
  var folderId = "YOUR_FOLDER_ID"; // Replace with your target folder ID
  var startDate = new Date("YYYY-MM-DD"); // Replace with your start date
  var endDate = new Date("YYYY-MM-DD"); // Replace with your end date
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Set headers
  sheet.clear();
  sheet.appendRow(["File Name", "Parent Folder", "2nd Level Parent", "File Link", "Edit Date", "# of Slides Edited"]);
  
  var folder = DriveApp.getFolderById(folderId);
  var files = folder.getFiles();
  
  while (files.hasNext()) {
    var file = files.next();
    var fileName = file.getName();
    
    if (fileName.startsWith("[Content]") && file.getMimeType() === MimeType.GOOGLE_SLIDES) {
      var fileId = file.getId();
      var revisions = Drive.Revisions.list(fileId).items;
      
      for (var i = 0; i < revisions.length; i++) {
        var rev = revisions[i];
        var revDate = new Date(rev.modifiedDate);
        
        if (revDate >= startDate && revDate <= endDate) {
          var slides = SlidesApp.openById(fileId).getSlides().length;
          var parentFolder = file.getParents().next().getName();
          var secondLevelFolder = DriveApp.getFolderById(file.getParents().next().getId()).getParents().next().getName();
          
          sheet.appendRow([fileName, parentFolder, secondLevelFolder, file.getUrl(), revDate.toDateString(), slides]);
        }
      }
    }
  }
  
  Logger.log("Report generated successfully.");
}
