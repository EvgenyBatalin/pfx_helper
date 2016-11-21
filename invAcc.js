$(function () {
	var acc = $($("small.user-nav__login")[0]).html();
	
	
	var table = $('#w0');
	
	var nameTr =  $(table.find("tbody tr")[0]);
	var name = $(nameTr.find("td")[0]).html();
	
	
	var invAccTr =  $(table.find("tbody tr")[1]);
	var invAccId = parseInt($(invAccTr.find("td")[0]).html());
	
	var typeTr = $(table.find("tbody tr")[2]);
	var type = $(typeTr.find("td")[0]).html();
	
	var pammTr =  $(table.find("tbody tr")[4]);
	var pammId = parseInt($(pammTr.find("td")[0]).html());
	
	
	
	var typeShort = type;
	if (type == "Бонусный счет") 
		typeShort = "Б";
	
	if (type == "Лицевой счет") 
		typeShort = "Л";
	
	if (type == 'Счет "1+1" результирующий') 
		typeShort = "1+1";
	
	var pammObj = {
		name : name,
		invAccId: invAccId,
		type: type,
		typeShort: typeShort,
		pammId: pammId
	};
	
	
	
	chrome.storage.sync.get(acc, function (obj) {
		
		var pammsDict = {};
		if (typeof obj[acc] != 'undefined')
		{
			pammsDict = obj[acc];
		}
		pammsDict[invAccId] = pammObj;
		
		
		var storageObj = {};
		storageObj[acc] = pammsDict;
		
		chrome.storage.sync.set(storageObj, function() {
		});
	});
});
	
