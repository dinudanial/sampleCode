<?php

class admin_Model_Quote {

    private $id;
    private $quoteName;
    private $policyNumber;
    private $creationDate;
    private $effectiveDate;
    private $insurers;
    private $policyHolderLocation;
    private $lineOfBusinesses;
    private $currency;
    private $riskLocations;

    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function getQuoteName() {
        return $this->quoteName;
    }

    public function setQuoteName($quoteName) {
        $this->quoteName = $quoteName;
    }

    public function getPolicyNumber() {
        return $this->policyNumber;
    }

    public function setPolicyNumber($policyNumber) {
        $this->policyNumber = $policyNumber;
    }

    public function getCreationDate() {
        return $this->creationDate;
    }

    public function setCreationDate($creationDate) {
        $this->creationDate = $creationDate;
    }

    public function getEffectiveDate() {
        return $this->effectiveDate;
    }

    public function setEffectiveDate($effectiveDate) {
        $this->effectiveDate = $effectiveDate;
    }

    public function getInsurers() {
        return $this->insurers;
    }

    public function setInsurers(array $insurers) {
        $this->insurers = $insurers;
    }

    public function getPolicyHolderLocation() {
        return $this->policyHolderLocation;
    }

    public function setPolicyHolderLocation($policyHolderLocation) {
        $this->policyHolderLocation = $policyHolderLocation;
    }

    public function getLineOfBusinesses() {
        return $this->lineOfBusinesses;
    }

    public function setLineOfBusinesses(array $lineOfBusinesses) {
        $this->lineOfBusinesses = $lineOfBusinesses;
    }

    public function getCurrency() {
        return $this->currency;
    }

    public function setCurrency($currency) {
        $this->currency = $currency;
    }

    public function getRiskLocations() {
        return $this->riskLocations;
    }

    public function setRiskLocations(array $riskLocations) {
        $this->riskLocations = $riskLocations;
    }
	
   /**
     * Saves quote detils
     * @param admin_Model_Quote $quote
     * @return boolean
     * @throws Exception 
     */
    public function saveQuote(admin_Model_Quote $quote) {
        try {
            if ($quote->getId() == NULL) {
                $quoteDao = new admin_Model_QuoteDao();
                $quoteId = $quoteDao->addNewQuote($this->getArray($quote));
                if (is_int((integer)$quoteId)) {
                    $quote->setId($quoteId);
                    $countries = $quote->getRiskLocations();
                    $this->insertQuoteElements($countries, $quote);
                    $this->insertHeaderQuoteElements($countries, $quote);
                    return true;
                    
                } else {
                    throw new Exception('Invalid argument exception in saveQuote!');
                }
            } else {
                
            }
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }



    private function getArray(admin_Model_Quote $quote) {

        $quoteArray = array();
        $quoteArray['ID_Quote'] = $quote->getId();
        $quoteArray['d__Description'] = $quote->getQuoteName();
        $quoteArray['d__EffectiveDate'] = $quote->getEffectiveDate();
        $quoteArray['d__Date'] = $quote->getCreationDate();
        $quoteArray['d__PolicyNumber'] = $quote->getPolicyNumber();
        $quoteArray['ID_Country_Residence'] = $quote->getPolicyHolderLocation();
        $quoteArray['ID_Currency'] = $quote->getCurrency();
        $lineofbusinesss= $quote->getLineOfBusinesses();
        $quoteArray['ID_InsuranceClass'] = $lineofbusinesss[0]; 
        return $quoteArray;
    }
    
   /**
     * Select quote details for given quote id.
     * @param Integer $quoteId
     * @return Array $quoteResult
     * @throws Exception 
     */
    public function find($quoteId){
        try{
            $quoteDao = new admin_Model_QuoteDao();
            $quoteData = $quoteDao->find($quoteId);
            $quoteResult = $this->getQuoteArray($quoteData);
            return $quoteResult;
            
        }catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
        
    }
    public function getQuoteArray($quoteData){
        $dataArray = array();
        $dataResult = array();
        foreach ($quoteData as $quoteLineBusiness) {
            $dataArray['lineofbusiness'] = $quoteLineBusiness['d__LineName'];
            $dataArray['name'] = $quoteLineBusiness['d__Description'];
             $dataArray['id'] = $quoteLineBusiness['ID_Quote'];
            $dataResult[] = $dataArray;
        }
        return $dataResult;
    }

}

?>
