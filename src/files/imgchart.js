function drawChart() {
var gd = document.getElementById('good').value.replace("'", "\\'");
var bd = document.getElementById('bad').value.replace("'", "\\'");
      // Create the data table.
    document.getElementById("chart").src="https://chart.googleapis.com/chart?cht=p3&chs=600x200&chl=Lame|Awsome&chco=FF0000|00FF00&chtt=People+Who+Think+This+is&chd=t:" + bd + "," + gd
    }
    function SelectAll(id)
{
    document.getElementById(id).focus();
    document.getElementById(id).select();
}
