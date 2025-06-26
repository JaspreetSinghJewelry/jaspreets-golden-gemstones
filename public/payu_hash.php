
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// ✅ Replace these with your actual test credentials from PayU
$key = "LSzl2Y";
$salt = "0TnuJebAqBoK2GKZnMwxBrc39wtcTiFz";

$txnid = "PLS-" . time() . "-" . rand(100, 999);
$amount = "1.00";
$productinfo = "diamond bracelet";
$firstname = "Manveer Singh Bhalla";
$email = "manveersinghbhalla17@gmail.com";

// Correct hash format: key|txnid|amount|productinfo|firstname|email|||||||||||salt
$hash_string = "$key|$txnid|$amount|$productinfo|$firstname|$email|||||||||||$salt";
$hash = hash("sha512", $hash_string);

echo json_encode([
    "key" => $key,
    "txnid" => $txnid,
    "amount" => $amount,
    "productinfo" => $productinfo,
    "firstname" => $firstname,
    "email" => $email,
    "phone" => "9999999999",
    "hash" => $hash
]);
?>
