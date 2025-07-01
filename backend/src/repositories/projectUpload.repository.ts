import { db } from '../models/db';

 const projectRepo = {
  createProjectRepo: async (data: {
    projectName: string;
    state: string;
    price: number;
    description: string;
    files: string[];
  }) => {
    const query = `
      INSERT INTO public.oil_dataprojects 
      (project_name, state, price, description, uploaded_files)
      VALUES ($1, $2, $3, $4, $5)
    `;

    const pgArray = `{${data.files.map(f => `"${f}"`).join(',')}}`; // format to PostgreSQL array

    const values = [
      data.projectName,
      data.state,
      data.price,
      data.description,
      pgArray,
    ];

    await db.query(query, values);
  },

  searchProjectsRepo: async (query: string) => {
    const sql = `
      SELECT * FROM public.oil_dataprojects
      WHERE LOWER(project_name) LIKE $1 OR LOWER(state) LIKE $1
      ORDER BY created_at DESC
    `;
    const values = [`%${query.toLowerCase()}%`];
    const result = await db.query(sql, values);
    return result.rows;
  },

   getProjectByIdRepo : async (id: string) => {
  const query = `
    SELECT * FROM oil_dataprojects
    WHERE id = $1
  `;
  const result = await db.query(query, [id]);
  return result.rows[0];
},
};

export { projectRepo };