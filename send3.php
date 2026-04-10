
<?php
   

    // declare variables for incoming data
    
    $email   = $_POST['field1'];
    $subject = $_POST['field2'];
    $message = $_POST['field3'];
   


    // Response 

    $response = array(
        "email" => $email,  "subject" => $subject,
        "message" => $message,        
    
    );

    // output
    $output = json_encode($response);
    echo $output;

?>