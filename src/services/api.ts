import axios from 'axios';
import {Todo} from "../types/todo"

const BASE_URL = "http://localhost:3000";
const axiosInstance = axios.create({baseURL:BASE_URL});

export const getTodosIds = async () => {
    // 
     // Make the Axios GET request and wait for it to resolve
    // const response = await axiosInstance.get<Todo[]>("todos");
    
    // Extract the data (an array of todos) from the response
    // const todos = response.data;
    
    // Map over the array to extract the IDs
    // const todoIds = todos.map((todo) => todo.id);
    
    // Return the array of IDs
    // return todoIds;

    // 

    return (await axiosInstance.get<Todo[]>("todos")).data.map((todo)=>todo.id)
}

export const getTodo = async (id:number)=>{
    return (await axiosInstance.get<Todo>(`todos/${id}`)).data

}

export const createTodo = async (data:Todo) => {
    return await axiosInstance.post('todos',data)
}

export const updateTodo = async (data:Todo) => {
    await axiosInstance.put(`todos/${data.id}`,data)
}