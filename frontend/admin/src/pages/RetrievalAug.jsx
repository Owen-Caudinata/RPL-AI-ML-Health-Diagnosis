import React, { useState } from 'react';
import axios from 'axios';

const DocumentPage = () => {
  const [id, setId] = useState('');
  const [query, setQuery] = useState('');
  const [document, setDocument] = useState(null);

  const getDocument = async () => {
    const response = await axios.post('/getDocument', { query });
    setDocument(response.data);
  };

  const updateDocument = async () => {
    const response = await axios.put(`/updateDocument/${id}`, { /* new data */ });
    setDocument(response.data);
  };

  const deleteDocument = async () => {
    await axios.delete(`/deleteDocument/${id}`);
    setDocument(null);
  };

  return (
    <div style={{ margin: '0 auto', maxWidth: '600px', padding: '20px' }}>
      <h1>Document Page</h1>

      <input
        type="text"
        value={id}
        onChange={e => setId(e.target.value)}
        placeholder="Enter document ID"
      />

      <button onClick={updateDocument}>Update Document</button>
      <button onClick={deleteDocument}>Delete Document</button>

      <textarea
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Enter query"
      />

      <button onClick={getDocument}>Get Document</button>

      {document && (
        <div>
          <h2>Document</h2>
          <p>{JSON.stringify(document)}</p>
        </div>
      )}
    </div>
  );
};

export default DocumentPage;