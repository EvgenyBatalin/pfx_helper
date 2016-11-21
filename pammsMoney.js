$(function () {
	
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

	var closedInvAccsDiv = $('#w1');
	var closedInvAccsTable = $(closedInvAccsDiv.find("table")[0]);
	//var closedInvAccsTrs = closedInvAccsTable.find("tbody tr");
	var tbody = $(closedInvAccsTable.find("tbody")[0]);
	
	chrome.storage.sync.get(acc, function (obj) {
		
		
		
		var pammsDict = {};
		
		if (typeof obj[acc] == 'undefined') return;
		
		pammsDict = obj[acc];
		
		for(key in pammsDict){
			
			
			
			
			var pammObj = pammsDict[key];
			
			
			var tr = tbody.find("tr[data-key='" + pammObj.invAccId + "']")[0];
			
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
    });
	
	
	
	


});


//<tr data-key="66850"><td><a class="_" href="/pamm/investor_details/66850">66850</a></td><td>Otmar</td><td>6&nbsp;218</td><td>100,00</td><td>0,00</td><td>128.31</td><td>28,31</td><td>Активен </td></tr>

