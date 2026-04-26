export type Role = 'admin' | 'reviewer' | 'staff';

export interface Citation {
  documentId: string;
  page: number;
  chunkId: string;
}

export interface AnswerResponse {
  answer: string;
  citations: Citation[];
  reliability: 'high' | 'low';
}
