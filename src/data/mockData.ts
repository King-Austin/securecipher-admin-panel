// Mock data for crypto admin dashboard

export interface Transaction {
  id: string;
  timestamp: Date;
  clientPublicKey: string;
  verificationStatus: 'success' | 'failed';
  amount?: number;
  type: 'encryption' | 'decryption' | 'signature';
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
  
  for (let i = 0; i < count; i++) {
    const daysAgo = Math.floor(Math.random() * 7);
    const hoursAgo = Math.floor(Math.random() * 24);
    const minutesAgo = Math.floor(Math.random() * 60);
    
    const timestamp = new Date(now);
    timestamp.setDate(timestamp.getDate() - daysAgo);
    timestamp.setHours(timestamp.getHours() - hoursAgo);
    timestamp.setMinutes(timestamp.getMinutes() - minutesAgo);
    
    transactions.push({
      id: `tx_${i + 1}`,
      timestamp,
      clientPublicKey: `0x${Math.random().toString(16).substr(2, 40)}`,
      verificationStatus: Math.random() > 0.1 ? 'success' : 'failed',
      amount: Math.floor(Math.random() * 1000) + 1,
      type: ['encryption', 'decryption', 'signature'][Math.floor(Math.random() * 3)] as any
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
      clientPublicKey: `0x${Math.random().toString(16).substr(2, 40)}`,
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
    publicKey: '0x04a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7',
    isActive: true,
    rotationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30 days ago
  },
  {
    id: 'key_2',
    publicKey: '0x04b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8',
    isActive: false,
    rotationDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
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