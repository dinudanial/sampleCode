<?php
class admin_Form_CreateQuote extends Zend_Form
{

    public function init()
    {
    	$baseUrl = Zend_Controller_Front::getInstance()->getBaseUrl();
        $this->setAction($baseUrl.'/admin/quotes/save');
        $this->setMethod('post');
        $this->setAttrib('id','createquote');
        $this->setAttrib('class','form');
        
        $quotename = new Zend_Form_Element_Text('d__Description');
        $quotename->setLabel('Quote Name')
             ->setAttrib("class", "required");
        
        $policynumber = new Zend_Form_Element_Text('d__PolicyNumber');
        $policynumber->setLabel('Policy Number / UMR')
             ->setAttrib("class", "required");
        
        $creationdate = new Zend_Form_Element_Text('d__Date');
        $creationdate->setLabel('Creation Date')
             ->setAttrib("class", "required");
        
        $effectivedate = new Zend_Form_Element_Text('d__EffectiveDate');
        $effectivedate->setLabel('Effective Date')
             ->setAttrib("class", "required");
        
        $insurers = new Zend_Form_Element_Select('insurers');
        $insurers->setLabel('Insurers')
             ->setAttrib("class", "required");
        $insur = admin_Model_UserUtil::getInsurers();
        $insurers->setMultiOptions($insur);
        
        $region = new admin_Model_Region();
        $countryResult =  $region->getAllRegions();
        $countries = array();
        foreach ($countryResult as $region) {
            foreach ($region->getCountries() as $country) {
               $countries[$country->getId()] =  $country->getCountry();
            }
        }
        $policyholderlocation = new Zend_Form_Element_Select('ID_Country_Residence');
        $policyholderlocation->setLabel('Policyholder\'s Location')
             ->setAttrib("class", "required");
        $policyholderlocation->setMultiOptions($countries);
        
        $lineofbusiness = new Zend_Form_Element_Select('lineofbusiness');
        $lineofbusiness->setLabel('Line of Business')
             ->setAttrib("class", "required");
        $business = admin_Model_UserUtil::getLineOfBusinesses();
        $lineofbusiness->setMultiOptions($business);
        
        $currency = new Zend_Form_Element_Select('ID_Currency');
        $currency->setLabel('Currency')
             ->setAttrib("class", "required");
        $result = admin_Model_Util::getCurrency();
        $currency->setMultiOptions($result);
        
        $risklocation = new Zend_Form_Element_MultiCheckbox('riskloaction');
        $risklocation->setLabel('Risk Locations');
        $risklocation->setMultiOptions($countries);
 
        $savebutton = new Zend_Form_Element_Submit('savenewquote');
        $savebutton->setLabel('Save as a new quote');
        
        $this->addElements(array(
           $quotename, 
           $policynumber, 
           $creationdate,
           $effectivedate,
           $insurers,
           $policyholderlocation,
           $lineofbusiness,
           $currency,
           $risklocation,
           $savebutton));
    }
			      
}
?>