$(function () {


	var mya = $('*:contains("pfx.batal.ru")');
	
	if (typeof mya != 'undefined')
	{
		return;
	}
	

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
		
		var mya = $('*:contains("pfx.batal.ru")');
		$("</br>").insertBefore(a);
		$("<strong>Результирующий 1+1</strong>").insertBefore(a);
		$("</br>").insertBefore(a);
		$("<span class='user-nav__log-date'>" + money11 + " USD</span>").insertBefore(a);
		$("</br>").insertBefore(a);
		$("<a class='_' href='http://pfx.batal.ru'>pfx.batal.ru</a>").insertBefore(a);
		
    });
});
