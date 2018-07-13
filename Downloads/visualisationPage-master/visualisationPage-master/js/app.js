$(function (){
    getData();
});

function getData(){
    $.ajax({
        type:"GET",
        beforeSend: function(request){
            request.setRequestHeader("x-api-key", "GdgwUaoKRYaglp7SyO4WFGdp1SnOQdX3fuID0hj6");
        },
        url: "https://e58fw3pq9b.execute-api.us-east-1.amazonaws.com/dev/codexpress_data?type=data",
        success: function(result){
            let x = result.data;
            console.log(x);
            var soil_Temp=[];
            var soil_Moist=[];
            var Temp=[];
            var Humidity=[];
            var input_Current=[];
            var input_Voltage=[];
            var Rssi=[];
            var Switch=[];
            for(var i = 0; i < x.length; i++) {
                var obj = x[i];
                if (obj.soil_temp == null)
                	soil_Temp[i]=0;
                else
                	soil_Temp[i]=obj.soil_temp;
                if (obj.soil_moist == null)
                    soil_Moist[i]=0;
                else
                    soil_Moist[i]=obj.soil_moist;
                if (obj.temp == null)
                    Temp[i]=0;
                else
                    Temp[i]=obj.temp;
                if (obj.humidity == null)
                   Humidity[i]=0;
                else
                   Humidity[i]=obj.humidity;
                if (obj.input_current == null)
                   input_Current[i]=0;
                else
                   input_Current[i]=obj.input_current;
                if (obj.input_voltage == null)
                   input_Voltage[i]=0;
                else
                   input_Voltage[i]=obj.input_voltage;
                if (obj.rssi == null)
                   Rssi[i]=0;
                else
                   Rssi[i]=obj.rssi;
                 if (obj.switch == null)
                   Switch[i]=0;
                 else
                   Switch[i]=obj.switch;
            }
            console.log(soil_Temp);
            console.log(soil_Moist);
            console.log(Temp);
            console.log(Humidity);
            console.log(input_Current);
            console.log(input_Voltage);
            console.log(Rssi);
            console.log(Switch);
            var arr=[];
            for(i=0;i<x.length;i++){
                //console.log(x[i].temp);
            }
            console.log(arr);
        }
    });
}

/*google.charts.load('current', {'packages':['line']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

var data = new google.visualization.DataTable();
data.addColumn('number', 'Time');
data.addColumn('number', 'Soil Temperature');
data.addColumn('number', 'Soil Moisture');
data.addColumn('number', 'Air Temperature');
//data.addColumn('number', 'Air Humidity');
//data.addColumn('number', 'Input Current');
//data.addColumn('number', 'Input Voltage');
//data.addColumn('number', 'RSSI');
//data.addColumn('number', 'Switch');

data.addRows([
    [0,  4.2,  6.2,  3.4],
    [1,  37.8, 80.8, 41.8],
    [2,  30.9, 69.5, 32.4],
    [3,  25.4,   57, 25.7],
    [4,  11.7, 18.8, 10.5],
    [5,  11.9, 17.6, 10.4],
    [6,   8.8, 13.6,  7.7],
    [7,   7.6, 12.3,  9.6],
    [8,  12.3, 29.2, 10.6],
    [9,  16.9, 42.9, 14.8],
    [10, 12.8, 30.9, 11.6],
    [11,  5.3,  7.9,  4.7],
    [12,  6.6,  8.4,  5.2],
    [13,  4.8,  6.3,  3.6],
    [14,  4.2,  6.2,  3.4],
    [15,  4.2,  6.2,  3.4],
    [16,  4.2,  6.2,  3.4],
    [17,  4.2,  6.2,  3.4],
    [18,  4.2,  6.2,  3.4],
    [19,  4.2,  6.2,  3.4],
    [20,  4.2,  6.2,  3.4],
    [21,  4.2,  6.2,  3.4],
    [22,  4.2,  6.2,  3.4],
    [23,  4.2,  6.2,  3.4]
]);

var options = {
    hAxis: {
        viewWindow: {
            min: 0,
            max: 23
        },
    },
    chart: {
        title: 'Prototype 1',
        subtitle: 'Dated: '
    },
    width: 900,
    height: 500
};

var chart = new google.charts.Line(document.getElementById('linechart_material'));
chart.draw(data, google.charts.Line.convertOptions(options));
}*/