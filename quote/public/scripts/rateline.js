function rateAndRateLineEventBind(){
     //Dialog box for RateLine
       $("#rateLineDialog").dialog({
            autoOpen: false,
            width: 800,
            buttons: {
                "Ok": function() { 	            	
                        $.post(baseUrl+"/admin/rateline/save",$("#rateLine").serialize(),function($data){
                            if($data.status){
                                    $("#rateLineDialog").dialog("close");
                            }
                        },"json")
	            	//$("#rateLine").submit();	     	      
                }, 
                "Cancel": function() { 
                    $(this).dialog("close"); 
                } 
            }
        });
       
       //Dialog for default subclass/tertiary
       $("#subclassDialog").dialog({
           autoOpen: false,
           width: 800,
           buttons: {
               "Cancel": function() { 
                   $(this).dialog("close"); 
               } 
           }
       });
       
      /*Change of Region in rate page
       * CreatedBy Anoop A
       */
      $('#regioncontrol').change(function(){
    	  var RegionId=$(this).val();  
          $.post(baseUrl+"/admin/Rate/getcountrylist",{regionid:RegionId},function($data){
        	  $("#country").children().remove();
              $("#country").append('<option value=""></option>');
              $.each($data, function(index, value){
            	  $("#country").append('<option value="'+value.ID_Country+'">'+value.d__CountryName+'</option>');
               });
          },"json");
              
        });
      
      //deminimisApplicable check box click
      $("#deminimisApplicable").click(function(){
    	  if($("#deminimisApplicable").is(':checked'))
    	  {
            
            $("#d__DeMinimis_TotalPremiumThreshold-label").parent().show();
            $("#d__DeMinimis_PremiumAllocationThreshold-label").parent().show();
          }
          else{
               
            $("#d__DeMinimis_TotalPremiumThreshold-label").parent().hide();
            $("#d__DeMinimis_PremiumAllocationThreshold-label").parent().hide();
          }
      });
      //set date picker for rate line start date
      $( "#startDate" ).datepicker({
            showOn: "button",
            dateFormat:'mm/dd/yy',
            showButtonPanel: true,
            buttonImage: baseUrl+"/img/calendar.gif",
            buttonImageOnly: true
        });
      //set date picker for rate line end date
      $( "#endDate" ).datepicker({
            showOn: "button",
            dateFormat:'mm/dd/yy',
            showButtonPanel: true,
            buttonImage: baseUrl+"/img/calendar.gif",
            buttonImageOnly: true
        });
      
    
       /*Show button click in Rate page
        * Created By:Anoop A
        */
       $('#show').click(function(){
    	   $regionId = 	$('#regioncontrol').attr('value');
    	   $countryId = $('#country').attr('value');
    	   if($regionId==''){//ToDo
    		   console.log("Region can not be empty!");
    	   }
    	   else if($countryId==''){//ToDo
    		   console.log("Country can not be empty!");
    	   }
    	   else{
    		   $masterId =	$('#masterid').attr('value');
    		   $insurClass = $('#insuranceclass').attr('value');
    		   //$dataIssue = $('#dataissue').attr('checked');$('#isOther:checked').val();
    		   $dataIssue = $('#dataissue:checked').val();
        	   $.post(baseUrl+"/admin/Rate/getratelist",
        			   {region:$regionId,country:$countryId,rateId:$masterId,insuranceClass:$insurClass,dataIssue:$dataIssue},
        			   function($data){
        				 if(!$data.erorr){
        					 var $htmlContent	='';
	           				 var rateLength=$data.length;
	           				 $htmlContent+='<table cellpadding=0 cellspacing=0 width="100%" id="test">';
	           				 $.each($data, function(index, value){
	           					var obj = jQuery.parseJSON(value);
	           					$htmlContent+='<tr id="'+obj.id+'"><td  width="5%">'+obj.id+'</td>';
	           					$htmlContent+='<td width="20%" class="editRate">'+obj.countryName+'</td>';
	           					$htmlContent+='<td width="20%" class="editRate">'+obj.insuranceClassName+'</td>';
	           					$htmlContent+='<td width="20%" class="editRate">'+obj.taxType+'</td>';
	           					$htmlContent+='<td width="15%" class="editRate">'+obj.taxSubClass+'</td>';
	           					$htmlContent+='<td width="10%" class="editRate">'+obj.tertiry+'</td>';
	           					var $defaultSubClass = '';
	           					if(obj.defaultSubClass!=0)$defaultSubClass = '<img src="../img/icon_tick.png"  title="Default Subclass"/>';//obj.defaultSubClass;
	           					$htmlContent+='<td width="7%" class="editRate">'+$defaultSubClass+'</td>';
	           					$htmlContent+='<td width="3%"><span class="delete" id="rateDelete"></span></td></tr>';
	           				 });
	           				 $htmlContent+='</table>';
	           				 $("#rateTd").html($htmlContent) ;
	           				 if(!$masterId)
	           					$masterId=0;
	           				 if($dataIssue == undefined)
	           					$dataIssue=0;
	           				 $("#addAndDownload").html('<a href="#" id="newRate">Add Rate</a> || <a href="'+baseUrl+"/admin/rate/report/countryid/"+$countryId+"/regionid/"+$regionId+"/masterid/"+$masterId+"/insuranceClass/"+$insurClass+"/dataIssue/"+$dataIssue+'">Download Found Rate in Excel</a>');
        				 }else{
        					 $("#rateTd").html("No rates found!")
        				 }
        				  
        				   
        	   },"json");
    	   } 
    	   
       });
       
       /*Rate save 
        * Created By:Anoop A
       */
       $("#save").click(function(){
    	   $("#addRate").validate();
    	   $taxType =	$("#taxType").attr("value");
    	   $rateId =	$("#masterRateId").attr("value");
    	   $countryId =	$("#newRatecountry").attr("value");
    	   $insuranceClass = $("#newRateinsuranceclass").attr('value');

           $Regionid=$("#newRateRegion").attr("value");
            
           if($taxType=="" || $countryId=="" || $Regionid=="" || $insuranceClass == 0)
               {
                   $("#errAddRate").html("Provide required Values in the form");
               }
    	   else{

    		   
    		   $.post(baseUrl+"/admin/Rate/save",$("#addRate").serialize(),function($data){
    			   if($data){
    				   if($data.status=='new'){
    					$('#ratePage').removeClass('rateshow').addClass('ratehidden');
                                        $('#rateList').removeClass('ratehidden').addClass('rateshow');
    				   }
    				   else{
    					   $('#ratePage').removeClass('rateshow').addClass('ratehidden');
                                           $('#rateList').removeClass('ratehidden').addClass('rateshow');
    				   }
    			   }
    			   else{//ToDo
    				   console.log("Erorr");
    			   } 
        	   },"json");
  	   }
       });
       //add rate cancel button
       $("#CancelButton").click(function(){
           $('#ratePage').removeClass('rateshow').addClass('ratehidden');
           $('#rateList').removeClass('ratehidden').addClass('rateshow');
       });
       
       /* Delete Rate
        *Created By :Anoop A
        */
       $("#rateDelete").die("click");
       $("#rateDelete").live("click",function(){
           $rateId = $(this).parent().parent().attr("id");
           if($rateId){
               if(confirm("Do you want to delete rate?")){
                   $.post(baseUrl+"/admin/rate/deleteRate",{rateId:$rateId},function($data){
                       if($data){//ToDo
                          console.log($data.message);
                          $("#show").trigger("click");
                       }
                   },"json");
               }
           }else{//ToDo
               console.log("Erorr in RateId");
           }
           
       });
       
       
       /*New Rate event bind
        * Created By:Anoop A
        */
       $("#newRate").die("click");
       $("#newRate").live("click",function(){
    	   $('#rateList').removeClass('rateshow').addClass('ratehidden');
           $rateId = $("#masterRateId").attr("value");
           if($rateId!="new")
               $("#rateLineDeatails").show();
           else
               $("#rateLineDeatails").hide();
    	   $('#ratePage').removeClass('ratehidden').addClass('rateshow');
           
    	   clearRateForm();
       });
       
       $(".editRate").die("click");
       $(".editRate").live("click",function(){
    	   $id = $(this).parent().attr("id");
    	   if($id){
                   $htmlcontent = '';
    		   $('#rateList').removeClass('rateshow').addClass('ratehidden');
        	   $('#ratePage').removeClass('ratehidden').addClass('rateshow');
         	   $.post(baseUrl+"/admin/rate/rateedit",{rateId:parseInt($id)},function($data){ 
                        setRateAndRateLineList($data);
                        
         		   
         	   },"json");
    	   }
    	   else{
    		   alert("Erorr!");
    	   }
    	   
       });
       
       /*Change of Region in Newrate dialog page
        * Created By:Anoop A
        */
       $('#newRateRegion').change(function(){
     	  var RegionId=$(this).val(); 
          $.post(baseUrl+"/admin/Rate/getcountrylist",{regionid:RegionId},function($data){
         	  $("#newRatecountry").children().remove();
              $("#newRatecountry").append('<option value=""></option>');
              $.each($data, function(index, value){
             	  $("#newRatecountry").append('<option value="'+value.ID_Country+'">'+value.d__CountryName+'</option>');
              });
          },"json");   
        });
       /*Default Subclass / Tertiary envent bind
        * Created  By:Anoop A
        */
       $("#defaultSubclasOrTertiary").click(function(){
    	   $taxType =	$("#taxType").attr("value");
    	   $countryId =	$("#newRatecountry").attr("value");
    	   $insuranceClass = $("#newRateinsuranceclass").attr('value');
    	   if($countryId=='')
    		   alert("Please select a Country!");
    	   else if($insuranceClass=='')
    		   alert("Please select an Insurance Class!");
    	   else if($taxType=='')
    		   alert("Please select a type of tax!");
    	   else{
    		   $rateId = $("#masterRateId").attr("value");
    		   $currency = $("#currency").attr("value");
    		   $country = $("#newRatecountry").attr("value");
    		   $typeofTax =	$("#taxType").attr("value");
    		   $insuranceClass = $("#newRateinsuranceclass").attr("value");
    		   $taxSubclass = $("#taxSubClass").attr("value");
    		   $htmlcontent = '';
    		   
                   $.post(baseUrl+"/admin/rate/defaultsubclass",{rateId:$rateId,currency:$currency
                            ,country:$country,typeOftax:$typeofTax,insuranceClass:$insuranceClass},function($data){
                        if($data){
                                //$htmlcontent = '<div id="defaultbutton"><input type="button" name="removedefaultrate" id="removedefaultrate" value="Remove default rate"/></div>';
                                var $tertairyArray = new Array();
                                $countryFlag = 1;
                                $subclassFlag = 0;
                                $buttonFlag  = 0;
                                $.each($data,function(index,value){
                                        $object =jQuery.parseJSON(value);
                                        var $htmlSubclass = '';                        
                                        if($countryFlag == 1){
                                            $htmlcontent+= '<div>Country '+$object.country+'</div>';
                                            $htmlcontent+= '<div>Insurance '+$object.insuranceclass+'</div>';
                                            $htmlcontent+= '<div>Type Of Tax '+$object.typeOfTax+'</div>';
                                            $htmlcontent+= '<div class="subclassContainer"><div class="Subclass"><h3>Subclass</h3></div><div class=""Tertiary"><h3>Tertiary</h3></div>';
                                            $countryFlag = 0;
                                        }
                                        $htmlcontent+= '<div>&nbsp;</div>';
                                        if($object.taxSubclass){              
                                            $subclassFlag = 1;
                                        }
                                        var $defaultValue = $("#defaultSubclasOrTertiary").attr("value");
                                        if($object.tertiary)
                                            $tertairyArray =  $object.tertiary.split(',');
                                        if($tertairyArray.length>0){
                                            for(var $i=0;$i<$tertairyArray.length;$i++){
                                                $dataArray  = $tertairyArray[$i].split("##"); 
                                                if($defaultValue==$dataArray[1]){
                                                    $("#defaultSubClassHidden").attr("value",$dataArray[1]);
                                                    $buttonFlag = 1;
                                                  
                                                    $htmlSubclass+= '<div>'+$dataArray[0]+'('+$dataArray[1]+')'+'<span class="subClass" id="sub'+$dataArray[1]+'">Default</span></div>';
                                                }
                                                else
                                                    $htmlSubclass+= '<div>'+$dataArray[0]+'('+$dataArray[1]+')'+'<span class="defaultSubClass" id="sub'+$dataArray[1]+'">MakeDefault</span></div>';
                                            }
                                        }

                                    $htmlcontent+= '<div class="SubclassChild"><div class="subclassName">'+$object.taxSubclass+'</div><div class="subclassLink">'+$htmlSubclass+'</div></div>';
                                    $htmlSubclass = '';

                                }); 
                                $htmlcontent+='</div>';
                                if($buttonFlag){
                                    $("#defaultbutton").html('<input type="button" name="removedefaultrate" id="removedefaultrate" value="Remove default rate"/>');
                                }
                                else{
                                    $("#defaultbutton").html('Please select the default rate from this group');
                                }
                                if($subclassFlag==0){    
                                     $("#defaultbutton").html('');
                                    $("#ratedefaultsubclass").html("<p>No active rates defined for this subclass!</p>");
                                }
                                else
                                    $("#ratedefaultsubclass").html($htmlcontent);
                        }
                        else{
                            $("#ratedefaultsubclass").html("Data Erorr!");
                        }
                         //Dialog box for Default subclass
                        $("#subclassDialog").dialog("open");	
                    },"json");
    		   	   
    	   }
    	   	
       });
       
       //Default subclass setting
       $(".defaultSubClass").die("click");
       $(".defaultSubClass").live("click",function(){
           var id = $(this).attr("id");
           //console.log(id);
           var $rateId = $(this).attr("id").substring(3);
           var $defaultSubclass = $("#defaultSubClassHidden").attr("value");
           $.post(baseUrl+"/admin/rate/savedefaultsubclass",{rateId:$rateId,subClass:$defaultSubclass},function($data){
               if($data.status=1){
                  $("#"+id).removeClass('defaultSubClass').addClass('subClass').html("Default");
                  $("#sub"+$defaultSubclass).removeClass('subClass').addClass('defaultSubClass').html("Make default");
                  $("#defaultSubClassHidden").attr("value",$rateId);
                  $("#defaultSubclasOrTertiary").attr("value",$rateId);
                  $("#subclassDialog").dialog("close");
               }
               else{//ToDo
                   console.log("Erorr");
               }
           },'json');
       });
       //Remove Default subclass
       $("#removedefaultrate").die("click");
       $("#removedefaultrate").live("click",function(){
           var $rateId = $(".subClass").attr('id').substring(3);;
           if($rateId){
               $.post(baseUrl+"/admin/rate/removedefaultsubclass",{rateId:$rateId},function($data){
                   if($data.status==true){
                       $("#defaultSubClassHidden").attr("value",'');
                       $("#defaultSubclasOrTertiary").attr("value",'');
                       $("#subclassDialog").dialog("close");
                   }
               },"json");
           }else{
               console.log("Erorr in removeDefaultSubclass");
           }
           
       });
     
       //Add New rateline
       $("#addNewRateLine").die("click");
       $("#addNewRateLine").live("click",function(){
           clearRatelineForm();
    	   $rateId = $("#masterRateId").attr("value");
    	   $countryId = $("#newRatecountry").attr("value");
    	   $currency = $("#currency").attr("value");
    	   $region = $("#newRateRegion").attr("value");
    	   $("#MasterRateId").attr("value",$rateId);
		   $("#CountryId").attr("value",$countryId);
		   $("#RegionId").attr("value",$region);
		   $("#Currency").attr("value",$currency);
		   if($rateId){
			   displayRateLineForm('1');
		   }
		   else{
			   displayRateLineForm('0');
		   }
//    	   if($("#masterRateId").attr("value")== 'new'){
//    		   displayRateLineForm('0');
//    	   }
//    	   else{
//    		   displayRateLineForm('1');
//    	   }
    	   $("#rateLineDialog").dialog("open");
       });
       
      $(".autherise").die("click");
        $(".autherise").live("click",function(event){
            event.preventDefault();
            var BuslineId = $(this).attr('id');
            
            $.post(baseUrl+"/admin/Buslines/changestatus",{buslineId:BuslineId},function($data){
                  if($data==0)
                      {
             
                         $(".autherise[id='"+BuslineId+"']").html("<a class='status'>Disable</a>");
                        
                      }
                  else
                      {
                         
                         $(".autherise[id='"+BuslineId+"']").html("<a class='status'>Enable</a>");
                        
                      }
              },"json");
        
            
       });
       
       $("#insuranceclassselect").change(function(){
            var InsuranceId=$(this).val();
            var $htmlContent = "";
            $.post(baseUrl+"/admin/Buslines/sortbyinsurance",{insuranceId:InsuranceId},function($data){
               $htmlContent="<table width='100%' cellpadding='0' cellspacing='0' class='table'>";
               $htmlContent+="<tr><th>Line of Business</th><th>Insurance Class</th><th>Status</th></tr>";
               $.each($data,function(index,value)
               {
                  var obj = jQuery.parseJSON(value);
                
                  $htmlContent+="<tr>";
                  $htmlContent+="<td class='editrow' id="+obj.id+"><a href=''>"+obj.LineName+"</a></td>";
                  $htmlContent+="<td class='editrow' id="+obj.id+">"+obj.insuranceClass+"</td>";
                  $htmlContent+="<td class='autherise' id="+obj.id+">";
                  if(obj.enabled==1)
                     $htmlContent+="<a href=''>Enable</a>";
                  else
                     $htmlContent+="<a href=''>Disable</a></td></tr>";
                 
               });
               $htmlContent+="</table>";
               $("#buslines").html($htmlContent);
            },"json");
       });
       
       //Basic calculation change
       $("#basisofCalculation").change(function(){
    	  var $calculationId =  $("#basisofCalculation").attr("value");
    	  if($calculationId){
    		  displayRateLineForm($calculationId);
    	  }
    	  else{//ToDo
    		  console.log("Erorr");
    	  }
       });
       
       //rateline edit
       $(".editrateline").die("click");
       $(".editrateline").live("click",function(){
           $ratelineId = $(this).attr("rel");
           $rateId = $("#masterRateId").attr("value");
           $.post(baseUrl+"/admin/Rateline/findrateline",{ratelineId:$ratelineId,rateId:$rateId},function($data){
               if($data){
                   displayRateLineForm($data.basisofCalculation);
                   $("#rateLineId").attr("value",$data.ratelineId);
                   $("#MasterRateId").attr("value",$data.rateId);
                   $("#startDate").attr("value",$data.rateStartDate);
                   $("#endDate").attr("value",$data.rateEndDate);
                   $("#CountryId").attr("value",$data.country);
                   $("#RegionId").attr("value",$data.region);
                   $("#basisofCalculation").attr("value",$data.basisofCalculation);
                   $("#Currency").attr("value",$data.currency);
                   if($data.amountPerX!=0)
                    $("#d__AmountPerX").attr("value",$data.amountPerX);
                   if($data.amountPerXvalue!=0)
                    $("#d__AmountPerXValue").attr("value",$data.amountPerXvalue);
                   if($data.admittedRate!=0)
                    $("#admittedRate").attr("value",$data.admittedRate);
                   if($data.nonAdmittedRate!=0)
                    $("#notAdmittedRate").attr("value",$data.nonAdmittedRate);
                   if($data.taxMinimum!=0)
                    $("#minimumValueApplies").attr("value",$data.taxMinimum);
                   if($data.taxMaximum!=0)
                    $("#maximumValueApplies").attr("value",$data.taxMaximum);
                   if($data.residanceApplicable==1)
                    $("#insuranceResidenceApplicable").attr("checked","checked");
                   if($data.deminimisApplicable==1){
                       $("#deminimisApplicable").attr("checked","checked");
                      // $("#deminimisApplicable").trigger("click");
                      $("#d__DeMinimis_TotalPremiumThreshold-label").parent().show();
                      $("#d__DeMinimis_PremiumAllocationThreshold-label").parent().show();
                   }
                   if($data.multiinsurerGroup==1)
                    $("#calculateInsurLineasGroup").attr("checked","checked");
                   if($data.deminimisTotalThreshold!=0)
                    $("#d__DeMinimis_TotalPremiumThreshold").attr("value",$data.deminimisTotalThreshold);
                   if($data.deminimisAllocationThreshold!=0)
                    $("#d__DeMinimis_PremiumAllocationThreshold").attr("value",$data.deminimisAllocationThreshold);
                   if($data.additionalRateId!=0)
                    $("#additionalRateId").attr("value",$data.additionalRateId);
                   if($data.band2Admitted!=0)
                    $("#band2Admitted").attr("value",$data.band2Admitted);
                   if($data.band3Admitted!=0)
                    $("#band3Admitted").attr("value",$data.band3Admitted);
                   if($data.band2Nonadmitted!=0)
                    $("#band2notAdmitted").attr("value",$data.band2Nonadmitted);
                   if($data.band3Nonadmitted!=0)
                    $("#band3notAdmitted").attr("value",$data.band3Nonadmitted);
                   if($data.proportionality==1)
                    $("#applybandproportionality").attr("checked","checked");
                   $("#Multiplier1name").attr("value",$data.multiplier1Name);
                   if($data.multiplier1AdmittedRate!=0)
                    $("#Multiplier1admitted").attr("value",$data.multiplier1AdmittedRate);
                   if($data.multiplier1NonAdmittedRate!=0)
                   $("#Multiplier1notadmitted").attr("value",$data.multiplier1NonAdmittedRate);
                  
                   $("#Multiplier2name").attr("value",$data.multiplier2Name);
                   if($data.multiplier2AdmittedRate!=0)
                    $("#Multiplier2admitted").attr("value",$data.multiplier2AdmittedRate);
                   if($data.multiplier2NonAdmittedRate!=0)
                    $("#Multiplier2notadmitted").attr("value",$data.multiplier2NonAdmittedRate);
                   
                   $("#Multiplier3name").attr("value",$data.multiplier3Name);
                   if($data.multiplier3AdmittedRate!=0)
                    $("#Multiplier3admitted").attr("value",$data.multiplier3AdmittedRate);
                   if($data.multiplier3NonAdmittedRate!=0)
                    $("#Multiplier3notadmitted").attr("value",$data.multiplier3NonAdmittedRate);
                   if($data.domestictransportationElement!=0)
                    $("#d__DomesticTransportationElement").attr("value",$data.domestictransportationElement);
                   if($data.nonFireElementARate!=0)
                    $("#d__NonFireElementRate").attr("value",$data.nonFireElementARate);
                   
                   $("#layeringPercentage").attr("value",$data.layeringPercentage);
                   if($data.maltaPremiumLevel1!=0)
                    $("#d__MaltaStampDuty_Premium_Level1").attr("value",$data.maltaPremiumLevel1);
                   if($data.maltaLevel1StampDuty!=0)
                    $("#d__MaltaStampDuty_Premium_Level1_Rate").attr("value",$data.maltaLevel1StampDuty);
                   if($data.maltaPremiumLevel2!=0)
                    $("#d__MaltaStampDuty_Premium_Level2").attr("value",$data.maltaPremiumLevel2);
                   if($data.maltaLevel2StampDuty!=0)
                    $("#d__MaltaStampDuty_Premium_Level2_Rate").attr("value",$data.maltaLevel2StampDuty);
                   if($data.maltaPremiumLevel3!=0)
                    $("#d__MaltaStampDuty_Premium_Level3").attr("value",$data.maltaPremiumLevel3);
                   if($data.maltaLevel3StampDuty!=0)
                    $("#d__MaltaStampDuty_Premium_Level3_Rate").attr("value",$data.maltaLevel3StampDuty);
                   if($data.minimumBand1!=0)
                    $("#between1").attr("value",$data.minimumBand1);
                   if($data.maximumBand1!=0)
                    $("#rateabove1").attr("value",$data.maximumBand1);
                   if($data.minimumBand2!=0)
                    $("#between2").attr("value",$data.minimumBand2);
                   if($data.maximumBand2!=0)
                    $("#rateabove2").attr("value",$data.maximumBand2);
                   if($data.minimumBand3!=0)
                    $("#between3").attr("value",$data.minimumBand3);
                   if($data.maximumBand3!=0)
                    $("#rateabove3").attr("value",$data.maximumBand3);
                   if($data.admittedPayAdminsteredInsurer=='yes')
                    $("#admitted-1").attr("checked","checked");
                   if($data.admittedPayInsurerOrAgent=='yes')
                    $("#admitted-2").attr("checked","checked");
                   if($data.admittedPayInsurer=='yes')
                    $("#admitted-3").attr("checked","checked");
                   if($data.admittedPayInsurerLocally=='yes')
                    $("#admitted-4").attr("checked","checked");
                   if($data.nonAdmittedPayAdminsteredInsurer=='yes')
                    $("#notAdmitted-1").attr("checked","checked");
                   if($data.nonAdmittedPayInsurerOrAgent=='yes')
                    $("#notAdmitted-2").attr("checked","checked");
                   if($data.nonAdmittedPayInsurer=='yes')
                    $("#notAdmitted-3").attr("checked","checked");
                   if($data.nonAdmittedPayInsurerLocally=='yes')
                    $("#notAdmitted-4").attr("checked","checked");
                   
               }else{//ToDo
                   console.log("Erorr! No data");
               }
               $("#rateLineDialog").dialog("open");
           },'json');          
       });
       //Delete Rate line
       $(".deleterateline").die("click");
       $(".deleterateline").live("click",function(){
           $ratelineId = $(this).attr("id");
           $rateId = $("#masterRateId").attr("value");
           if($ratelineId){
               if(confirm("Do you wnat to delete Rateline?")){
                   $.post(baseUrl+"/admin/rateline/deleterateline",{ratelineId:$ratelineId,rateid:$rateId},function($data){
                       if($data){//ToDo
                           console.log($data.message);
                          // $(".editrateline").trigger("click");
                       }
                       else{//ToDo
                           console.log("Erorr");
                       }
                   });
               }
           }
           else{//ToDo
               console.log("Erorr");
           }
                     
       });
       
       //duplicate rate$
       $("#duplicateRate").click(function(){
           $rateId  = $("#masterRateId").attr("value");
           $.post(baseUrl+"/admin/rate/duplicateRate",{rateId:$rateId},function($data){
              setRateAndRateLineList($data);
           },"json");
       });
}

function displayRateLineForm($calaculationId){
	$("#basisofCalculation").attr("value",$calaculationId);
        clearRatelineForm(from=1);
        $("#admitted-1").parent().find('h5').html(" "); 
        $("#notAdmitted-1").parent().find('h5').html(" ");
        $("#Multiplier1name-label").find('h5').html(" ");
        $("#between1-label").find('h5').html(" ");
        $("#admitted-1").parent().prepend("<h5>Admitted</h3>");
        $("#notAdmitted-1").parent().prepend("<h5>Not Admitted</h3>");
        $("#Multiplier1name-label").prepend("<h5>Multipliers</h3>");
        $("#between1-label").prepend("<h5>Sum Assured / Premium Banding (driven by Basis of Calculation)</h3>");
	switch($calaculationId){
	case '0':
		
		//field to hide
		$("#d__AmountPerX-label").parent().hide();
		$("#d__AmountPerXValue-label").parent().hide();
		maltaStampDutyHide();
		$("#d__NonFireElementRate-label").parent().hide();
		$("#d__DomesticTransportationElement-label").parent().hide();
		$("#layering-label").parent().hide();
		$("#editLayerButton").parent().hide();
		$("#layeringPercentage-label").parent().hide();
		$("#editLayerPercentageButton").parent().hide();
		multiplierHide();
		betweenHide();
		$("#applybandproportionality-label").parent().hide();
		bandHide();
		break;
	case '1':
		//field to show
		multiplierShow();
		betweenShow();
		$("#deminimisApplicable-label").parent().show();
		bandShow();
		$("#applybandproportionality-label").parent().show();
		//field to hide
		$("#d__AmountPerX-label").parent().hide();
		$("#d__AmountPerXValue-label").parent().hide();
		maltaStampDutyHide();
		$("#d__DeMinimis_TotalPremiumThreshold-label").parent().hide();
                $("#d__DeMinimis_PremiumAllocationThreshold-label").parent().hide();
		$("#d__NonFireElementRate-label").parent().hide();
		$("#d__DomesticTransportationElement-label").parent().hide();
		$("#layering-label").parent().hide();
		$("#editLayerButton").parent().hide();
		$("#layeringPercentage-label").parent().hide();
		$("#editLayerPercentageButton").parent().hide();
		break;
	
	case '24':
	case '8':
		//Show fields
		$("#d__NonFireElementRate-label").parent().show();
		$("#minimumValueApplies-label").parent().show();
		$("#maximumValueApplies-label").parent().show();
		$("#admittedRate-label").parent().show();
		$("#notAdmittedRate-label").parent().show();
		$("#additionalRateId-label").parent().show();
		$("#insuranceResidenceApplicable-label").parent().show();
		$("#calculateInsurLineasGroup-label").parent().show();
		$("#admitted-1").parent().show();
		$("#notAdmitted-1").parent().show();
		multiplierShow();
		//Hidden fields
		$("#d__AmountPerX-label").parent().hide();
		$("#d__AmountPerXValue-label").parent().hide();
		maltaStampDutyHide();
		$("#d__DomesticTransportationElement-label").parent().hide();
                $("#d__DeMinimis_TotalPremiumThreshold-label").parent().hide();
                $("#d__DeMinimis_PremiumAllocationThreshold-label").parent().hide();
		$("#deminimisApplicable-label").parent().hide();
		$("#layering-label").parent().hide();
		$("#editLayerButton").parent().hide();
		$("#layeringPercentage-label").parent().hide();
		$("#editLayerPercentageButton").parent().hide();
		betweenHide();
		$("#applybandproportionality-label").parent().hide();
		bandHide();
		break;
		
	case '2':
	case '3':
	case '4':
	case '5':
	case '9':
	case '17':
	case '21':

        case '25':   

        case '26':
		//field to show
		multiplierShow();
		betweenShow();
		bandShow();
		$("#applybandproportionality-label").parent().show();
		//field to hide
		$("#d__AmountPerX-label").parent().hide();
		$("#d__AmountPerXValue-label").parent().hide();
		maltaStampDutyHide();
		$("#d__NonFireElementRate-label").parent().hide();
		$("#d__DomesticTransportationElement-label").parent().hide();
                $("#d__DeMinimis_TotalPremiumThreshold-label").parent().hide();
                $("#d__DeMinimis_PremiumAllocationThreshold-label").parent().hide();
		$("#deminimisApplicable-label").parent().hide();
		$("#layering-label").parent().hide();
		$("#editLayerButton").parent().hide();
		$("#layeringPercentage-label").parent().hide();
		$("#editLayerPercentageButton").parent().hide();
		
		break;
		
	case '6':
	case '7':
		//field to show
		multiplierShow();
		betweenShow();
		bandShow();
		$("#layering-label").parent().show();
		$("#editLayerButton").parent().show();
		$("#layeringPercentage-label").parent().show();
		$("#editLayerPercentageButton").parent().show();
		$("#applybandproportionality-label").parent().show();
		//field to hide
		$("#d__AmountPerX-label").parent().hide();
		$("#d__AmountPerXValue-label").parent().hide();
		maltaStampDutyHide();
                $("#d__DeMinimis_TotalPremiumThreshold-label").parent().hide();
                $("#d__DeMinimis_PremiumAllocationThreshold-label").parent().hide();
		$("#d__NonFireElementRate-label").parent().hide();
		$("#d__DomesticTransportationElement-label").parent().hide();
		$("#deminimisApplicable-label").parent().hide();
		break;
	case '10':
	case '15':
		//Show fields
		$("#d__AmountPerX-label").parent().show();
                $("#d__AmountPerX-label").children().html('');
                $("#d__AmountPerXValue-label").children().html('Per');
		$("#d__AmountPerXValue-label").parent().show();
		$("#minimumValueApplies-label").parent().show();
		$("#maximumValueApplies-label").parent().show();
		$("#admittedRate-label").parent().show();
		$("#notAdmittedRate-label").parent().show();
		$("#additionalRateId-label").parent().show();
		$("#insuranceResidenceApplicable-label").parent().show();
		$("#calculateInsurLineasGroup-label").parent().show();
		$("#admitted-1").parent().show();
		$("#notAdmitted-1").parent().show();
		multiplierShow();
		//Hidden fields
		maltaStampDutyHide();
		$("#d__NonFireElementRate-label").parent().hide();
		$("#d__DomesticTransportationElement-label").parent().hide();
                $("#d__DeMinimis_TotalPremiumThreshold-label").parent().hide();
                $("#d__DeMinimis_PremiumAllocationThreshold-label").parent().hide();
		$("#deminimisApplicable-label").parent().hide();
		$("#layering-label").parent().hide();
		$("#editLayerButton").parent().hide();
		$("#layeringPercentage-label").parent().hide();
		$("#editLayerPercentageButton").parent().hide();
		betweenHide();
		$("#applybandproportionality-label").parent().hide();
		bandHide();
		break;
		
	case '11':
		//field to show
		$("#d__AmountPerX-label").parent().show();
		$("#d__AmountPerXValue-label").parent().show();
                $("#d__AmountPerX-label").children().html('The lesser of DKK');
                $("#d__AmountPerXValue-label").children().html('per $DKK');
                $("#d__AmountPerXValue").parent().append('of the sum assured or 0% of the premium.');
		$("#admittedRate-label").parent().show();
		$("#notAdmittedRate-label").parent().show();
		$("#additionalRateId-label").parent().show();
		$("#insuranceResidenceApplicable-label").parent().show();
		$("#calculateInsurLineasGroup-label").parent().show();
		$("#admitted-1").parent().show();
		$("#notAdmitted-1").parent().show();
		multiplierShow();
		//hidden fields
		$("#minimumValueApplies-label").parent().hide();
		$("#maximumValueApplies-label").parent().hide();
		maltaStampDutyHide();
		$("#d__NonFireElementRate-label").parent().hide();
		$("#d__DomesticTransportationElement-label").parent().hide();
                $("#d__DomesticTransportationElement-label").parent().hide();
                $("#d__DeMinimis_TotalPremiumThreshold-label").parent().hide();
                $("#d__DeMinimis_PremiumAllocationThreshold-label").parent().hide();
		$("#deminimisApplicable-label").parent().hide();
		$("#layering-label").parent().hide();
		$("#editLayerButton").parent().hide();
		$("#layeringPercentage-label").parent().hide();
		$("#editLayerPercentageButton").parent().hide();
		betweenHide();
		$("#applybandproportionality-label").parent().hide();
		bandHide();
		break;
		
	case '12':
		//Show field
		multiplierShow();
		maltaStampDutyShow();
		//hidden fields
		$("#d__AmountPerX-label").parent().hide();
		$("#d__AmountPerXValue-label").parent().hide();
		$("#d__NonFireElementRate-label").parent().hide();
                $("#d__DomesticTransportationElement-label").parent().hide();
                $("#d__DeMinimis_TotalPremiumThreshold-label").parent().hide();
                $("#d__DeMinimis_PremiumAllocationThreshold-label").parent().hide();
		$("#deminimisApplicable-label").parent().hide();
		$("#layering-label").parent().hide();
		$("#editLayerButton").parent().hide();
		$("#layeringPercentage-label").parent().hide();
		$("#editLayerPercentageButton").parent().hide();
		betweenHide();
		$("#applybandproportionality-label").parent().hide();
		bandHide();
		break;
		
	case '22':
	case '13':
		//field to show
		$("#layeringPercentage-label").parent().show();
		$("#editLayerPercentageButton").parent().show();

		//field to hide
		$("#d__AmountPerX-label").parent().hide();
		$("#d__AmountPerXValue-label").parent().hide();
		maltaStampDutyHide();
		$("#d__NonFireElementRate-label").parent().hide();
		$("#d__DomesticTransportationElement-label").parent().hide();
                $("#d__DeMinimis_TotalPremiumThreshold-label").parent().hide();
                $("#d__DeMinimis_PremiumAllocationThreshold-label").parent().hide();
		$("#deminimisApplicable-label").parent().hide();
		$("#layering-label").parent().hide();
		$("#editLayerButton").parent().hide();
		betweenHide();
		$("#applybandproportionality-label").parent().hide();
		bandHide();
		multiplierHide();
		break;
		
	case '14':
	case '16':	
	case '18':
		//field to show
		
		//field to hide
		$("#d__AmountPerX-label").parent().hide();
		$("#d__AmountPerXValue-label").parent().hide();
		maltaStampDutyHide();
		$("#d__NonFireElementRate-label").parent().hide();
		$("#d__DomesticTransportationElement-label").parent().hide();
                $("#d__DeMinimis_TotalPremiumThreshold-label").parent().hide();
                $("#d__DeMinimis_PremiumAllocationThreshold-label").parent().hide();
		$("#deminimisApplicable-label").parent().hide();
		$("#layering-label").parent().hide();
		$("#editLayerButton").parent().hide();
		$("#layeringPercentage-label").parent().hide();
		$("#editLayerPercentageButton").parent().hide();
		betweenHide();
		$("#applybandproportionality-label").parent().hide();
		bandHide();
		multiplierHide();
		break;
		
	case '19':
		//field to show
		multiplierShow();
		//field to hide
		$("#d__AmountPerX-label").parent().hide();
		$("#d__AmountPerXValue-label").parent().hide();
		maltaStampDutyHide();
		$("#d__NonFireElementRate-label").parent().hide();
		$("#d__DomesticTransportationElement-label").parent().hide();
		$("#deminimisApplicable-label").parent().hide();
                $("#d__DeMinimis_TotalPremiumThreshold-label").parent().hide();
                $("#d__DeMinimis_PremiumAllocationThreshold-label").parent().hide();
		$("#layering-label").parent().hide();
		$("#editLayerButton").parent().hide();
		$("#layeringPercentage-label").parent().hide();
		$("#editLayerPercentageButton").parent().hide();
		betweenHide();
		$("#applybandproportionality-label").parent().hide();
		bandHide();
		break;
                
        case '20':
                //field to show
                multiplierShow();
                $("#admittedRate-label").parent().show();
		$("#notAdmittedRate-label").parent().show();
		$("#additionalRateId-label").parent().show();
		$("#insuranceResidenceApplicable-label").parent().show();
		$("#calculateInsurLineasGroup-label").parent().show();
		$("#admitted-1").parent().show();
		$("#notAdmitted-1").parent().show();
		//field to hide
		$("#d__AmountPerX-label").parent().hide();
		$("#d__AmountPerXValue-label").parent().hide();
		maltaStampDutyHide();
                betweenHide();
                bandHide();
                $("#deminimisApplicable-label").parent().hide();
		$("#d__DeMinimis_TotalPremiumThreshold-label").parent().hide();
                $("#d__DeMinimis_PremiumAllocationThreshold-label").parent().hide();
		$("#d__NonFireElementRate-label").parent().hide();
		$("#d__DomesticTransportationElement-label").parent().hide();
		$("#layering-label").parent().hide();
		$("#editLayerButton").parent().hide();
                $("#applybandproportionality-label").parent().hide();
		$("#layeringPercentage-label").parent().hide();
		$("#editLayerPercentageButton").parent().hide();
            break;
            
	case '23':
		//field to show
		$("#d__DomesticTransportationElement-label").parent().show();
		//field to hide 
		$("#d__AmountPerX-label").parent().hide();
		$("#d__AmountPerXValue-label").parent().hide();
		maltaStampDutyHide();
		$("#d__NonFireElementRate-label").parent().hide();
		$("#deminimisApplicable-label").parent().hide();
                $("#d__DeMinimis_TotalPremiumThreshold-label").parent().hide();
                $("#d__DeMinimis_PremiumAllocationThreshold-label").parent().hide();
		$("#layering-label").parent().hide();
		$("#editLayerButton").parent().hide();
		$("#layeringPercentage-label").parent().hide();
		$("#editLayerPercentageButton").parent().hide();
		betweenHide();
		$("#applybandproportionality-label").parent().hide();
		bandHide();
		multiplierHide();
		break;
	}
	
}

function multiplierShow(){
	$("#Multiplier1name-label").parent().show();
	$("#Multiplier1admitted-label").parent().show();
	$("#Multiplier1notadmitted-label").parent().show();
	$("#Multiplier2name-label").parent().show();
	$("#Multiplier2admitted-label").parent().show();
	$("#Multiplier2notadmitted-label").parent().show();
	$("#Multiplier3name-label").parent().show();
	$("#Multiplier3admitted-label").parent().show();
	$("#Multiplier3notadmitted-label").parent().show();
}

function multiplierHide(){
	$("#Multiplier1name-label").parent().hide();
	$("#Multiplier1admitted-label").parent().hide();
	$("#Multiplier1notadmitted-label").parent().hide();
	$("#Multiplier2name-label").parent().hide();
	$("#Multiplier2admitted-label").parent().hide();
	$("#Multiplier2notadmitted-label").parent().hide();
	$("#Multiplier3name-label").parent().hide();
	$("#Multiplier3admitted-label").parent().hide();
	$("#Multiplier3notadmitted-label").parent().hide();
}

function maltaStampDutyShow(){
	$("#d__MaltaStampDuty_Premium_Level1-label").parent().show();
	$("#d__MaltaStampDuty_Premium_Level2-label").parent().show();
	$("#d__MaltaStampDuty_Premium_Level3-label").parent().show();
	$("#d__MaltaStampDuty_Premium_Level2_Rate-label").parent().show();
	$("#d__MaltaStampDuty_Premium_Level3_Rate-label").parent().show();
	$("#d__MaltaStampDuty_Premium_Level1_Rate-label").parent().show();
}

function maltaStampDutyHide(){
	$("#d__MaltaStampDuty_Premium_Level1-label").parent().hide();
	$("#d__MaltaStampDuty_Premium_Level2-label").parent().hide();
	$("#d__MaltaStampDuty_Premium_Level3-label").parent().hide();
	$("#d__MaltaStampDuty_Premium_Level2_Rate-label").parent().hide();
	$("#d__MaltaStampDuty_Premium_Level3_Rate-label").parent().hide();
	$("#d__MaltaStampDuty_Premium_Level1_Rate-label").parent().hide();
}

function betweenShow(){
	$("#between1-label").parent().show();
	$("#rateabove1-label").parent().show();
	$("#between2-label").parent().show();
	$("#rateabove2-label").parent().show();
	$("#between3-label").parent().show();
	$("#rateabove3-label").parent().show();
}

function betweenHide(){
	$("#between1-label").parent().hide();
	$("#rateabove1-label").parent().hide();
	$("#between2-label").parent().hide();
	$("#rateabove2-label").parent().hide();
	$("#between3-label").parent().hide();
	$("#rateabove3-label").parent().hide();
}

function bandShow(){
	$("#band2Admitted-label").parent().show();
	$("#band2notAdmitted-label").parent().show();
	$("#band3Admitted-label").parent().show();
	$("#band3notAdmitted-label").parent().show();
}

function bandHide(){
	$("#band2Admitted-label").parent().hide();
	$("#band2notAdmitted-label").parent().hide();
	$("#band3Admitted-label").parent().hide();
	$("#band3notAdmitted-label").parent().hide();
}

 function clearRateForm(){
        $("#masterRateId").attr("value","new");
        $("#taxType").attr("value","");
        $("#newRateRegion").attr('selectedIndex', '-1').children("option:selected").removeAttr("selected");
        $("#newRatecountry").attr('selectedIndex', '-1').children("option:selected").removeAttr("selected");
        $("#currency").attr('selectedIndex', '-1').children("option:selected").removeAttr("selected");
        $("#newRateinsuranceclass").attr('selectedIndex', '-1').children("option:selected").removeAttr("selected");
        $("#taxSubClass").attr("value","");
        $("#tertiary").attr("value","");
        $("#defaultSubclasOrTertiary").attr("value","");
        $("#noAutoCreate").removeAttr("checked");
        $("#enabled").removeAttr("checked");

 }
function clearRatelineForm($from){
        $("#rateLineId").attr("value","new");
        if(!$from){
            $("#startDate").attr("value","");
            $("#endDate").attr("value","");
        }        
        $("#basisofCalculation").attr("value",'');
        $("#d__AmountPerXValue").attr("value",'');
        $("#d__AmountPerX").attr("value",'');
        $("#admittedRate").attr("value",'');
        $("#notAdmittedRate").attr("value",'');
        $("#minimumValueApplies").attr("value",'');
        $("#maximumValueApplies").attr("value",'');
        $("#insuranceResidenceApplicable").removeAttr("checked");
        $("#calculateInsurLineasGroup").removeAttr("checked");
        $("#deminimisApplicable").removeAttr("checked");
        $("#d__DeMinimis_TotalPremiumThreshold").attr("value",'');
        $("#d__DeMinimis_PremiumAllocationThreshold").attr("value",'');
        $("#additionalRateId").attr("value",'');
        $("#band2Admitted").attr("value",'');
        $("#band3Admitted").attr("value",'');
        $("#band2notAdmitted").attr("value",'');
        $("#band3notAdmitted").attr("value",'');
        $("#applybandproportionality").removeAttr("checked");
        $("#Multiplier1name").attr("value",'');
        $("#Multiplier1admitted").attr("value",'');
        $("#Multiplier1notadmitted").attr("value",'');
        $("#Multiplier2name").attr("value",'');
        $("#Multiplier2admitted").attr("value",'');
        $("#Multiplier2notadmitted").attr("value",'');
        $("#Multiplier3name").attr("value",'');
        $("#Multiplier3admitted").attr("value",'');
        $("#Multiplier3notadmitted").attr("value",'');
        $("#d__DomesticTransportationElement").attr("value",'');
        $("#d__NonFireElementRate").attr("value",'');
        $("#layeringPercentage").attr("value",'');
        $("#d__MaltaStampDuty_Premium_Level1").attr("value",'');
        $("#d__MaltaStampDuty_Premium_Level1_Rate").attr("value",'');
        $("#d__MaltaStampDuty_Premium_Level2").attr("value",'');
        $("#d__MaltaStampDuty_Premium_Level2_Rate").attr("value",'');
        $("#d__MaltaStampDuty_Premium_Level3").attr("value",'');
        $("#d__MaltaStampDuty_Premium_Level3_Rate").attr("value",'');
        $("#between1").attr("value",'');
        $("#rateabove1").attr("value",'');
        $("#between2").attr("value",'');
        $("#rateabove2").attr("value",'');
        $("#between3").attr("value",'');
        $("#rateabove3").attr("value",'');
        $("#admitted-1").removeAttr("checked");
        $("#admitted-2").removeAttr("checked");
        $("#admitted-3").removeAttr("checked");
        $("#admitted-4").removeAttr("checked");
        $("#notAdmitted-1").removeAttr("checked");
        $("#notAdmitted-2").removeAttr("checked");
        $("#notAdmitted-3").removeAttr("checked");
        $("#notAdmitted-4").removeAttr("checked");
}

function clearRateForm(){
        $("#masterRateId").attr("value","new");
        $("#taxType").attr("value","");
        $("#newRateRegion").attr('selectedIndex', '-1').children("option:selected").removeAttr("selected");
        $("#newRatecountry").attr('selectedIndex', '-1').children("option:selected").removeAttr("selected");
        $("#currency").attr('selectedIndex', '-1').children("option:selected").removeAttr("selected");
        $("#newRateinsuranceclass").attr('selectedIndex', '-1').children("option:selected").removeAttr("selected");
        $("#taxSubClass").attr("value","");
        $("#tertiary").attr("value","");
        $("#defaultSubclasOrTertiary").attr("value","");
        $("#noAutoCreate").removeAttr("checked");
        $("#enabled").removeAttr("checked");
 }
 
 function setRateAndRateLineList($data){
     if($data.rate){                           
        $("#masterRateId").attr("value",$data.rate.id);
        $("#taxType").attr("value",$data.rate.taxType);
        $("#newRateRegion").attr("value",$data.rate.region);
        if($data.rate.country){
            $.post(baseUrl+"/admin/Rate/getcountrylist",{regionid:$data.rate.region},function($countrydata){
                $("#newRatecountry").children().remove();
                $("#newRatecountry").append('<option value=""></option>');
                $.each($countrydata, function(index, value){
                    $("#newRatecountry").append('<option value="'+value.ID_Country+'">'+value.d__CountryName+'</option>');
                });
                $("#newRatecountry").attr("value",$data.rate.country);
            },"json");
            }
        $("#currency").attr("value",$data.rate.currency);
        $("#newRateinsuranceclass").attr("value",$data.rate.insuranceClass);
        $("#taxSubClass").attr("value",$data.rate.taxSubClass);
        $("#tertiary").attr("value",$data.rate.tertiry);
        $("#defaultSubclasOrTertiary").attr("value",$data.rate.defaultSubClass);
        if($data.rate.autoCreate==1) 
            $("#noAutoCreate").attr("checked","checked");
        else
            $("#noAutoCreate").attr("checked","unchecked");
        if($data.rateline.length){
            $("#rateLineTable").children().remove();
            $htmlcontent+='<tr><th width="10%">Start</th>';
	    $htmlcontent+='<th width="10%">End</th>';
	    $htmlcontent+='<th width="30%">Basis of Calculation</th>';
	    $htmlcontent+='<th width="20%">Admitted Rate</th>';
	    $htmlcontent+='<th width="20%">Non Admitted Rate</th>';
	    $htmlcontent+='<th width="5%"></th>';
	    $htmlcontent+='<th width="5%"></th></tr>';
            $.each($data.rateline,function(index, value){                                     
                $htmlcontent+= '<tr><td width="10%">'+value.rateStaratDate+'</td>';
                $htmlcontent+= '<td width="10%">'+value.rateendDate+'</td>';
                $htmlcontent+= '<td width="30%" align="center">'+value.basisofCalculationName+'</td>';
                $htmlcontent+= '<td width="20%" align="center">'+value.admittedRate+'</td>';
                $htmlcontent+= '<td width="20%" align="center">'+value.nonAdmittedRate+'</td>';
                $htmlcontent+= '<td width="5%"><a href="#" rel="'+value.id+'" class="editrateline">edit</a></td>';
                $htmlcontent+= '<td width="5%"><span class="delete deleterateline" id="'+value.id+'"></span></td></tr>';
                $("#rateLineTable").append($htmlcontent);
                $htmlcontent = '';
            });

        }
      }else{//ToDo
           console.log("No data!");
      }

 }