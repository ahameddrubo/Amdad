<?php
session_start();
$responseData = null;
$error = "";
$captchaError = "";

// Math Captcha
if (!isset($_SESSION['captcha_a']) || !isset($_SESSION['captcha_b'])) {
    $_SESSION['captcha_a'] = rand(1, 10);
    $_SESSION['captcha_b'] = rand(1, 10);
    $_SESSION['captcha_answer'] = $_SESSION['captcha_a'] + $_SESSION['captcha_b'];
}

// cURL দিয়ে API থেকে ডেটা আনা
function getApiResponse($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $response = curl_exec($ch);
    curl_close($ch);
    return $response;
}

// ফর্ম প্রসেসিং
if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET['number'])) {
    $userCaptcha = intval($_GET['captcha'] ?? -1);
    $correctAnswer = intval($_SESSION['captcha_answer'] ?? -9999);

    if ($userCaptcha !== $correctAnswer) {
        $captchaError = "আপনার প্রদত্ত উত্তর ভুল!";
    } else {
        $number = urlencode($_GET['number']);
        $url = "https://cellfin.com/bkash/foundname.php?number={$number}";
        $json = getApiResponse($url);
        if ($json === false) {
            $error = "API সার্ভারে সমস্যা দেখা দিয়েছে।";
        } else {
            $data = json_decode($json, true);
            if (is_array($data)) {
                $responseData = $data;
            } else {
                $error = "ডেটা পার্স করতে সমস্যা হয়েছে।";
            }
        }
    }

    // নতুন Math CAPTCHA জেনারেট
    $_SESSION['captcha_a'] = rand(1, 10);
    $_SESSION['captcha_b'] = rand(1, 10);
    $_SESSION['captcha_answer'] = $_SESSION['captcha_a'] + $_SESSION['captcha_b'];
}
?>
<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <title>🚀 bKash Account Info Checker</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Noto Sans Bengali', sans-serif;
            background: linear-gradient(135deg, #1e3c72, #2a5298);
            color: #333;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .header {
            background: #e2136e;
            color: #fff;
            width: 100%;
            padding: 20px;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .header h1 {
            font-size: 2rem;
            margin-bottom: 5px;
        }

        .header p {
            font-size: 1rem;
            opacity: 0.9;
        }

        .container {
            max-width: 700px;
            width: 90%;
            margin: 30px auto;
            background: #fff;
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
            animation: slideIn 0.5s ease-in-out;
        }

        form {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        label {
            font-size: 1.1rem;
            font-weight: 600;
            color: #333;
        }

        input[type="text"] {
            padding: 12px;
            font-size: 1rem;
            border: 2px solid #ddd;
            border-radius: 8px;
            transition: border-color 0.3s, box-shadow 0.3s;
        }

        input[type="text"]:focus {
            border-color: #e2136e;
            box-shadow: 0 0 8px rgba(226, 19, 110, 0.2);
            outline: none;
        }

        input[type="submit"] {
            background: #e2136e;
            color: #fff;
            padding: 12px;
            border: none;
            border-radius: 8px;
            font-size: 1.1rem;
            cursor: pointer;
            transition: background 0.3s, transform 0.2s;
        }

        input[type="submit"]:hover {
            background: #c1105f;
            transform: translateY(-2px);
        }

        .response-box {
            margin-top: 20px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        table th, table td {
            padding: 12px;
            border: 1px solid #e0e0e0;
            text-align: left;
        }

        table th {
            background: #e2136e;
            color: #fff;
        }

        .error {
            color: #d32f2f;
            font-weight: 600;
            margin-top: 15px;
            text-align: center;
        }

        .loader {
            display: none;
            text-align: center;
            margin: 20px 0;
        }

        .loader::after {
            content: '';
            width: 40px;
            height: 40px;
            border: 4px solid #e2136e;
            border-top: 4px solid transparent;
            border-radius: 50%;
            display: inline-block;
            animation: spin 1s linear infinite;
        }

        .footer {
            text-align: center;
            font-size: 0.9rem;
            color: #fff;
            margin: 20px 0;
            opacity: 0.8;
        }

        #popup {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        #popupContent {
            background: #fff;
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            width: 90%;
            max-width: 450px;
            animation: popIn 0.3s ease-in-out;
        }

        #popup h3 {
            color: #e2136e;
            margin-bottom: 15px;
        }

        #popup button {
            padding: 10px 20px;
            font-size: 1rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            margin: 10px;
        }

        #popup .join {
            background: #1877f2;
            color: #fff;
        }

        #popup .cancel {
            background: #e0e0e0;
            color: #333;
        }

        #popup button:hover {
            transform: scale(1.05);
        }

        @keyframes slideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes popIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        @media (max-width: 600px) {
            .container {
                padding: 15px;
            }

            .header h1 {
                font-size: 1.5rem;
            }

            input[type="submit"] {
                font-size: 1rem;
            }
        }
    </style>
</head>
<body>

<div class="header">
    <h1>🚀 bKash Account Info Checker</h1>
    <p>Official Verification Portal | Emdadul</p>
</div>

<div class="container">
    <form method="get" onsubmit="return showLoader()">
        <label for="number">📱 bKash অ্যাকাউন্ট নম্বর:</label>
        <input type="text" name="number" id="number" placeholder="01XXXXXXXXX" required>

        <label for="captcha">🧮 <?= $_SESSION['captcha_a'] ?> + <?= $_SESSION['captcha_b'] ?> = ?</label>
        <input type="text" name="captcha" id="captcha" placeholder="উত্তর লিখুন" required>

        <input type="submit" value="তথ্য যাচাই করুন">
    </form>

    <div class="loader" id="loadingSpinner"></div>

    <?php if (!empty($captchaError)) : ?>
        <div class="error"><?= htmlspecialchars($captchaError) ?></div>
    <?php elseif (!empty($error)) : ?>
        <div class="error"><?= htmlspecialchars($error) ?></div>
    <?php elseif ($responseData): ?>
        <div class="response-box">
            <h3>✅ ফলাফল তথ্য:</h3>
            <table>
                <?php foreach ($responseData as $key => $value): ?>
                    <tr>
                        <th><?= htmlspecialchars(ucwords(str_replace("_", " ", $key))) ?></th>
                        <td><?= htmlspecialchars($value) ?></td>
                    </tr>
                <?php endforeach; ?>
            </table>
        </div>
    <?php endif; ?>
</div>

<div class="footer">
    © <?= date("Y") ?> Emdadul Tools. All Rights Reserved.
</div>

<!-- Join Facebook Popup -->
<div id="popup">
    <div id="popupContent">
        <h3>📘 আমাদের ফেসবুক পেজে যোগ দিন</h3>
        <p>সর্বশেষ আপডেট এবং সাহায্য পেতে আমাদের ফেসবুক পেজে যোগ দিন।</p>
        <button class="join" onclick="window.open('https://www.facebook.com/yourprofile'); hidePopup()">Join</button>
        <button class="cancel" onclick="hidePopup()">Cancel</button>
    </div>
</div>

<script>
    function showLoader() {
        document.getElementById("loadingSpinner").style.display = "block";
        return true;
    }

    function hidePopup() {
        document.getElementById("popup").style.display = "none";
        const expireTime = new Date();
        expireTime.setTime(expireTime.getTime() + (10 * 60 * 1000));
        document.cookie = "popupShown=1; expires=" + expireTime.toUTCString() + "; path=/";
    }

    window.onload = function () {
        const cookies = document.cookie.split(';').map(c => c.trim());
        const popupCookie = cookies.find(c => c.startsWith("popupShown="));
        if (!popupCookie) {
            document.getElementById("popup").style.display = "flex";
        }
    }
</script>

</body>
</html>