/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

interface InventoryItem {
  storeId: string | number;
  productId: string | number;
  category: string | number;
  level: number;
}

/**
 * Checks the active sheet for products with inventory levels below 50
 * and sends an email notification.
 */
export function checkInventoryAndSendEmail() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  const data = sheet.getDataRange().getValues();

  if (data.length < 2) {
    console.log('No data found in sheet.');
    return;
  }

  const headers = data[0].map(h => String(h).trim());
  const inventoryLevelIdx = headers.indexOf('Inventory Level');
  const storeIdIdx = headers.indexOf('Store ID');
  const productIdIdx = headers.indexOf('Product ID');
  const categoryIdx = headers.indexOf('Category');

  if (inventoryLevelIdx === -1) {
    throw new Error(
      'Column "Inventory Level" not found. Please ensure your sheet has this header.'
    );
  }

  const lowInventoryItems: InventoryItem[] = [];

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const level = row[inventoryLevelIdx];

    if (typeof level === 'number' && level < 50) {
      lowInventoryItems.push({
        storeId:
          storeIdIdx !== -1 ? (row[storeIdIdx] as string | number) : 'N/A',
        productId:
          productIdIdx !== -1 ? (row[productIdIdx] as string | number) : 'N/A',
        category:
          categoryIdx !== -1 ? (row[categoryIdx] as string | number) : 'N/A',
        level: level,
      });
    }
  }

  if (lowInventoryItems.length > 0) {
    sendInventoryEmail(lowInventoryItems);
  } else {
    console.log('All inventory levels are above 50.');
  }
}

/**
 * Sends an email with the list of low inventory items.
 * @param items List of items with low inventory
 */
function sendInventoryEmail(items: InventoryItem[]) {
  // Using the active user's email as default.
  // You can replace this with a specific email address string.
  const recipient = Session.getActiveUser().getEmail();
  const subject = 'Low Inventory Alert - Action Required';

  const rows = items
    .map(
      item => `
    <tr>
           <td>${item.storeId}</td>
           <td>${item.productId}</td>
           <td>${item.category}</td>
           <td>${item.level}</td>
         </tr>`
    )
    .join('');

  const htmlBody = `
     <html>
       <head>
         <style>
           table { border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; }
           th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
           th { background-color: #f2f2f2; }
           tr:nth-child(even) { background-color: #f9f9f9; }
           h2 { color: #b00000; font-family: Arial, sans-serif; }
           p { font-family: Arial, sans-serif; }
         </style>
       </head>
       <body>
         <h2>Heads up: Some items are running low</h2>
         <p>The following items are at or below the low-stock threshold:</p>
         <table>
           <tr>
             <th>Store Id</th>
             <th>Product Id</th>
             <th>Category</th>
             <th>Stock</th>
           </tr>
           ${rows}
         </table>
         <p>Please check the inventory levels in the spreadsheet.</p>
       </body>
     </html>`;

  if (recipient) {
    MailApp.sendEmail(recipient, subject, '', {
      htmlBody: htmlBody,
    });
    console.log(`Email sent to ${recipient} with ${items.length} items.`);
  } else {
    console.error('Could not determine recipient email address.');
  }
}
