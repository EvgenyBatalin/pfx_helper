$(function () {
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

