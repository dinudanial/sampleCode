<?php

class admin_Model_QuoteDao extends Zend_Db_Table_Abstract{
    
    protected $_name = 'Quote';
    protected $_primary = 'ID_Quote';
    
    
    public function addNewQuote(array $quoteData){
        try{
            $result = $this->insert($quoteData);
            return $result;
        } catch (Zend_Db_Table_Exception $ex) {
            throw new Exception($ex->getMessage());
        }
    }
    
    
    public function find($quoteId) {
        try{
            $select = $this->select()
               ->from($this, array('d__Description','ID_Quote'
                ))
               -> join('LineOfBusiness', 'LineOfBusiness.ID_LineOfBusiness = Quote.ID_InsuranceClass', array('LineOfBusiness.d__LineName'))
               ->setIntegrityCheck(false)
               ->where('Quote.ID_Quote = ?', $quoteId);
            $stmt = $select->query();
            $rows = $stmt->fetchAll();
            if (count($rows) > 0){
                return $rows;
            }
            else
                return false;
        }catch (Zend_Db_Table_Exception $ex) {
            throw new Exception($ex->getMessage());
        }
        
    }
}

?>
