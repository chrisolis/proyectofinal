jQuery(document).ready(function() {
	jQuery('.donut_singleContainer').each(function(idx) {
		var yourPoints = jQuery('.yourPoints').data('yourpoints'),
				reward = jQuery(this).data('reward'),
				link = jQuery(this).data('link'),
				prog = yourPoints * 100 / reward,
				con = prog.toString().indexOf('.'),
				cont = '',
				cont1 = '<div class="progressTracker">Remain points to claim ' + (reward - yourPoints) + ' of ' + reward + '</div>';
		if(con > 0) {
			cont = prog.toFixed(2) + '%';
		} else if(prog >= 100) {
			cont = '<div class="checkMark"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 166 150.9"><path d="M0.3 96l62.4 54.1L165.6 0.3"/></svg></div>';
			cont1 = '<div class="progressTracker"><div class="container-login100-form-btn"><div class="wrap-login100-form-btn"><div class="login100-form-bgbtn"></div><a href="' + link + '" class="login100-form-btn">Claim Reward</a></div></div></div>'
		} else {
			cont = prog + '%';
		}

		if( jQuery(this).find('.donut_single').attr('id') == undefined) {
			jQuery(this).find('.donut_single').attr('id', 'donut_single' + idx);
		}
		
		var id = jQuery(this).find('.donut_single').attr('id');
		let pr = (prog > 100) ? 100 : prog,
				rm = ((100 - prog) < 0) ? 0 : (100 - prog);
		google.charts.load('current', {'packages':['corechart']});
		google.charts.setOnLoadCallback(drawChart);
		function drawChart() {
			var data = google.visualization.arrayToDataTable([
				['Effort', 'Amount given'],
				['My all',     pr],
				['Remain',     rm],
			]);
			var options = {
				pieHole: .75,
				pieSliceTextStyle: {
					color: 'transparent',
				},
				legend: 'none',
				tooltip: {
					trigger: 'none'
				},
				slices: {
					0: {
						color: '#6a80ec'
					},
					1: {
						color: 'transparent',
					}
				}
			};
			var chart = new google.visualization.PieChart(document.getElementById(id));
			chart.draw(data, options);
		}
		jQuery(this).find('.donut_singleWrapper').append('<div class="prog">' + cont + '</div>');
		jQuery(this).append(cont1);
	});
});