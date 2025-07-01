import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProjectById } from '../services/api';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchProjectById(id || '');
      if (result.project) setProject(result.project);
    };
    getData();
  }, [id]);

  if (!project) return <div className="text-center mt-10 text-red-500">Loading project...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{project.project_name}</h2>
      <p><strong>State:</strong> {project.state}</p>
      <p><strong>Price:</strong> ₹{project.price}</p>
      <p><strong>Description:</strong> {project.description}</p>

      <h3 className="text-xl font-semibold mt-6 mb-2">📄 Files</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {project.uploaded_files?.map((file: string, i: number) => (
          <div key={i} className="border rounded p-4 shadow">
            <iframe src={`http://localhost:4000/${file}`} className="w-full h-64" />
            <a href={`http://localhost:4000/${file}`} download className="block mt-2 text-blue-600 hover:underline text-sm">⬇ Download</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetails;
