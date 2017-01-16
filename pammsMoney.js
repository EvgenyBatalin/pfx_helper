

var protTrades = [];


$(function () {
	
	
	var button = $("<input class='btn btn-top-up btn-primary btn-sm' type=button value='Скачать свои сделки ТЕСТ!!!'/>").click(function() {
		downloadTrades();
	});
	var div = $("<div class='summary'></div>");
	div.append(button);
	var acc = $($("small.user-nav__login")[0]).html();
	
	
    var finalMoney = 0;
    var curMoney = 0;

    var table = $($("table.table-striped")[0]);
    var rows = table.find("tbody tr");
    for (i = 0; i < rows.length; i++) {
        var row = $(rows[i]);
        //finalMoney += parseFloat(row.find("td")[5].innerHTML);
        //curMoney += parseFloat(row.find("td")[3].innerHTML);
		
		finalMoney += parseFloat(row.find("td")[4].innerHTML.replace(/&nbsp;/gi,''));
		curMoney += parseFloat(row.find("td")[3].innerHTML.replace(/&nbsp;/gi,''));
    }

    var lastRow = $(rows).last();

    var newRow = $("<tr><td></td><td>Всего</td><td></td><td>" + curMoney.toFixed(2) + "</td><td><strong>" + finalMoney.toFixed(2) + "</strong></td><td></td><td></td><td></td></tr>")
    newRow.insertAfter(lastRow);

	//var closedInvAccsDiv = $('#w1');
	//var closedInvAccsTable = $(closedInvAccsDiv.find("#w1 table")[0]);
	
	var closedInvAccsTable  = $($("#w1 table")[0]);
	var tbody = $(closedInvAccsTable.find("tbody")[0]);
	
	var closedInvAccsTableW0  = $($("#w0 table")[0]);
	var tbodyW0 = $(closedInvAccsTableW0.find("tbody")[0]);
	chrome.storage.local.get(acc, function (obj) {
		
		
		var pammsDict = {};
		if (typeof obj[acc] == 'undefined') return;
		pammsDict = obj[acc];
		
		for(key in pammsDict){
			var pammObj = pammsDict[key];
			var tr = tbody.find("tr[data-key='" + pammObj.invAccId + "']")[0];
			var trW0 = tbodyW0.find("tr[data-key='" + pammObj.invAccId + "']")[0];
			
			
			if (typeof trW0 != 'undefined')
			{
				var td = $($(trW0).find("td")[0]);
				td.append(" " + pammObj.typeShort);
			}
			
			if (typeof tr != 'undefined')
			{
				var td = $($(tr).find("td")[0]);
				td.append(" " + pammObj.typeShort);
			}else{
				
				var td = '<tr data-key="' + pammObj.invAccId + '"><td><a class="_" href="/investor/details/' + pammObj.invAccId + '">' + pammObj.invAccId + '</a> ' + pammObj.typeShort + '</td><td>' + pammObj.name + '</td><td><a class="_" href="/pamm/details/' + pammObj.pammId + '">' + pammObj.pammId + '</a></td><td></td><td></td><td></td><td></td></tr>';
				tbody.append(td);
			}
			
		}
		
		closedInvAccsTable.DataTable({
			"paging":   false,
			"info":     false,
			bFilter: false,
			bInfo: false,
			"order": [[ 1, "asc" ]]
		});
		
	});
	
	$.get("https://my.privatefx.com/accounts", function (html) {

        var htmlLength = html.length;
        var startPosition = html.indexOf("Счет \"1+1\" результирующий");
        if (startPosition == -1) return;
        var text = html.substr(startPosition, htmlLength - startPosition);

        var endposition = text.indexOf("</tr>");
        text = text.substr(0, endposition);



        var strongtext = text.match(/<strong>(.*?)<\/strong>/g)[0];

        var money11 = strongtext.substr(8, strongtext.length - 17);

        var a = $("div.user-nav__log > a.btn.btn-primary.btn-sm[href$='/accounts/top_up']");
        //debugger;
		$("</br>").insertBefore(a);
        $("<strong>Результирующий 1+1</strong>").insertBefore(a);
        $("</br>").insertBefore(a);
        $("<span class='user-nav__log-date'>" + money11 + " USD</span>").insertBefore(a);
        $("</br>").insertBefore(a);
        $("<a class='_' href='http://pfx.batal.ru'>pfx.batal.ru</a>").insertBefore(a);
		
		
		
		div.insertBefore(table);
    });
	
	
	
	


});

function downloadTrades()
{
	var acc = $($("small.user-nav__login")[0]).html();
	chrome.storage.local.get(acc, function (obj) {
		
		
		var pammsDict = {};
		if (typeof obj[acc] == 'undefined') return;
		pammsDict = obj[acc];
		
		  for(key in pammsDict){
			  var pammObj = pammsDict[key];
			  if (pammObj.typeShort != '1+1') continue;
			  getProtTrades(pammObj.invAccId,1);
			 
		  }
		   // var pammObj = pammsDict[186388];
			  // getProtTrades(pammObj.invAccId,1);
		 
		var csvContent = "data:text/csv;charset=CP1252,";
		
		csvContent +=  "tradeId;allProfit;myProfit;lots ;instr;closedDate\n";
		
		protTrades.forEach(function(trade, index){
			dataString = trade.tradeId + ";" + trade.allProfit + ";" + trade.myProfit + ";" + trade.lots + ";" + trade.instr + ";" + trade.closedDate;
			csvContent += index < protTrades.length ? dataString+ "\n" : dataString;
		});
		
		var encodedUri = encodeURI(csvContent);
		var link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "my_data.csv");
		document.body.appendChild(link); // Required for FF

		link.click(); // This will download the data file named "my_data.csv".
		
	});
}


function getProtTrades(invAccId, pageNumber) {
	$.ajax({ url: "https://my.privatefx.com/investor/details/" + invAccId + "?page=" + pageNumber, 
	async: false,
	success: function(html) {
		
		
		var page = $(html);
		
		
		var div = page.find("div#w2");
		
		
		var rows = div.find("table > tbody > tr");
		
		for (i = 0; i < rows.length; i++) {
			
			
			var trade = {}
			
			var row = $(rows[i]);
			var tds = row.find("td");
			var key = row.data("key");
			trade.tradeId = key.ticket;
			
			
			
			
			trade.allProfit = tds[2].innerHTML.replace(/&nbsp;/gi,'');
			trade.instr = tds[4].innerHTML;
			trade.lots = tds[5].innerHTML.replace(/&nbsp;/gi,'');
			trade.closedDate = tds[6].innerHTML
			.replace(' янв. ','.01.')
			.replace(' февр. ','.02.')
			.replace(' марта ','.03.')
			.replace(' апр. ','.04.')
			.replace(' мая ','.05.')
			.replace(' июня ','.06.')
			.replace(' июля ','.07.')
			.replace(' авг. ','.08.')
			.replace(' сент. ','.09.')
			.replace(' окт. ','.10.')
			.replace(' нояб. ','.11.')
			.replace(' дек. ','.12.')
			.replace(' г.,','');
			
			var td7 = $(tds[7]);
			td7.find("span").remove();
			
			trade.myProfit = td7.html().replace('.',',');
			
			var a = trade.myProfit.localeCompare('0,00');
			if (trade.myProfit.localeCompare('0,00') != 0)
				protTrades.push(trade);
		}
		
		
		var pagination = div.find("ul.pagination");
		if (!pagination.length) return;
		
		var next = pagination.find("li.next");
		if (next.hasClass('disabled')) return;
		
		getProtTrades(invAccId, pageNumber+1);
		
		}
	});
}

//<tr data-key="66850"><td><a class="_" href="/pamm/investor_details/66850">66850</a></td><td>Otmar</td><td>6&nbsp;218</td><td>100,00</td><td>0,00</td><td>128.31</td><td>28,31</td><td>Активен </td></tr>

