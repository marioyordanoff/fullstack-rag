'use client';

import { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

export default function Home() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/chat', { message: input });
      setResponse(res.data.answer);
    } catch (error) {
      console.error('Error:', error);
      setResponse('An error occurred while fetching the response.');
    }
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <form onSubmit={handleSubmit}>
          <div className="mt-5 sm:flex sm:items-center">
            <div className="w-full sm:max-w-xs">
              <label htmlFor="query" className="sr-only">
                Query
              </label>
              <input
                type="text"
                name="query"
                id="query"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter your query"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Submit
            </button>
          </div>
        </form>
        {response && (
          <div className="mt-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Response:</h3>
            <div className="mt-2 text-sm text-gray-500">
              <ReactMarkdown>{response}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}