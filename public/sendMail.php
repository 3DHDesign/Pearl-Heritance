<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed"
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$firstName = trim($data['firstName'] ?? '');
$lastName  = trim($data['lastName'] ?? '');
$email     = trim($data['email'] ?? '');
$phone     = trim($data['phone'] ?? '');
$message   = trim($data['message'] ?? '');

if (!$firstName || !$lastName || !$email || !$message) {
    http_response_code(422);
    echo json_encode([
        "success" => false,
        "message" => "Please fill all required fields"
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode([
        "success" => false,
        "message" => "Invalid email address"
    ]);
    exit;
}

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'mail.pearlhe.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'info@pearlhe.com';
    $mail->Password = 'YOUR_EMAIL_PASSWORD';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;

    $mail->setFrom('info@pearlhe.com', 'Pearl Heritance Website');
    $mail->addAddress('info@pearlhe.com', 'Pearl Heritance');
    $mail->addReplyTo($email, $firstName . ' ' . $lastName);

    $mail->isHTML(true);
    $mail->Subject = 'New Contact Form Submission - Pearl Heritance';

    $safeFirstName = htmlspecialchars($firstName, ENT_QUOTES, 'UTF-8');
    $safeLastName  = htmlspecialchars($lastName, ENT_QUOTES, 'UTF-8');
    $safeEmail     = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
    $safePhone     = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
    $safeMessage   = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));

    $mail->Body = "
        <div style='font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937;'>
          <h2 style='margin-bottom: 16px;'>New Contact Form Submission</h2>
          <p><strong>Name:</strong> {$safeFirstName} {$safeLastName}</p>
          <p><strong>Email:</strong> {$safeEmail}</p>
          <p><strong>Phone:</strong> {$safePhone}</p>
          <p><strong>Message:</strong><br>{$safeMessage}</p>
        </div>
    ";

    $mail->AltBody =
        "New Contact Form Submission\n\n" .
        "Name: {$firstName} {$lastName}\n" .
        "Email: {$email}\n" .
        "Phone: {$phone}\n\n" .
        "Message:\n{$message}";

    $mail->send();

    echo json_encode([
        "success" => true,
        "message" => "Message sent successfully"
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to send email",
        "error" => $mail->ErrorInfo
    ]);
}