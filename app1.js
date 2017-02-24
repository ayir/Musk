var main = function() {


   $(".button").click(function(){
     $("#file").trigger('click');

   });

	
	$("#file").change(function() {
		 var file = this.files[0];
        RetrieveData(file);
});

   function RetrieveData(file){
	  var textType = /text.*/;
   
    if (file.type.match(textType)) {
     var reader = new FileReader();

      reader.onload = function(e) {
     var rows = e.target.result.split(",");
       for (var i = 0; i < rows.length; i++) {
             
                var cells = rows[i].split(":");
            for (var j = 0; j < cells.length; j++) {
            	cells[j] = cells[j].replace(/\s+/g, '');
            	
                  if(cells[j]=="PAN"){
                      if(j+1<cells.length){
                      	if(validate(cells[j+1]))
                      	  $("#pan").val(cells[j+1]);
                        else
                          alert("Invalid PAN No.");
                      }
                  }
                  if(cells[j]=="NAME"){
                    
                      if(j+1<cells.length){
                      	if(validate(cells[j+1]))
                      	  $("#c_name").val(cells[j+1]);
                      	else
                      		alert("Invalid Company Name");
                      }
                  }
                  if(cells[j]=="DATE"){
                      if(j+1<cells.length){
                      	if(testDate(cells[j+1]))
                       	$("#date").val(cells[j+1]);
                       else
                       	alert("Invalid date");
                      }
                  }
                 
          }
    }
 }   
     reader.readAsText(file);  
    } else {
  alert("File not supported!");
}
   } 
     

var obj = $(".inner_first");
obj.on('dragenter', function (e) 
{
    e.stopPropagation();
    e.preventDefault();
   
});
obj.on('dragover', function (e) 
{
     e.stopPropagation();
     e.preventDefault();
});
obj.on('drop', function (e) 
{
 
   
     e.preventDefault();
     var file = e.originalEvent.dataTransfer.files[0];
      RetrieveData(file);
    
});
	
	$(document).on('dragenter', function (e) 
{
    e.stopPropagation();
    e.preventDefault();
});
$(document).on('dragover', function (e) 
{
  e.stopPropagation();
  e.preventDefault();
  
});
$(document).on('drop', function (e) 
{
    e.stopPropagation();
    e.preventDefault();
});
	 
function testDate(str){
  var t = str.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if(t===null)
    return false;
  var d=+t[1], m=+t[2], y=+t[3];
  //below should be more acurate algorithm
  if(m>=1 && m<=12 && d>=1 && d<=31){
    return true;  
  }
  return false;
}
	
function validate(str){
      var alphaExp = /^[0-9a-zA-Z\s]+$/;
      if(str.match(alphaExp)){
        return true;
    }
    return false;
   }	

	
}
$(document).ready(main);