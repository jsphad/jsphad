import { useMemo, useState } from 'react';
import type { AnswerResponse, Role } from './types';

const roleCapabilities: Record<Role, string[]> = {
  admin: ['Manage repository', 'Run classification', 'Approve drafts'],
  reviewer: ['Review AI drafts', 'Approve/Reject communication'],
  staff: ['Search documents', 'Create draft requests']
};

export function App() {
  const [role, setRole] = useState<Role>('staff');
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState<AnswerResponse | null>(null);

  const modules = useMemo(
    () => [
      '1. Document repository',
      '2. Metadata tagging',
      '3. Search with citations',
      '4. Communication classifier',
      '5. Draft note/reply generator',
      '6. Task/deadline tracker'
    ],
    []
  );

  const runMockQuery = () => {
    if (!question.trim()) return;
    setResult({
      answer:
        'Draft answer generated from retrieved policy chunks only. Human approval is required before dispatch.',
      reliability: 'high',
      citations: [
        { documentId: 'policy-handbook.pdf', page: 4, chunkId: 'chunk_4_2' },
        { documentId: 'finance-memo.docx', page: 1, chunkId: 'chunk_1_1' }
      ]
    });
  };

  return (
    <main className="container">
      <h1>Controlled RAG Office Assistant</h1>
      <p className="subtitle">Official administrative workflows with strict human governance.</p>

      <section className="card">
        <h2>Role-based Login (starter)</h2>
        <label>
          Active role:
          <select value={role} onChange={(e) => setRole(e.target.value as Role)}>
            <option value="staff">Staff</option>
            <option value="reviewer">Reviewer</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <ul>
          {roleCapabilities[role].map((capability) => (
            <li key={capability}>{capability}</li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h2>Core Modules</h2>
        <ul>
          {modules.map((module) => (
            <li key={module}>{module}</li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h2>Controlled Answering</h2>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question tied to official documents..."
        />
        <button onClick={runMockQuery}>Generate Draft Answer</button>

        {result ? (
          <div className="result">
            <p><strong>Answer:</strong> {result.answer}</p>
            <p><strong>Reliability:</strong> {result.reliability}</p>
            <p><strong>Citations:</strong></p>
            <ul>
              {result.citations.map((citation) => (
                <li key={citation.chunkId}>
                  {citation.documentId} — page {citation.page}, {citation.chunkId}
                </li>
              ))}
            </ul>
            <p className="warning">No automatic dispatch. Human approval is mandatory.</p>
          </div>
        ) : null}
      </section>
    </main>
  );
}
