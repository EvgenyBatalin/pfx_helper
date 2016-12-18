$(function() {

    var div = $("<div class='summary'></div>")
    var button =
        $("<input class='btn btn-top-up btn-primary btn-sm' type=button value='Отправить заявки на pfx.batal.ru'/>");

    var button2 =
        $("<a class='btn btn-top-up btn-primary btn-sm' href='http://pfx.batal.ru/order/status'>Посмотреть отправленные заявки на pfx.batal.ru</a>");

    var table = $('#top-up-log');

    div.append(button);
    div.append(button2);

    div.insertBefore(table);

    button.on("click",
        function() {
            $(button).attr('disabled', 'disabled');


            getOrders($(document.documentElement).html())

            var page = $('li[class="last"] > a')[0];
            var pages = $($('li[class="last"] > a')[0]).data("page");

            for (j = 2; j < pages + 2; j++) {
                $.ajax({
                        url: "https://my.privatefx.com/accounts/cash_out?page=" + j,
                        async: false,
                        type: 'GET'
                    })
                    .done(function(html) {
                        getOrders(html);
                    });
            }
            $(button).removeAttr('disabled');
            alert("Данные успешно отправлены!");
        });


});

function getOrders(html) {

    
    var table1 = $(html).find('#top-up-log');


    var trs = table1.find("tbody tr");

    var orders = [];

    for (i = 0; i < trs.length; i++) {

        var order = {};

        var row = $(trs[i]);

        order.Id = row.data('key');
        order.Type = $($(row).find("td")[1]).html();
        order.Amount = $($(row).find("td")[2]).html().replace(/ /g, '').replace(/&nbsp;/g, '');
        var epsFull = $($(row).find("td")[3]).html();
		order.State = $($(row).find("td")[4]).html();
		
		if (order.Type.indexOf('Операция UAH') > 0){
			order.Eps = 'UAH';
		}else if (order.Type.indexOf('Операция PerfectMoney') > 0){
			order.Eps = 'PerfectMoney';
		}else{
			order.Eps = epsFull.substr(0, epsFull.indexOf(','));
		}
		
		if (order.Eps.indexOf('Невыполнение условий регламента программ 1+1') > 0)
			order.Eps = order.Eps + ' Невыполнение условий регламента программ 1+1';


        
        order.Created = (new Date($($(row).find("td")[5]).html())).toJSON();
        order.Updated = (new Date($($(row).find("td")[6]).html())).toJSON();

        orders.push(order);
    }
	


    //var url = 'https://localhost:44340/order/upload/';
    var url = 'https://batal.ru/order/upload/';
    $.ajax({
            url: url,
            async: false,
            type: 'POST',
            data: { 'orders': orders }
        })
        .done(function() {
            
        })
        .fail(function () {

        });

}

//Операция ЭПС
//ПАММ-система
//Партнерские