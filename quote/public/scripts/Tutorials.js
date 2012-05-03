$(function(){
        
        $('#tutorialgroup_dialog').dialog({
        autoOpen: false,
        width: 800,
        
        buttons: {
            "Ok": function() { 
                var $tutorialName=$("#tutorialgroup").val();
                var errMessage = "";
                if($tutorialName=="")
                 {
                    errMessage+=" Provide Group Name";
                    $("#errorMessage").html(errMessage);
                    
                 }
                 else
                 {
                    $.post(baseUrl+"/admin/Tutorials/savetutorialgroup",{tutorialname:$tutorialName},function($data){
                   var $htmlContent="<div style='background-color:gray'>Tutorial Groups</div>"
                    $htmlContent+="<ul>";
                    $.each($data,function(index,value){
                         $TutorialGroups=jQuery.parseJSON(value);
                         console.log($TutorialGroups);
                         $htmlContent+="<li>"+$TutorialGroups.name+"</li>"
                     });
                    $htmlContent+="</ul>";
                     $("#TutorialGroups").html($htmlContent) ;
                  },"json");
                 }
                 
            }, 
            "Cancel": function() { 
                $(this).dialog("close"); 
            } 
        }
          
    });
    
    
    
    $('#tutorial_dialog').dialog({
        autoOpen: false,
        width: 800,
        
        buttons: {
            "Ok": function() { 
                
                           $("#saveTutorial").validate({
                               rules: {
                                  tutorialname: {
                                     required: true
                                 },
                                 dateuploaded:{
                                     required:true
                                 }
                                 
                               },
                               messages: {
                                  tutorialname: {
                                     required: "Please Provide the name of the Tutorial"
                                    
                                  },
                                   dateuploaded:{
                                       required:"Please Provide the Date"
                                   }
                              }
                           });
                $("#saveTutorial").submit();
                 
            }, 
            "Cancel": function() { 
                $(this).dialog("close"); 
            } 
        }
          
    });
    
    
    /**************************************************************************************/
    
     $('.tutorialgroup_dialoglink').click(function(){
        
        $('#tutorialgroup_dialog').dialog('open');
        
             return false;
            
    });
    
    
     $('.tutorial_dialoglink').click(function(){
         clearFormTutorial();
         $('#tutorial_dialog').dialog('open');
         return false;   
    });
    
    
     $(".editrowtutorial").click(function(){
        clearFormTutorial();
        var TutorialId = $(this).attr('id');  
         $.post(baseUrl+"/admin/Tutorials/gettutorialdetails",{
              tutorialId:TutorialId
          },function($data){
              
             $('#tutorialname').attr("value",$data.tutorialname);
             console.log($data.groupname);
              $('#tutorialgrouptutorial').attr("value",$data.groupname);
      
             
             $("#dateuploaded").attr("value",$data.uploadeddate);
             
             $("#hiddenid").attr("value",$data.id);
        
             if($data.htmlfile!=null){
               
                var viewHtml="<a href='"+baseUrl+"/admin/Tutorials/downloadtutorial/tid/"+$data.id+"/type/html'+>View Html File</a>";
                
                $("#viewHtmlTutorial").html(viewHtml);
             }
              if($data.Pdffile!=null){
                var viewPdf="<a href='"+baseUrl+"/admin/Tutorials/downloadtutorial/tid/"+$data.id+"/type/html'+>View Pdf File</a>";
                
                $("#viewPdfTutorial").html(viewPdf);
             }
 
            },"json");
          
          $("#tutorial_dialog").dialog('open');
          return false;
         });
         
     //Delete Tutorial
         
      $(".tutorialdeleterow").click(function(event){
              event.preventDefault();
             
             var TutorialId = $(this).attr('id');
               if(TutorialId){
    		 if(confirm("Do you want to delete Tutorial?")){
    			  $.post(baseUrl+"/admin/Tutorials/deletetutorial",{
                   tutorialId:TutorialId
                  },function(){
                           window.location.href=baseUrl+"/admin/Tutorials"; 
                  });
                  
    		 }
    	 }
    	 else{
    		 console.log("Erorr");
    	 }    
         });
         
  
    
     $('#dialog_link, ul#icons li').hover(
        function() {
            $(this).addClass('ui-state-hover');
        }, 
        function() {
            $(this).removeClass('ui-state-hover');
        });
        
        
        $( "#dateuploaded" ).datepicker({
			showOn: "button",
			showButtonPanel: true,
			buttonImage: baseUrl+"/img/calendar.gif",
			buttonImageOnly: true
		});

});

function clearFormTutorial()
    {
 
        $("#tutorialname").attr("value","");
        $("#dateuploaded").attr("value","");
        $("#tutorialgrouptutorial").children("option:selected").removeAttr("selected");
        $("#viewHtmlTutorial").html("");
        $("#viewPdfTutorial").html("");
        $("#hiddenid").attr("value","");
        
    }



 
    
 