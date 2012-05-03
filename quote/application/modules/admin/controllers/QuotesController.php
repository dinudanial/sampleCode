<?php
include_once 'IptController.php';
class admin_QuotesController extends admin_QuotesController {
    

    public function indexAction() {
        $form = new admin_Form_CreateQuote();
        $this->view->form = $form;
        //$test = new admin_Model_Country();
    }
    public function saveAction(){
        $this->_helper->viewRenderer->setNoRender(true);
         if ($this->_request->isPost()) {
              $formData = $this->_request->getPost();
              $quote = new admin_Model_Quote();
              $quote->setCurrency($formData['ID_Currency']);
              $quote->setEffectiveDate(date('Y-m-d',strtotime($formData['d__EffectiveDate'])));
              $quote->setCreationDate(date('Y-m-d',  strtotime($formData['d__Date'])));
              $quote->setInsurers(array($formData['insurers']));
              $quote->setLineOfBusinesses(array($formData['lineofbusiness']));
              $quote->setPolicyHolderLocation($formData['ID_Country_Residence']);
              $quote->setPolicyNumber($formData['d__PolicyNumber']);
              $quote->setQuoteName($formData['d__Description']);
              $quote->setRiskLocations($formData['riskloaction']);
              $result = $quote->saveQuote($quote);
              if($result){
                  $quoteId = $quote->getId();
                  $this->_redirect("admin/quotes/create/quoteId/".$quoteId);
              }
              else{
                  
              }
         }
    }
    public function createquoteAction(){
        $quoteId = $this->getRequest()->getParam('quoteId');
        $quote = new admin_Model_Quote();
        $quoteData = $quote->find($quoteId);
        $quoteElement = new admin_Model_QuoteElement();
        $quoteElementData = $quoteElement->find($quoteId);
        $arr = array('country' => $quoteElementData,'businessline'=>$quoteData);
        $this->view->assign($arr);
    }

}