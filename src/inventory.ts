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
  productName: string | number;
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
  const productNameIdx =
    headers.indexOf('Product Name') !== -1
      ? headers.indexOf('Product Name')
      : headers.indexOf('Product');

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
        productName:
          productNameIdx !== -1
            ? (row[productNameIdx] as string | number)
            : 'N/A',
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

  let body = 'The following products have inventory levels below 50:\n\n';

  items.forEach(item => {
    body += `Product: ${item.productName}\n`;
    body += `Store ID: ${item.storeId}\n`;
    body += `Product ID: ${item.productId}\n`;
    body += `Category: ${item.category}\n`;
    body += `Current Level: ${item.level}\n`;
    body += '---------------------------\n';
  });

  body += '\nPlease check the inventory levels in the spreadsheet.';

  if (recipient) {
    MailApp.sendEmail(recipient, subject, body);
    console.log(`Email sent to ${recipient} with ${items.length} items.`);
  } else {
    console.error('Could not determine recipient email address.');
  }
}
