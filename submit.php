<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // reCAPTCHA validation
    $recaptcha_secret = "YOUR_SECRET_KEY"; // Replace with your secret key
    $response = $_POST['g-recaptcha-response'];
    $verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$recaptcha_secret}&response={$response}");
    $captcha_success = json_decode($verify);

    if ($captcha_success->success == false) {
        // reCAPTCHA validation failed
        echo "Please complete the reCAPTCHA validation";
        exit;
    }

    // Process form data here
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];

    // Add your email sending logic here
    
    echo "Message sent successfully!";
}
?> 