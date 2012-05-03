$(function()
{

       $('#currency_dialog').dialog({
        autoOpen: false,
        width: 800,
        
        buttons: {
            "Ok": function() { 
               $("#saveCurrency").submit();
            }, 
            "Cancel": function() { 
                $(this).dialog("close"); 
            } 
        }
          
    });
    
         $('#editcurrency_dialog').dialog({
        autoOpen: false,
        width: 800,
        
        buttons: {
            "Ok": function() { 
                $("#editCurrency").submit();
            }, 
            "Cancel": function() { 
                $(this).dialog("close"); 
            } 
        }
          
    });
      
      $(".newcurrency").click(function(){
           clearFormCurrency();
           $('#currency_dialog').dialog("open");
          
      }) ; 
      
      $(".editCurrency").click(function(){
          clearFormEditCurrency();
          var CurrencyId=$(this).attr("id");
           $.post(baseUrl+"/admin/Currency/getcurrencydetails",{
              currencyId:CurrencyId
          },function($data){
             
             var obj = jQuery.parseJSON($data.currencyNames);
             var htmlContent;
             htmlContent= "<tr style='background-color:#B30F0F;'>";
             htmlContent+="<td style='color: white'>Currency</td>";
             htmlContent+="<td style='color: white'>Exchange Rate</td></tr>";
                  
              for($i=0;$i<$data.currencyNames.length;$i++)
                  {
                      htmlContent+="<tr><td>"+$data.currencyNames[$i]+"</td><br/>";
                      htmlContent+="<td><input type='text' id='currency"+$i+"'/></td></tr>";
                      
                  }
              $('#name').attr("value",$data.currencyDetails.currencyname);
              $('#code').attr("value",$data.currencyDetails.currenycode);
              $('#symboledit').attr("value",$data.currencyDetails.symbol);
              $('#htmlsymbol').attr("value",$data.currencyDetails.htmlsymbol);
              $('#characterpadding').attr("value",$data.currencyDetails.paddingcharecter);
              $("#positionsymboledit").attr("value",$data.currencyDetails.symbolposition);
              if($data.currencyDetails.baserate=="Yes")
               {
                $("#currencybase").removeAttr("checked");
                $("#currencybase").attr("checked","checked");
               }
              if($data.currencyDetails.priority==1)
               {
                $("#prior").removeAttr("checked");
                $("#prior").attr("checked","checked");  
               }
             $("#cid").attr("value",$data.currencyDetails.id);
             $("#ratelist").html(htmlContent);
             
             
      },"json");
       $('#editcurrency_dialog').dialog("open");
      });
      
      
      
      $(".currencydeleterow").click(function(event){
  
          event.preventDefault();   
           var CurrencyId = $(this).attr('id');
              if(CurrencyId){
    		 if(confirm("Do you want to delete Currency?")){
    			  $.post(baseUrl+"/admin/Currency/deletecurrency",{
                  currencyId:CurrencyId
                  },function(){
                         window.location.href=baseUrl+"/admin/Currency"; 
                  });
                  
    		 }
    	    }
    	    else{
    		 console.log("Erorr");
    	 }    
      });
      
      
});

function clearFormCurrency()
{
    $("#hiddenid").attr("value","");
    $('#currencyname').attr("value","");
    $('#currencycode').attr("value","");
    $('#symbolhtml').attr("value","");
    $('#paddingcharacter').attr("value","");
    $("#basecurrency").removeAttr("checked");
    $("#priority").removeAttr("checked");
}

function clearFormEditCurrency()
{
    $("#cid").attr("value","");
    $('#name').attr("value","");
    $('#code').attr("value","");
    $('#htmlsymbol').attr("value","");
    $('#characterpadding').attr("value","");
    $("#currencybase").removeAttr("checked");
    $("#prior").removeAttr("checked");
}
