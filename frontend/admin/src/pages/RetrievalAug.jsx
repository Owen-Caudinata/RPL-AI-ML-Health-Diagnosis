import React, { useState } from 'react';
import axios from 'axios';
import './DocumentPage.css'; // Importing a CSS file

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
    <div className="document-page">
      <h1>Document Page</h1>

      <input
        className="input-field"
        type="text"
        value={id}
        onChange={e => setId(e.target.value)}
        placeholder="Enter document ID"
      />

      <button className="button" onClick={updateDocument}>Update Document</button>
      <button className="button" onClick={deleteDocument}>Delete Document</button>

      <textarea
        className="input-field"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Enter query"
      />

      <button className="button" onClick={getDocument}>Get Document</button>

      {document && (
        <div className="document-display">
          <h2>Document</h2>
          <p>{JSON.stringify(document)}</p>
        </div>
      )}
    </div>
  );
};

export default DocumentPage;