function myFunction() {
  setSlackChannel(getSlackChannel());
}

function getSlackChannel(){
  var slack_token = PropertiesService.getScriptProperties().getProperty('SLACK_TOKEN');
  var url = 'https://slack.com/api/channels.list\?token\=' + slack_token;
  var response = UrlFetchApp.fetch();
  var json=JSON.parse(response.getContentText());
  var json_list = [];
  for each(var element in json['channels']){
    var buffer = [];
    buffer.push(element['id'],element['name'],element['is_archived']);
    json_list.push(buffer);
  }
  return json_list;
}

function setSlackChannel(list){
  var spreadsheet = SpreadsheetApp.openById('1rpALEc4wrJE_mr7BB7S0ntIgKHUcbKHmZHlNpZLEOiM');
  var sheet = spreadsheet.getSheetByName('sheet1');
  arrayLeadData = ['ID','Channel','Archives'];
  var lastRow = sheet.getLastRow();
  Logger.log(lastRow);
  if(lastRow === 0){
    sheet.appendRow(arrayLeadData);
  }
  for each(var element in list){
    sheet.appendRow(element);
  } 
}

function checkChannelExist(){
  
}