import {useMutation, useQueryClient} from '@tanstack/react-query';
import { createTodo, deleteTodo, updateTodo } from './api';
import { Todo } from '../types/todo';


export function useCreateTodo(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(data:Todo)=> createTodo(data),
        onMutate:()=>{
            console.log("Mutate")
        },
        onError:()=>{
            console.log("error")
        },
        onSuccess:()=>{
            console.log("success")
        },
        onSettled: async (_,error)=>{
            console.log("settled");
            if(error){
                console.log(error)
            }else{
                await queryClient.invalidateQueries({
                    queryKey:["todos"]
                })
            }
        }
    })
}


export function useUpdateTodo(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(data:Todo)=> updateTodo(data),
        onSettled: async (_,error,variable)=>{
            console.log("settled");
            if(error){
                console.log(error)
            }else{
                await queryClient.invalidateQueries({
                    queryKey:["todos"]
                })
                await queryClient.invalidateQueries({
                    queryKey:["todo", {id:variable.id}]
                })
            }
        }
    })
}

export function useDeleteTodo() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (id: number) => deleteTodo(id),
  
      onSuccess: () => {
        console.log("deleted successfully");
      },
  
      onSettled: async (_, error) => {
        if (error) {
          console.log(error);
        } else {
          await queryClient.invalidateQueries({ queryKey: ["todos"] });
        }
      },
    });
  }