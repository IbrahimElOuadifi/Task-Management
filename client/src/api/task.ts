import base from './base'
import { 
    getTaskOptions,
    getTasksOptions,
    createTaskOptions,
    updateManyTasksOptions,
    deleteTaskOptions,
    moveTaskOptions,
    copyTaskOptions,
    updateTaskTextOptions,
    updateTaskDescriptionOptions,
    updateTaskDueDateOptions,
    getTaskMembersOptions,
    updateTaskMemberOptions,
    getTaskLabelsOptions,
    updateTaskLabelOptions
} from '@interfaces/Task'

export const getTask = ({ id }: getTaskOptions) => new Promise(async (resolve, reject) => {
    try {
        const resp = await base.get(`/tasks/${id}`)
        return resolve(resp)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

export const getTasks = ({ listId }: getTasksOptions) => new Promise(async (resolve, reject) => {
    try {
      const resp = await base.get("/tasks", { listId });
      return resolve(resp);
    } catch (error) {
      console.error(error);
      reject(error);
    }
})


export const createTask = (data: createTaskOptions) => new Promise(async (resolve, reject) => {
    try {
      const resp = await base.post("/tasks", data);
      return resolve(resp);
    } catch (error) {
      console.error(error);
      reject(error);
    }
})

export const updateManyTasks = (data: updateManyTasksOptions) => new Promise(async (resolve, reject) => {
    try {
      const resp = await base.put("/tasks", data);
      return resolve(resp);
    } catch (error) {
      console.error(error);
      reject(error);
    }
})

export const deleteTask = ({ id }: deleteTaskOptions) => new Promise(async (resolve, reject) => {
    try {
      const resp = await base.del(`/tasks/${id}`);
      return resolve(resp);
    } catch (error) {
      console.error(error);
      reject(error);
    }
})

export const moveTask = ({ id, ...data }: moveTaskOptions) => new Promise(async (resolve, reject) => {
    try {
      const resp = await base.put(`/tasks/${id}/move`, data);
      return resolve(resp);
    } catch (error) {
      console.error(error);
      reject(error);
    }
})

export const copyTask = ({ id, ...data }: copyTaskOptions) => new Promise(async (resolve, reject) => {
    try {
      const resp = await base.put(`/tasks/${id}/copy`, data);
      return resolve(resp);
    } catch (error) {
      console.error(error);
      reject(error);
    }
})

export const updateTaskText = ({ id, ...data }: updateTaskTextOptions) => new Promise(async (resolve, reject) => {
    try {
      const resp = await base.put(`/tasks/${id}/text`, data);
      return resolve(resp);
    } catch (error) {
      console.error(error);
      reject(error);
    }
})

export const updateTaskDescription = ({  id, ...data }: updateTaskDescriptionOptions) => new Promise(async (resolve, reject) => {
    try {
      const resp = await base.put(`/tasks/${id}/description`, data);
      return resolve(resp);
    } catch (error) {
      console.error(error);
      reject(error);
    }
})

export const updateTaskDueDate = ({ id, ...data }: updateTaskDueDateOptions) => new Promise(async (resolve, reject) => {
    try {
      const resp = await base.put(`/tasks/${id}/dueDate`, data);
      return resolve(resp);
    } catch (error) {
      console.error(error);
      reject(error);
    }
})

export const getTaskMembers = ({ id }: getTaskMembersOptions) => new Promise(async (resolve, reject) => {
    try {
      if (!id) return resolve({ data: [] });
      const resp = await base.get(`/tasks/${id}/members`);
      return resolve(resp);
    } catch (error) {
      console.error(error);
      reject(error);
    }
})

export const updateTaskMember = ({ id, ...data }: updateTaskMemberOptions) => new Promise(async (resolve, reject) => {
    try {
      const resp = await base.put(`/tasks/${id}/members`, data);
      return resolve(resp);
    } catch (error) {
      console.error(error);
      reject(error);
    }
})

export const getTaskLabels = ({ id }: getTaskLabelsOptions) => new Promise(async (resolve, reject) => {
    try {
      if (!id) return resolve({ data: [] });
      const resp = await base.get(`/tasks/${id}/labels`);
      return resolve(resp);
    } catch (error) {
      console.error(error);
      reject(error);
    }
})

export const updateTaskLabel = ({ id, ...data }: updateTaskLabelOptions) => new Promise(async (resolve, reject) => {
    try {
      const resp = await base.put(`/tasks/${id}/labels`, data);
      return resolve(resp);
    } catch (error) {
      console.error(error);
      reject(error);
    }
})
