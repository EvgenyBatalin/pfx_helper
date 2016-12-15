$(function () {
	
	
	
	//var button = $("<input type=button value='Отправить заявки'/>");
	
	var div = $("<div class='summary'></div>")
	var button = $("<input class='btn btn-top-up btn-primary btn-sm' type=button value='Отправить заявки на pfx.batal.ru'/>");
	
	var table = $('#top-up-log');
	
	div.append(button);
	div.insertBefore(table);
	
	button.on("click", function () {
	$(button).attr('disabled', 'disabled');
	
	//var table = $('#top-up-log');
	
	var trs =  table.find("tbody tr");
	
	var orders = [];
	
	for (i = 0; i < trs.length; i++) {
		
		var order = {};
		
        var row = $(trs[i]);
		
		order.Id = row.data('key');
		order.Type = $($(row).find("td")[1]).html();
		order.Amount = $($(row).find("td")[2]).html().replace(/ /g,'').replace(/&nbsp;/g, '');
		var epsFull = $($(row).find("td")[3]).html();
		// if (epsFull.indexOf(',') > 0)
		// {
			// order.Eps = epsFull.substr(0, epsFull.indexOf(',')); 
		// }else{
			// order.Eps = epsFull;
		// }
		order.Eps = epsFull.substr(0, epsFull.indexOf(',')); 
		
		
		order.State = $($(row).find("td")[4]).html();
		order.Created = (new Date ($($(row).find("td")[5]).html())).toJSON();
		order.Updated = (new Date ($($(row).find("td")[6]).html())).toJSON();
		
		orders.push(order);
	}
	
		
	//var url = 'https://localhost:44340/order/upload/';
            var url = 'https://batal.ru/order/upload/';
            $.ajax({
                url: url,
                async: true,
                type: 'POST',
                data: { 'orders': orders }
             }).done(function () {
                alert("Данные успешно отправлены!");
                button.remove();
            }).fail(function() {
                $(button).removeAttr('disabled');
            });
	});
});

//Операция ЭПС
//ПАММ-система
//Партнерские