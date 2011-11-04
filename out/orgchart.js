google.load('visualization', '1', {packages: ['orgchart', 'table']});
    
    var map;
    var table;
    var data;

    function drawOrgChartAndTable() {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Name');
      data.addColumn('string', 'Manager');
      data.addRows(13);
      data.setCell(0, 0, 'David');
      data.setCell(1, 0, 'Clinton');
      data.setCell(1, 1, 'David');
      data.setCell(2, 0, 'Bob');
      data.setCell(2, 1, 'Clinton');
      data.setCell(3, 0, 'Steve');
      data.setCell(3, 1, 'Clinton');
      data.setCell(4, 0, 'Ned');
      data.setCell(4, 1, 'Clinton');
      data.setCell(5, 0, 'Lee Ann');
      data.setCell(5, 1, 'Clinton');
    data.setCell(6, 0, 'Kevin');
      data.setCell(6, 1, 'Bob');
      data.setCell(7, 0, 'Kate');
      data.setCell(7, 1, 'Steve');
      data.setCell(8, 0, 'Catherine');
      data.setCell(8, 1, 'Steve');
      data.setCell(9, 0, 'Lionel');
      data.setCell(9, 1, 'Ned');
      data.setCell(10, 0, 'Mark');
      data.setCell(10, 1, 'Ned');
      data.setCell(11, 0, 'Vacant');
      data.setCell(11, 1, 'Ned');
      data.setCell(12, 0, 'Stephen');
      data.setCell(12, 1, 'Steve');
      var orgchart = new google.visualization.OrgChart(document.getElementById('orgchart'));
      orgchart.draw(data, {allowCollapse:true});
      orgchart.collapse(0, true);
      orgchart.collapse(1, true);
orgchart.collapse(2, true);
    orgchart.collapse(3, true);
    orgchart.collapse(4, true);
    
      var table = new google.visualization.Table(document.getElementById('table'));
      table.draw(data, null);
      
      // When the table is selected, update the orgchart.
      google.visualization.events.addListener(table, 'select', function() {
        orgchart.setSelection(table.getSelection());
      });
    
      // When the orgchart is selected, update the table visualization.
      google.visualization.events.addListener(orgchart, 'select', function() {
        table.setSelection(orgchart.getSelection());
      });  
    }

    google.setOnLoadCallback(drawOrgChartAndTable);
