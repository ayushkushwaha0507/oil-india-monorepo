import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectManager: React.FC = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    state: '',
    price: '',
    description: '',
  });
  const [files, setFiles] = useState<FileList | null>(null);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));
    if (files) Array.from(files).forEach(file => form.append('files', file));

    const token = localStorage.getItem('authToken');

    try {
      const res = await fetch('http://localhost:4000/api/files/project', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token || ''}`,
        },
        body: form,
      });

      const result = await res.json();
      setMessage(res.ok ? '✅ Project uploaded successfully!' : result.error || '❌ Upload failed.');
      if (res.ok) {
        setFormData({ projectName: '', state: '', price: '', description: '' });
        setFiles(null);
      }
    } catch (err) {
      console.error('Upload error:', err);
      setMessage('Something went wrong');
    }
  };

  const handleSearch = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const res = await fetch(`http://localhost:4000/api/files/project/search?query=${encodeURIComponent(search)}`, {
        headers: { Authorization: `Bearer ${token || ''}` },
      });
      const result = await res.json();
      if (res.ok) setSearchResults(result.data);
      else console.error('Search failed');
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Upload Project Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">📤 Upload Project</h2>
        {message && <p className="mb-4 text-blue-600 font-semibold">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="projectName" placeholder="Project Name" value={formData.projectName} onChange={handleChange} className="w-full border px-4 py-2 rounded" required />
          <input name="state" placeholder="State" value={formData.state} onChange={handleChange} className="w-full border px-4 py-2 rounded" required />
          <input name="price" placeholder="Price" type="number" value={formData.price} onChange={handleChange} className="w-full border px-4 py-2 rounded" required />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} rows={3} className="w-full border px-4 py-2 rounded" />
          <input type="file" name="files" multiple accept=".pdf,image/*" onChange={handleFileChange} className="w-full border px-2 py-2 rounded" />
          <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">Submit</button>
        </form>
      </div>

      {/* Project Search */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">🔍 Search Projects</h2>
        <input type="text" placeholder="Search by name or state" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full border px-4 py-2 rounded mb-4" />
        <button onClick={handleSearch} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mb-4">Search</button>
        <ul className="space-y-3">
          {searchResults.map((project, i) => (
            <li key={i} className="border p-3 rounded shadow-sm">
              <h4 className="font-semibold">{project.project_name}</h4>
              <p className="text-sm text-gray-600">{project.state}</p>
              <button
                onClick={() => navigate(`/project/${project.id}`)}
                className="mt-2 inline-block text-blue-600 hover:underline text-sm"
              >
                View Details →
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectManager;
