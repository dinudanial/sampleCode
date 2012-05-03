<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html;
              charset=utf-8"/>
        <base href="/" />
        <link rel="stylesheet" type="text/css" href="<?php echo $this->baseUrl("/css/master.css"); ?>" />
    </head>
    <body>
        <div id="header">
            <div id="logo">
                <img src="<?php echo $this->baseUrl("/images/logo.gif"); ?>" />
            </div>
            <div id="menu">
                <a href="#">HOME</a>
                <a href="#">SERVICES</a>
                <a href="#">CONTACT</a>
            </div>
        </div>
        <div id="content">
            <?php echo $this->layout()->content ?>
        </div>
        <div id="footer">
            <p>
                Created with <a href="http://framework.zend.com/">
                    Zend Framework</a>. Licensed under
                <a href="http://www.creativecommons.org/">Creative Commons</a>.
            </p>
        </div>
    </body>
</html>
