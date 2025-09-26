import { Card, CardType } from '../types';

// Utility function to simulate network delay
export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Mock cards data
export const getMockCards = (): Card[] => [
  {
    id: '1',
    cardName: 'Business Card',
    cardNumber: '4532123456789012',
    cardHolder: 'John Doe',
    cardType: 'visa',
    balance: '2450.00',
    currency: 'USD',
    isActive: true,
    isBlocked: false,
    expiryDate: '12/26',
    cvv: '123',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    cardName: 'Personal Card',
    cardNumber: '5555123456789012',
    cardHolder: 'John Doe',
    cardType: 'mastercard',
    balance: '1230.50',
    currency: 'EUR',
    isActive: false,
    isBlocked: false,
    expiryDate: '10/27',
    cvv: '456',
    createdAt: '2024-02-20T14:15:00Z',
    updatedAt: '2024-02-20T14:15:00Z',
  },
  {
    id: '3',
    cardName: 'Travel Card',
    cardNumber: '4000123456789012',
    cardHolder: 'John Doe',
    cardType: 'visa',
    balance: '850.25',
    currency: 'GBP',
    isActive: false,
    isBlocked: false,
    expiryDate: '08/28',
    cvv: '789',
    createdAt: '2024-03-10T09:45:00Z',
    updatedAt: '2024-03-10T09:45:00Z',
  },
];

// Mock card types data
export const getMockCardTypes = (): CardType[] => [
  {
    id: 'lite',
    name: 'BFinance Lite',
    code: 'LITE',
    description: 'Basic card with essential features',
    isActive: true,
    fees: {
      issuance: 0,
      monthly: 0,
      transaction: 0.5,
      atm: 2.0,
    },
  },
  {
    id: 'standard',
    name: 'BFinance Card',
    code: 'STANDARD',
    description: 'Premium card with advanced features',
    isActive: true,
    fees: {
      issuance: 20,
      monthly: 5,
      transaction: 0.2,
      atm: 1.0,
    },
  },
  {
    id: 'premium',
    name: 'BFinance Premium',
    code: 'PREMIUM',
    description: 'Exclusive card with premium benefits',
    isActive: true,
    fees: {
      issuance: 50,
      monthly: 15,
      transaction: 0,
      atm: 0,
    },
  },
];

// Mock function to get a single card
export const getMockCard = (cardId: string): Card | null => {
  const cards = getMockCards();
  return cards.find((card) => card.id === cardId) || null;
};
