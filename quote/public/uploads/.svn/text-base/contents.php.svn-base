
<?php 
$merchantDetails = $featuredDeal->getMerchantDetails();
$locations = ($merchantDetails['locations']);
$location = $locations[0]['location'];
$webSite = str_replace(array('http://','https://'), '', $merchantDetails['web_site']);
$baseurl  = $this->config->item('base_url');
$root_url  = $this->config->item('root_url');
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>The Blind Squirrel</title>
<link href="<?php echo $this->config->item('base_url')?>css/style.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="<?php echo $this->config->item('base_url')?>js/jquery.js"></script>
<script>
function equalHeight(group) {
	tallest = 0;
	group.each(function() {
		thisHeight = $(this).height();
		if(thisHeight > tallest) {
			tallest = thisHeight;
		}
	});
	group.height(tallest);
}
$(document).ready(function() {
	equalHeight($(".column"));
});
</script>


<div id="content_wrapper">
  <div id="content_left">
    <div class="deal">
    <!--<pre>
    <?php print_r($featuredDeal);?>
    </pre>
      --><h1><?php echo $featuredDeal->getTitle();?></h1>
      <div class="deal-left">
        <div class="deal-price">
          <h2>$<?php echo round($featuredDeal->getVoucherPrice(), 0);?></h2>
          <a href="<?php echo $root_url;?>contents/checkout/<?php echo $featuredDeal->getDealId();?>" ><input type="button" class="buy" id="buyDeal" value="" /></a>
        </div>
        <div class="deal-info">
          <div class="value">
            <h6>Value</h6>
            <h2>$<?php echo round($featuredDeal->getVoucherValue(),0);?></h2>
          </div>
          <div class="value">
            <h6>Discount </h6>
            <h2><?php echo round(((($featuredDeal->getVoucherValue()-$featuredDeal->getVoucherPrice())*100)/$featuredDeal->getVoucherValue()),2) ."%"?></h2>
          </div>
          <div class="value">
            <h6>Savings</h6>
            <h2>$<?php echo ($featuredDeal->getVoucherValue()-$featuredDeal->getVoucherPrice()); ?></h2>
          </div>
        </div>
        <div class="deal-info"><a href="#" class="gift">Buy as a Gift!</a></div>
        <div class="deal-info">
          <h6>Share</h6>
          <ul class="deal-share">
            <li><a href="#" class="fb"></a></li>
            <li><a href="#" class="tt"></a></li>
            <li><a href="#" class="ml"></a></li>
          </ul>
        </div>
        <div class="deal-info">
          <h3><?php echo $location;?></h3>
          <h6>
          <a href="<?php echo $merchantDetails['web_site'];?>"><?php echo $webSite;?></a></h6>
<!--          <h6>Academy Lanes</h6>-->
<!--          <h6>394 Academy Rd</h6>-->
<!--          <h6>Winnepeg, MB R3N 0B8</h6>-->
<!--          <h6>204-488-0000</h6>-->
			  <h6><?php echo $merchantDetails['address'];?></h6>
          <div class="map"> <img src="http://maps.googleapis.com/maps/api/staticmap?center=<?php echo $merchantDetails['latitude'];?>,<?php echo $merchantDetails['longitude'];?>&zoom=12&size=190x190&
          &markers=color:blue%7Clabel:S%7C<?php echo $merchantDetails['latitude'];?>,<?php echo $merchantDetails['longitude'];?>&markers=size:tiny&sensor=false" height="190px" width="190px" /> </div>
        </div>
      </div>
      <div class="deal-right">
        <div class="deal-image"><img src="<?php echo $featuredDeal->getdealImageUrl();?>" height="260px" width="440px" /></div>
        <div class="deal-details">
          <h2>The Fine Print</h2>
          <p><?php echo $featuredDeal->getDetails();?></p>
        </div>
        <div class="deal-details">
          <h2>Highlights</h2>
          <?php echo $featuredDeal->getHighlights();?>
<!--          <ul>-->
<!--            <li>Lorem ipsum dolor sit amet</li>-->
<!--            <li>Consectetur adipisicing elitsed </li>-->
<!--            <li>Tempor incididunt ut labore</li>-->
<!--            <li>Dolore magna minimenim aliqua </li>-->
<!--          </ul>-->
        </div>
        <div class="deal-description">
        <p><?php echo $featuredDeal->getAboutDeal();?></p>
        </div>
      </div>
    </div>
  </div>
  <div id="content_right">
    <h3>More Great Deals <a href="#">See All</a></h3>
    <div class="top-deal">
    <?php 
    	$merchant = $topDeal->getMerchantDetails();
    	$locations = $merchant['locations'];
        $location1 = $locations[0];
    	$locationNmae = $location1['location'];
    ?>
      <h4><?php echo $locationNmae;?> <a href="#"><?php echo $topDeal->getTitle()?></a></h4>
      <div class="top-deal-info">
        <h6 class="bought">29 bought</h6>
        <h2>$<?php echo $topDeal->getVoucherValue();?></h2>
        <a href="<?php echo $root_url?>contents/deals/<?php echo $topDeal->getDealId();?>"><input type="button" class="view-it" value="" /></a>
      </div>
      <div class="top-deal-image"><img src="<?php echo $topDeal->getdealImageUrl();?>" height="70px" width="100px" /></div>
    </div>
    
    
    <?php foreach($deals as $key => $value):?>
    	<?php 
    		$deal = $deals[$key];
    		$merchant = $deal->getMerchantDetails();
    		$locations = $merchant['locations'];
    		$location1 = $locations[0];
    		$locationNmae = $location1['location'];
    	?>
	     <div class="deal-sml">
	      <h5><?php echo $locationNmae;?> <a href="#"><?php echo $deals[$key]->getTitle();?> </a></h5>
	      <h6 class="bought">128 bought</h6>
	      <a href="<?php echo $root_url?>contents/deals/<?php echo $key;?>"><input type="button" class="view-it-sml" value="" /></a>
	    </div>
	    
    <?php endforeach;?>
    
  </div>
</div>
</body>
</html>
