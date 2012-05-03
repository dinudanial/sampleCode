$(function(){
    
    $("#accordion").accordion({
        header: "h3",
        autoHeight: false,
        collapsible: true,
        active: false
    });
    // Dialog Box for country		
    $('#dialog').dialog({
        autoOpen: false,
        width: 800,
        
        buttons: {
            "Ok": function() { 
                
                  
                           $("#addCountry").validate({
                               rules: {
                                  name: {
                                     required: true
                                 }
                               },
                               messages: {
                                  name: {
                                     required: "Please Provide the name of the Country"
                                    
                                  }
                              }
                           });
                           $("#addCountry").submit();
                	 

            }, 
            "Cancel": function() { 
                $(this).dialog("close"); 
            } 
        }
          
    });
       //Dialog Boxes
       $('#busline_dialog').dialog({
            autoOpen: false,
            width: 800,
            buttons: {
                "Ok": function() { 
                	
                      $("#saveBusline").validate({
                         rules: {
                            lineName: {
                               required: true
                            },
                                   
                            insuranceclassbusline:{
                               
                               required:function(element)
                               {
                                   var pp= element.id;
                                   //console.log(pp);
                                  // console.log("index"+pp.selectedIndex);
                                   return false;
                                  if(element.value=="0") {
                                 
                                     return  true;
                                 }else{
                                     return false;
                                 }                             
                               
                            }
                                
                            }
                          
                         },
                         messages: {
                                lineName: {
                                     required: "Please Provide the name for the business"
                                },
                                insuranceclassbusline:{
                                    required: "Please Select the Insurance Class"
                                }
                             
                         }
                          
                      });
                      $("#saveBusline").submit();
                }, 
                "Cancel": function() { 
                    $(this).dialog("close"); 
                } 
            }
          
        });
 
      
       
         $(".deleterow").click(function(event){
              event.preventDefault();
             
             var BuslineId = $(this).attr('id');
               if(BuslineId){
    		 if(confirm("Do you want to delete Business line?")){
    			  $.post(baseUrl+"/admin/Buslines/deletebusline",{
                   buslineId:BuslineId
                  },function($data){
                           window.location.href=baseUrl+"/admin/Buslines"; 
                  });
                  
    		 }
    	 }
    	 else{//ToDo
    		 console.log("Erorr");
    	 }
           
         
                 
         });
        
   
          $(".editrow").click(function(){
      
            clearFormData();
              var BuslineId = $(this).attr('id');
        
          $.post(baseUrl+"/admin/Buslines/getbuslinedetails",{
              buslineId:BuslineId
          },function($data){
            
             $('#lineName').attr("value",$data.LineName);
             if($data.enabled==1)
                 {
                     $('#enabled').attr("checked","checked");
                 }
                 else
                     {
                         $("#enabled").removeAttr("checked");
                     }
            
             $("#insuranceclassbusline").attr("value",$data.insuranceClass);
             $("#hiddenid").attr("value",$data.id);
            
          },"json");
          
          $("#busline_dialog").dialog('open');
          return false;
         });

				
/**************************************************************************************************************************
 * Country 
 * 
 **************************************************************************************************************************/
    
    $('.dialog_link').click(function(){
        var CountyId=$(this).parent().parent().attr('id');
        $("#countryid").attr("value",CountyId);
        $(".error").html('');
        $.post(baseUrl+"/admin/Countries/getcountrydetails",{
            countryId:CountyId
        },function($data){
            $("#hidenFileId").attr("value",'');
             $("#previousfile").html('');
            $("#name").attr("value",$data.country);
            //$("#autherised").attr("value",$data.authorised);
            $("#autherised option[value="+$data.authorised+"]").attr('selected', 'selected');

            if($data.standingDataApplicable==true)
            {
                $("#sendingDataApplicable").attr("checked","checked");
            }
            else{
            	$("#sendingDataApplicable").removeAttr("checked")
            }
            if($data.admittedType==0)
            {
                $("#admitted_type-1").removeAttr("checked");
                $("#admitted_type-0").attr("checked","checked");
               
            }
            else if($data.admittedType==1)
            {
                $("#admitted_type-0").removeAttr("checked");
                $("#admitted_type-1").attr("checked","checked");
               
            }
            else if($data.admittedType==null){
            	$("#admitted_type-0").removeAttr("checked");
            	$("#admitted_type-1").removeAttr("checked");
            }
            if($data.admittedType==0){
            	$("#defaultAdmittedEntry1").addClass('adminttedentryhide').removeClass('adminttedentryshow');
            	$("#defaultAdmittedEntry").addClass('adminttedentryshow').removeClass('adminttedentryhide');
                $("#defaultAdmittedEntry").attr("value",$data.admittedEntry);
            }  
            else if($data.admittedType==1){
                $("#defaultAdmittedEntry1").addClass('adminttedentryshow').removeClass('adminttedentryhide');
                $("#defaultAdmittedEntry").addClass('adminttedentryhide').removeClass('adminttedentryshow');
                $("#defaultAdmittedEntry1").attr("value",$data.admittedEntry);
            }
            else if($data.admittedType==null){
            	if($data.admittedEntry=="Yes/FOS"){
            		$("#defaultAdmittedEntry1").addClass('adminttedentryshow').removeClass('adminttedentryhide');
                        $("#defaultAdmittedEntry").addClass('adminttedentryhide').removeClass('adminttedentryshow');
            		$("#defaultAdmittedEntry1").attr("value",$data.admittedEntry);
            	}
            	else{
            		$("#defaultAdmittedEntry1").addClass('adminttedentryhide').removeClass('adminttedentryshow');
                	$("#defaultAdmittedEntry").addClass('adminttedentryshow').removeClass('adminttedentryhide');
                    $("#defaultAdmittedEntry").attr("value",$data.admittedEntry);
            	}
            }
            
            	  
            if($data.residencePullDown==true)
            {
                $('#residenceDropDown').attr("checked","checked");
            }
            else{
            	 $('#residenceDropDown').removeAttr("checked","checked");
            }
            if($data.lockAdmitted==true)
            {
                $('#lockAdmitted').attr("checked","checked");
            }
            else{
           	 	$('#lockAdmitted').removeAttr("checked","checked");
           }
            if($data.LPAN==true)
            {
                $('#lpan').attr("checked","checked");
            }
            else{
           	 	$('#lpan').removeAttr("checked","checked");
           }
            $("#countrycommentary").text($data.countryCommentary);
                
           if($data.fileId){
               $("#hidenFileId").attr("value",$data.fileId);
               $("#filedescription").text($data.fileDescription);
               $("#previousfile").html('');
               //$htmlcontent =   'File';
               if($data.fileName.length>25){
                  $fileName = $data.fileName.substring(0, 25)+"...";
               }
               else{
                   $fileName = $data.fileName;
               }
               $htmlcontent =   '<a href="'+baseUrl+'/admin/countries/download/fileId/'+$data.fileId+'/fileName/'+$data.fileName+'">'+$fileName+'</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a id="'+$data.fileId+'" class="deleteFile " rel="'+$data.fileName+'" href="#">Delete</a>';
               $("#previousfile").html($htmlcontent);
           }
           $('#dialog').dialog('open');
        },"json");
        
         
        return false;
    //Admitted Type change    busline_dialog
            
    });
    //Delete uploaded file
    $(".deleteFile").die("click");
    $(".deleteFile").live("click",function(){
        $fileId = $(".deleteFile").attr("id");
        $fileName = $(".deleteFile").attr("rel");
        if(confirm("Do you want to delete uploaded file?")){
            $.post(baseUrl+"/admin/countries/deletefile",{fileId:$fileId,fileName:$fileName},function($data){
                if($data.status){
                    $("#previousfile").html('');
                    $("#filedescription").text('');
                }
            },"json");
        }
        
    });
  
    
 /**************************************************************************************************************************
 * Busline 
 * 
 **************************************************************************************************************************/
    
        
    $('.busline_dialoglink').click(function(){
            clearFormData();
            $('#busline_dialog').dialog('open');
            return false;
    });
				
    //hover states on the static widgets
    $('#dialog_link, ul#icons li').hover(
        function() {
            $(this).addClass('ui-state-hover');
        }, 
        function() {
            $(this).removeClass('ui-state-hover');
        }
        );

    
        //Change of admitted type in country page
        $('input[name=admitted_type]').click(function(){
        	var value =	$(this).val();
        	if(value==0){
        	   $("#defaultAdmittedEntry1").removeClass('adminttedentryshow').addClass('adminttedentryhide');
        	   $("#defaultAdmittedEntry").removeClass('adminttedentryhide').addClass('adminttedentryshow');
         	   $("#defaultAdmittedEntry").attr("value",'Yes');
        	}
        	if(value==1){
        	   $("#defaultAdmittedEntry").removeClass('adminttedentryshow').addClass('adminttedentryhide');
        	   $("#defaultAdmittedEntry1").addClass('adminttedentryshow').removeClass('adminttedentryhide');
         	   $("#defaultAdmittedEntry1").attr("value",'Yes/FOS');
        	}
        });

/**************************************************************************************************************************
 * Rate Page and Rate line
 * 
 **************************************************************************************************************************/
     
    rateAndRateLineEventBind();
        

  /*#################################################################################
   * Web News
   *#################################################################################*/
       
      //Dialog box for webnews
      $("#webnews_dialog").dialog({
           autoOpen: false,
           width: 600,
           buttons: {
               "Ok": function() { 
                   
                          
            	   $("#webnewsForm").validate({
                      rules:{
                          newsDate:{
                              required:true
                          },
                          headline:{
                             required:true
                          },
                          content:{
                              required:true
                          }
                          
                      } ,
                      messages:{
                          newsDate:{
                               required:"Please Provide the Date Of the News"
                              },
                          headline:{
                              required:"please Provide the news Headline"
                          },
                          content:{
                              required:"please Provide the news Content"
                          }
                      }
                   });
            	   $("#webnewsForm").submit();
            

               }, 
               "Cancel": function() { 
                   $(this).dialog("close"); 
               } 
           }
       });
       
       $("#addWebNews").die("click");
       $("#addWebNews").live("click",function(event){
    	   event.preventDefault();
    	   clearnews();
    	   $('#webnews_dialog').dialog('open');
           return false;
       });
       $(".editNews").click(function(){
    	 $newsId = $(this).parent().attr("id");
    	 if($newsId){
    			$.post(baseUrl+"/admin/Webnews/getnews",{newsId:$newsId},function($data){
    				if($data){
    					 clearnews();
    					 $("#newsid").attr("value",$data.id);
    					 $("#newsDate").attr("value",$data.date);
    				         $("#headline").attr("value",$data.headline);
    				         $("#content").attr("value",$data.content);
    				         $('#webnews_dialog').dialog('open');
                                         $(".error").html("");
    				     //return false;
    				}
    				else{
    					console.log("No data!");
    				}
    			},"json") ;
    	}
    	else{
    		 alert("Erorr");
    		}
       });
       
       $( "#newsDate" ).datepicker({
			showOn: "button",
			showButtonPanel: true,
			buttonImage: baseUrl+"/img/calendar.gif",
			buttonImageOnly: true
		});
       
       $(".deleteNews").click(function(){
    	 $newsId = parseInt($(this).parent().parent().attr("id"));
    	 if($newsId){
    		 if(confirm("Do you want to delete webnews?")){
    			 $.post(baseUrl+"/admin/webnews/deletenews",{newsId:$newsId},function($data){
    				 if($data){
    					 window.location.href = baseUrl+"/admin/Webnews/index/msg/"+$data.msg; 
    	
    

}
    				 else{//ToDo
    					 console.log("Data erorr!");
    				 }
    			 },"json");
    		 }
    	 }
    	 else{//ToDo
    		 console.log("Erorr");
    	 }
       });     
       
  //Create quote date set
   $( "#d__Date" ).datepicker({
        showOn: "button",
        dateFormat:'mm/dd/yy',
        showButtonPanel: true,
        buttonImage: baseUrl+"/img/calendar.gif",
        buttonImageOnly: true
    });
    
     $( "#d__EffectiveDate" ).datepicker({
        showOn: "button",
        dateFormat:'mm/dd/yy',
        showButtonPanel: true,
        buttonImage: baseUrl+"/img/calendar.gif",
        buttonImageOnly: true
    });
    
    
   
       
});

 function clearFormData()
    {
        $("#lineName").attr("value","");
        $("#insuranceclassbusline").attr("value","");
        $("#insuranceclassbusline").children("option:selected").removeAttr("selected");  
        $("#enabled").removeAttr("checked");
        $(".error").html("");
        $("#hiddenid").attr("value","");
        
    }


 function clearnews(){
         $(".error").html('');
	 $("#newsid").attr("value","");
	 $("#newsDate").attr("value","");
         $("#headline").attr("value","");
         $("#content").attr("value","");
 }

 
