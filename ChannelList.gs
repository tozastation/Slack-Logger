function myFunction() {
  setSlackChannel(getSlackChannel());
}

function getSlackChannel(){
  var slack_token = PropertiesService.getScriptProperties().getProperty('SLACK_TOKEN');
  var url = 'https://slack.com/api/channels.list\?token\=' + slack_token;
  var response = UrlFetchApp.fetch(url);
  var json=JSON.parse(response.getContentText());
  var json_list = [];
  for each(var element in json['channels']){
    var buffer = [];
    buffer.push(element['id'],element['name'],element['is_archived']);
    json_list.push(buffer);
  }
  Logger.log(json_list);
  return json_list;
}

function deleteExistChannel(){
  var sheet_id = PropertiesService.getScriptProperties().getProperty('SPREAD_SHEET_ID');
  var spreadsheet = SpreadsheetApp.openById(sheet_id);
  var sheet = spreadsheet.getSheetByName('sheet1');
  var last_row = sheet.getLastRow()
  for(var i=2;i<=last_row;i++){
    sheet.getRange(i, 1).clear();
    sheet.getRange(i, 2).clear();
    sheet.getRange(i, 3).clear();
  }
}

function setSlackChannel(list){
  var sheet_id = PropertiesService.getScriptProperties().getProperty('SPREAD_SHEET_ID');
  var spreadsheet = SpreadsheetApp.openById(sheet_id);
  var sheet = spreadsheet.getSheetByName('sheet1');
  arrayLeadData = ['ID','Channel','Archives'];
  var lastRow = sheet.getLastRow();
  if(lastRow === 0){
    sheet.appendRow(arrayLeadData);
  }else if(lastRow > 0){
    try{
      deleteExistChannel();
    }catch(e){
      Logger.log(e);
    }
    for each(var element in list){
      sheet.appendRow(element);
    } 
  }
}
