$(function () {
    let device_num = 1;
    $("#device1").click(function () {
        $(this).addClass("active");
        $("#device2").removeClass("active");
        $("#device3").removeClass("active");
        $("#device4").removeClass("active");
        $("#device5").removeClass("active");
        $("#device6").removeClass("active");
        device_num = 1;
        getData(device_num);
    });
    $("#device2").click(function () {
        $(this).addClass("active");
        $("#device1").removeClass("active");
        $("#device3").removeClass("active");
        $("#device4").removeClass("active");
        $("#device5").removeClass("active");
        $("#device6").removeClass("active");
        device_num = 2;
        getData(device_num);
    });
    $("#device3").click(function () {
        $(this).addClass("active");
        $("#device1").removeClass("active");
        $("#device2").removeClass("active");
        $("#device4").removeClass("active");
        $("#device5").removeClass("active");
        $("#device6").removeClass("active");
        device_num = 3;
        getData(device_num);
    });
    $("#device4").click(function () {
        $(this).addClass("active");
        $("#device1").removeClass("active");
        $("#device2").removeClass("active");
        $("#device3").removeClass("active");
        $("#device5").removeClass("active");
        $("#device6").removeClass("active");
        device_num = 4;
        getData(device_num);
    });
    $("#device5").click(function () {
        $(this).addClass("active");
        $("#device1").removeClass("active");
        $("#device2").removeClass("active");
        $("#device3").removeClass("active");
        $("#device4").removeClass("active");
        $("#device6").removeClass("active");
        device_num = 5;
        getData(device_num);
    });
    $("#device6").click(function () {
        $(this).addClass("active");
        $("#device1").removeClass("active");
        $("#device2").removeClass("active");
        $("#device3").removeClass("active");
        $("#device4").removeClass("active");
        $("#device5").removeClass("active");
        device_num = 6;
        getData(device_num);
    });


    $('#graphs').on('slide.bs.carousel', () => {
        drawChart();
    })
    /* $(window).resize(function () {
        getData(device_num);
    }); */
    getData(device_num);
});
var soil_Temp = [];
var soil_Moist = [];
var Temp = [];
var Humidity = [];
var input_Current = [];
var input_Voltage = [];
var time = [];
var date = "";
function getData(dev_num) {
    $.ajax({
        type: "GET",
        beforeSend: function (request) {
            request.setRequestHeader("x-api-key", "GdgwUaoKRYaglp7SyO4WFGdp1SnOQdX3fuID0hj6");
        },
        url: "https://e58fw3pq9b.execute-api.us-east-1.amazonaws.com/dev/codexpress_data?type=data",
        success: function (result) {
            soil_Temp = [];
            soil_Moist = [];
            Temp = [];
            Humidity = [];
            input_Current = [];
            input_Voltage = [];
            time = [];
            date = "";
            console.log(result);
            let x = result.data[dev_num];
            if (x.length === 0) {
                time.push(16, 00, 00);
                soil_Temp.push([time, 0]);
                soil_Moist.push([time, 0]);
                Temp.push([time, 0]);
                Humidity.push([time, 0]);
                input_Voltage.push([time, 0]);
                input_Current.push([time, 0]);
            }
            else {
                date += ((new Date(x[0].timestamp).getDate()).toString()) + "/";
                date += ((new Date(x[0].timestamp).getMonth()).toString()) + "/";
                date += (new Date(x[0].timestamp).getFullYear()).toString();
                var Rssi = [];
                var Switch = [];
                let counter = 0;
                for (let i = (x.length) - 1; i >= 0; i--) {
                    var obj = x[i];
                    if (obj.timestamp === null) {
                        let d = new Date();
                        if (i != 0 && time[i - 1] == d.getHours())
                            time.push((d.getHours()).toString() + ":30");
                        else
                            time.push((d.getHours()).toString());
                    }
                    else {
                        time.push(gettime(obj.timestamp));
                    }
                    if (obj.soil_temp === null)
                        soil_Temp.push([time[counter], 0]);
                    else
                        soil_Temp.push([time[counter], parseFloat(obj.soil_temp)]);
                    if (obj.soil_moist === null)
                        soil_Moist.push([time[counter], 0]);
                    else
                        soil_Moist.push([time[counter], parseFloat(obj.soil_moist)]);
                    if (obj.temp === null)
                        Temp.push([time[counter], 0]);
                    else
                        Temp.push([time[counter], parseFloat(obj.temp)]);
                    if (obj.humidity === null)
                        Humidity.push([time[counter], 0]);
                    else
                        Humidity.push([time[counter], parseFloat(obj.humidity)]);
                    if (obj.input_current === null)
                        input_Current.push([time[counter], 0]);
                    else
                        input_Current.push([time[counter], parseFloat(obj.input_current)]);
                    if (obj.input_voltage === null)
                        input_Voltage.push([time[counter], 0]);
                    else
                        input_Voltage.push([time[counter], parseFloat(obj.input_voltage)]);
                    if (obj.rssi === null)
                        Rssi.push([time[counter], 0]);
                    else
                        Rssi.push([time[counter], parseFloat(obj.rssi)]);
                    if (obj.switch === null)
                        Switch.push([time[counter], 0]);
                    else
                        Switch.push([time[counter], parseFloat(obj.switch)]);
                    counter++;
                }
            }
            google.charts.load('current', { 'packages': ['line'] });
            google.charts.setOnLoadCallback(drawChart);
        }
    });
}



function drawChart() {
    var soil_t = new google.visualization.DataTable(soil_Temp);
    soil_t.addColumn('timeofday', 'Time');
    soil_t.addColumn('number', 'Soil Temperature');
    var soil_m = new google.visualization.DataTable(soil_Moist);
    soil_m.addColumn('timeofday', 'Time');
    soil_m.addColumn('number', 'Soil Moisture');
    var air_t = new google.visualization.DataTable(Temp);
    air_t.addColumn('timeofday', 'Time');
    air_t.addColumn('number', 'Air Temperature');
    var air_h = new google.visualization.DataTable(Humidity);
    air_h.addColumn('timeofday', 'Time');
    air_h.addColumn('number', 'Air Humidity');
    var input_c = new google.visualization.DataTable(input_Current);
    input_c.addColumn('timeofday', 'Time');
    input_c.addColumn('number', 'Input Current');
    var input_v = new google.visualization.DataTable(input_Voltage);
    input_v.addColumn('timeofday', 'Time');
    input_v.addColumn('number', 'Input Voltage');
    soil_t.addRows(soil_Temp);
    soil_m.addRows(soil_Moist);
    air_t.addRows(Temp);
    air_h.addRows(Humidity);
    input_c.addRows(input_Current);
    input_v.addRows(input_Voltage);

    var options = {
        hAxis: {
            /* viewWindow: {
                min: 0,
                max: 100
            }, */
        },
        vAxis: {
            format: '0.00'
        },
        chart: {
            title: 'Realtime readings',
            subtitle: 'Dated: ' + date,
        },
        curveType: 'function',
        colors: ['red'],
        width: 700,
        height: 400,
        lineWidth: 10,
        //backgroundColor.stroke: '#766'
    };

    var chart1 = new google.charts.Line(document.getElementById('linechart_material1'));
    chart1.draw(soil_t, google.charts.Line.convertOptions(options));
    var chart2 = new google.charts.Line(document.getElementById('linechart_material2'));
    chart2.draw(soil_m, google.charts.Line.convertOptions(options));
    var chart3 = new google.charts.Line(document.getElementById('linechart_material3'));
    chart3.draw(air_t, google.charts.Line.convertOptions(options));
    var chart4 = new google.charts.Line(document.getElementById('linechart_material4'));
    chart4.draw(air_h, google.charts.Line.convertOptions(options));
    var chart5 = new google.charts.Line(document.getElementById('linechart_material5'));
    chart5.draw(input_c, google.charts.Line.convertOptions(options));
    var chart6 = new google.charts.Line(document.getElementById('linechart_material6'));
    chart6.draw(input_v, google.charts.Line.convertOptions(options));

    //Get the last entries of each data
    if (soil_Temp[soil_Temp.length - 1][1] === 0 && soil_Temp.length === 1) {
        $('#stemp').text("__");
        $('#smoist').text("__");
        $('#atemp').text("__");
        $('#ahumid').text("__");
        $('#current').text("__");
        $('#volt').text("__");
    }
    else {
        $('#stemp').text(soil_Temp[soil_Temp.length - 1][1]);
        $('#smoist').text(soil_Moist[soil_Moist.length - 1][1]);
        $('#atemp').text(Temp[Temp.length - 1][1]);
        $('#ahumid').text(Humidity[Humidity.length - 1][1]);
        $('#current').text(input_Current[input_Current.length - 1][1]);
        $('#volt').text(input_Voltage[input_Voltage.length - 1][1]);
    }
}

function gettime(UTC_time) {
    let hr = new Date(UTC_time).getUTCHours();
    let mins = new Date(UTC_time).getUTCMinutes();
    let secs = new Date(UTC_time).getUTCSeconds();
    let time = [];
    time.push(hr, mins, secs);
    return time;
}