export const createHtml = (paymentDetail) => {
    const { arrayProducts, name, amount, comission, deliveryPrice, ship } = paymentDetail;
    
    const productsHtml = arrayProducts.map(product => `
        <li>${product.name} - $${product.price}</li>
    `).join("");

    const htmlContent = `
        <html>
        <body>
            <div style="border: 1px solid #ddd; padding: 20px; max-width: 600px; margin: 0 auto;">
                <img src="https://i.ibb.co/PFrSPtf/neoshoplogo.jpg" alt="Logo" style="width: 70%; max-width: 200px; display: block; margin: 0 auto 20px;">
                <h1 style="text-align: center;">¡Purchase Complete!</h1>
                <p>Hi! <strong>${name}</strong>,</p>
                <p>Your purchase has been completed. You have paid <strong>$${amount}</strong> with your PayPal account.</p>
                <p>Summary:</p>
                <ul>
                    ${productsHtml}
                    <li>Comission - $${comission}</li>
                    <li>Delivery - $${deliveryPrice}</li>
                </ul>
                <p>Ship: ${ship}</p>
                <p>Thank you for your purchase.</p>
            </div>
        </body>
        </html>
    `;

    // Eliminar saltos de línea y espacios innecesarios
    return htmlContent.replace(/\n/g, '').replace(/\s\s+/g, ' ');
}