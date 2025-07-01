import { Request, Response } from 'express';
import { projectService } from '../services/project.service';

const fileUploadController = {
  createProjectController: async (req: Request, res: Response) => {
    try {
      const { projectName, state, price, description } = req.body;
      const files = req.files as Express.Multer.File[];
      const filePaths = files.map(f => f.path);

      await projectService.createProjectService({
        projectName,
        state,
        price: Number(price),
        description,
        files: filePaths,
      });

      res.status(201).json({ message: 'Project created successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create project' });
    }
  },

  searchProjectsController: async (req: Request, res: Response) => {
    try {
      const query = req.query.query as string;
      const data = await projectService.searchProjectsService(query);
      res.status(200).json({ data });
    } catch (error: any) {
      console.error('Search error:', error.message);
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  },

getProjectByIdController: async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await projectService.getProjectByIdService(id); // NOTE: keep as string, UUIDs are strings

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json({ project });
  } catch (err: any) {
    console.error('Error fetching project by ID:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
}

};

export { fileUploadController };