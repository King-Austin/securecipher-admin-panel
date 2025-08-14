// Mock data for crypto admin dashboard

export interface Transaction {
  id: string;
  timestamp: Date;
  clientPublicKey: string;
  verificationStatus: 'success' | 'failed' | 'pending';
  transactionType: string;
  responseTime: number;
}

export interface AuditLog {
  id: string;
  timestamp: Date;
  clientPublicKey: string;
  action: string;
  status: 'success' | 'failed';
  encryptionTime?: number;
  decryptionTime?: number;
}

export interface KeyMetadata {
  id: string;
  publicKey: string;
  isActive: boolean;
  rotationDate: Date;
  createdAt: Date;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'operator';
}

// Mock users for authentication
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@securecypher.com',
    role: 'admin'
  },
  {
    id: '2',
    username: 'operator',
    email: 'operator@securecypher.com',
    role: 'operator'
  }
];

// Generate mock transactions
export const generateMockTransactions = (count: number = 100): Transaction[] => {
  const transactions: Transaction[] = [];
  const now = new Date();
  const statuses: ('success' | 'failed' | 'pending')[] = ['success', 'failed', 'pending'];
  const types = ['encryption', 'decryption', 'signing', 'verification'];
  
  for (let i = 0; i < count; i++) {
    const daysAgo = Math.floor(Math.random() * 7);
    const hoursAgo = Math.floor(Math.random() * 24);
    const minutesAgo = Math.floor(Math.random() * 60);
    
    const timestamp = new Date(now);
    timestamp.setDate(timestamp.getDate() - daysAgo);
    timestamp.setHours(timestamp.getHours() - hoursAgo);
    timestamp.setMinutes(timestamp.getMinutes() - minutesAgo);
    
    transactions.push({
      id: `tx_${Math.random().toString(36).substr(2, 9)}`,
      timestamp,
      clientPublicKey: `pk_${Math.random().toString(36).substr(2, 20)}`,
      verificationStatus: statuses[Math.floor(Math.random() * statuses.length)],
      transactionType: types[Math.floor(Math.random() * types.length)],
      responseTime: Math.floor(Math.random() * 500) + 50
    });
  }
  
  return transactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

// Generate mock audit logs
export const generateMockAuditLogs = (count: number = 50): AuditLog[] => {
  const logs: AuditLog[] = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const hoursAgo = Math.floor(Math.random() * 24);
    const minutesAgo = Math.floor(Math.random() * 60);
    
    const timestamp = new Date(now);
    timestamp.setHours(timestamp.getHours() - hoursAgo);
    timestamp.setMinutes(timestamp.getMinutes() - minutesAgo);
    
    logs.push({
      id: `log_${i + 1}`,
      timestamp,
      clientPublicKey: `pk_${Math.random().toString(36).substr(2, 20)}`,
      action: ['AES_ENCRYPT', 'AES_DECRYPT', 'SIGNATURE_VERIFY'][Math.floor(Math.random() * 3)],
      status: Math.random() > 0.05 ? 'success' : 'failed',
      encryptionTime: Math.random() * 10 + 1,
      decryptionTime: Math.random() * 8 + 0.5
    });
  }
  
  return logs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

// Mock key metadata
export const mockKeyMetadata: KeyMetadata[] = [
  {
    id: 'key_1',
    publicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwJbYcVOlqjJJQKU9fX2y3sT8N9yZq1KxG',
    isActive: true,
    rotationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30 days ago
  },
  {
    id: 'key_2',
    publicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzRvOnQL6LKp9fX2y3sT8N9yZq1KxH',
    isActive: false,
    rotationDate: new Date(Date.now() + 37 * 24 * 60 * 60 * 1000), // 37 days from now
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) // 60 days ago
  }
];

// Mock data instance
export const mockData = {
  transactions: generateMockTransactions(100),
  auditLogs: generateMockAuditLogs(50),
  keyMetadata: mockKeyMetadata,
  users: mockUsers
};