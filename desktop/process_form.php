<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "denis.resitko@gmail.com";
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $user_info = '';
    if (!empty($_POST['first_name']) && !empty($_POST['last_name'])) {
        $user_info .= "Name: {$_POST['first_name']} {$_POST['last_name']}\n";
    }
    if (!empty($_POST['email'])) {
        $user_info .= "Email: {$_POST['email']}\n";
    }
    if (!empty($_POST['phone1']) && !empty($_POST['phone2']) && !empty($_POST['phone3'])) {
        $user_info .= "Phone: {$_POST['phone1']}-{$_POST['phone2']}-{$_POST['phone3']}\n";
    }

    $message .= "\n\nUser Info:\n$user_info";

    $headers = "From: {$_POST['email']}" . "\r\n" .
               "Reply-To: {$_POST['email']}" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    if (mail($to, $subject, $message, $headers)) {
        echo "Your message has been sent successfully.";
    } else {
        echo "Failed to send the message. Please try again later.";
    }
}
?>