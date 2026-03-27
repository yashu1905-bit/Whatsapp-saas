const activationMailTemplate = (data)=>{
return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Whatsapp Saas Activation Email</title>
</head>

<body>

    <p>Hello ${data.name},</p>

    <h1>Welcome to Whatsapp Saas!</h1>
    <p>Thank you for registering. Please click the link below to activate your account:</p>
    <h2>
        ${data.activationCode}
    </h2>

</body>

</html>
`;
}

export default activationMailTemplate;