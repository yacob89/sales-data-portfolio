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

import { checkInventoryAndSendEmail } from '../src/inventory';

describe('inventory', () => {
  let mockSpreadsheet: Record<string, jest.Mock>;
  let mockSheet: Record<string, jest.Mock>;
  let mockRange: Record<string, jest.Mock>;
  let mockSession: Record<string, jest.Mock>;
  let mockUser: Record<string, jest.Mock>;
  let mockMailApp: Record<string, jest.Mock>;

  beforeEach(() => {
    mockRange = {
      getValues: jest.fn(),
    };
    mockSheet = {
      getDataRange: jest.fn().mockReturnValue(mockRange),
    };
    mockSpreadsheet = {
      getActiveSheet: jest.fn().mockReturnValue(mockSheet),
    };
    mockUser = {
      getEmail: jest.fn().mockReturnValue('test@example.com'),
    };
    mockSession = {
      getActiveUser: jest.fn().mockReturnValue(mockUser),
    };
    mockMailApp = {
      sendEmail: jest.fn(),
    };

    // Global mocks
    const globalObject = global as unknown as Record<string, unknown>;
    globalObject.SpreadsheetApp = {
      getActiveSpreadsheet: jest.fn().mockReturnValue(mockSpreadsheet),
    };
    globalObject.Session = mockSession;
    globalObject.MailApp = mockMailApp;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Sends an email when inventory levels are below 50', () => {
    const data = [
      ['Store ID', 'Product ID', 'Category', 'Product Name', 'Inventory Level'],
      ['S1', 'P1', 'Cat1', 'Prod1', 40],
      ['S2', 'P2', 'Cat2', 'Prod2', 60],
    ];
    mockRange.getValues.mockReturnValue(data);

    checkInventoryAndSendEmail();

    expect(mockMailApp.sendEmail).toHaveBeenCalledWith(
      'test@example.com',
      'Low Inventory Alert - Action Required',
      '',
      expect.objectContaining({
        htmlBody: expect.stringContaining('S1'),
      })
    );
    expect(mockMailApp.sendEmail).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      expect.any(String),
      expect.objectContaining({
        htmlBody: expect.stringContaining('40'),
      })
    );
    expect(mockMailApp.sendEmail).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      expect.any(String),
      expect.objectContaining({
        htmlBody: expect.stringContaining('P1'),
      })
    );
    expect(mockMailApp.sendEmail).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      expect.any(String),
      expect.objectContaining({
        htmlBody: expect.stringContaining('Cat1'),
      })
    );
    expect(mockMailApp.sendEmail).not.toEqual(expect.stringContaining('Prod2'));
  });

  it('Does not send an email when all levels are 50 or above', () => {
    const data = [
      ['Store ID', 'Product ID', 'Category', 'Product Name', 'Inventory Level'],
      ['S1', 'P1', 'Cat1', 'Prod1', 50],
      ['S2', 'P2', 'Cat2', 'Prod2', 100],
    ];
    mockRange.getValues.mockReturnValue(data);

    checkInventoryAndSendEmail();

    expect(mockMailApp.sendEmail).not.toHaveBeenCalled();
  });

  it('Throws an error if "Inventory Level" column is missing', () => {
    const data = [
      ['Store ID', 'Product ID', 'Category', 'Product Name'],
      ['S1', 'P1', 'Cat1', 'Prod1'],
    ];
    mockRange.getValues.mockReturnValue(data);

    expect(() => checkInventoryAndSendEmail()).toThrow(
      'Column "Inventory Level" not found.'
    );
  });
});
