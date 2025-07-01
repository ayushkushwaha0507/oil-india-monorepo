import e from 'express';
import { projectRepo } from '../repositories/projectUpload.repository';

interface ProjectPayload {
  projectName: string;
  state: string;
  price: number;
  description: string;
  files: string[];
}

 const projectService = {
  createProjectService: async (data: ProjectPayload) => {
    return await projectRepo.createProjectRepo(data);
  },

  searchProjectsService: async (query: string) => {
    if (!query || query.trim() === '') {
      throw new Error('Search query cannot be empty');
    }
    return await projectRepo.searchProjectsRepo(query);
  },

getProjectByIdService: async (id: string) => {
  return await projectRepo.getProjectByIdRepo(id);
}


};

export { projectService };