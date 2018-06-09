function myFunction2() {
  for each(var element_a in getArchivedChannel()){
    var sheet = addSheet(element_a[1]);
    var last_row = sheet.getLastRow()
    for(var i=2;i<=last_row;i++){
      sheet.getRange(i, 1).clear();
      sheet.getRange(i, 2).clear();
    }
    for each(var element_b in getChannelHistory(element_a[0])){
      arrayLeadData = ['USER','MESSAGE'];
      var lastRow = sheet.getLastRow();
      if(lastRow === 0){
        sheet.appendRow(arrayLeadData);
      }
      sheet.appendRow(element_b);
    }
  }
}

function getChannelHistory(channelID){
  var slack_token = PropertiesService.getScriptProperties().getProperty('SLACK_TOKEN');
  var url = "https://slack.com/api/channels.history\?token\="+slack_token+"\&channel\="+channelID;
  var response = UrlFetchApp.fetch(url);
  var json = JSON.parse(response.getContentText());
  var json_list = [];
  for each(element in json["messages"]){
    var buffer = [];
    buffer.push(element['user'],element['text']);
    json_list.push(buffer);
  }
  return json_list
}

function getArchivedChannel(){
  var sheet_id = PropertiesService.getScriptProperties().getProperty('SPREAD_SHEET_ID');
  var spreadsheet = SpreadsheetApp.openById(sheet_id);
  var sheet = spreadsheet.getSheetByName('sheet1');
  var last_row = sheet.getLastRow()
  var ChannelList = [];
  for(var i=2;i<=last_row;i++){
    if(sheet.getRange(i, 3).getValue()){
      ChannelList.push([sheet.getRange(i,1).getValue(),　sheet.getRange(i,2).getValue()]);
    }
  }
  return ChannelList
}

function addSheet(sheet_name){
  var sheet_id = PropertiesService.getScriptProperties().getProperty('SPREAD_SHEET_ID');
  var spreadsheet = SpreadsheetApp.openById(sheet_id);
  var sheet;
  try{
    sheet = spreadsheet.insertSheet(sheet_name);
  }catch(e){
    Logger.log(e);
    sheet = spreadsheet.getSheetByName(sheet_name);
  }
  return sheet;
}