# Miniauracreation — GitHub-ready Resin Store

## Included
- Responsive premium resin-art storefront
- Product catalogue + category filters
- Premium Resin Chess category
- Shopping cart with localStorage
- WhatsApp checkout to **+91 8196824199**
- Customer name/email/address collected before checkout
- Instagram: **@miniauracreation22**
- Business email: **sinuparveen91@gmail.com**
- Contact enquiry → WhatsApp
- Starter prices are editable in `script.js`

## Run
Open `index.html` locally, or upload all files to a GitHub repository and enable GitHub Pages.

## WhatsApp ordering
Already configured. Customers add products, enter their details, click **Order on WhatsApp**, and WhatsApp opens with a ready-made order message.

## Customer email confirmation
A static GitHub Pages site cannot safely send Gmail mail using a Gmail password. This site uses an optional EmailJS integration.

1. Create an EmailJS account.
2. Add an email service and template.
3. In `config.js`, set:
   - `enabled: true`
   - `publicKey`
   - `serviceId`
   - `templateId`
4. Use template variables:
   - `{{to_email}}`
   - `{{customer_name}}`
   - `{{order_id}}`
   - `{{order_items}}`
   - `{{total}}`
   - `{{address}}`
   - `{{reply_to}}`

Suggested email subject:
`Order Confirmed — Miniauracreation {{order_id}}`

Suggested message:
`Hi {{customer_name}}, thank you for ordering from Miniauracreation. We have received your order {{order_id}} for {{total}}. Your order details are below: {{order_items}}. Delivery details: {{address}}. We will contact you on WhatsApp to confirm the order. Thank you for supporting handmade art!`

## Product images
Starter product imagery is loaded from public Unsplash image URLs. Replace the image URLs in `script.js` with your own product photos whenever ready. For the premium chess listings, replace the starter imagery with your actual resin chess photos for the most accurate representation.

## Important
Do not put a Gmail password, SMTP password, or private API secret in this repository.
