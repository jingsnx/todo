import { useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import React, { useState, useEffect } from 'react'
import { fetchToDos, updateToDo, deleteToDo, createToDo } from '../api/todos';
import { ToDoItem } from './ToDoItem';
import { CreateToDoForm } from './CreateToDoForm';
import { Center, Text, Button, Group } from '@mantine/core';
import {v4 as uuidv4} from 'uuid'

export const ToDoList = () => {
  const queryClient=useQueryClient();
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const {data, isLoading, isFetching, isError, error} = useQuery({
    queryKey: ['todos', page],
    queryFn: () => fetchToDos(page),
  });

  //create todo
  const createToDoMutation = useMutation({
    mutationFn: createToDo,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['todos',page]})
    }
  }); 

  const handleCreate = (task) => {
    const newToDo = {
        id: uuidv4(),
        task:task,
        completed:false
      }
    createToDoMutation.mutate(newToDo);
  }

  //delete todo 
  const deleteToDoMutation = useMutation({
    mutationFn: deleteToDo,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['todos', page]})
    }
  });

  const handleDelete = (id) => {
    deleteToDoMutation.mutate(id);
  }

  //edit todo
  const editToDoMutation = useMutation({
    mutationFn: updateToDo,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['todos', page]})
    }
  });

  const handleEdit = (toDo, newTask) => {
    const updatedToDo = {
      id: toDo.id,
      task: newTask,
      completed: toDo.completed
    }
    editToDoMutation.mutate(updatedToDo);
  }

  //complete todo
  const handleComplete = (toDo, checked) => {
    const updatedToDo = {
      id: toDo.id, 
      task: toDo.task,
      completed: checked
    }
    editToDoMutation.mutate(updatedToDo);
  }

  //page management
  useEffect(() => {
    if(data && data.pages > 0){
      setMaxPage(data.pages);
      if(page>data.pages){
        setPage(data.pages);
      }
    }
  }, [data])
  return (
    <Center>
      <div>
        <Text ta='center' mt='lg'>To Do List</Text>
        <CreateToDoForm
          createToDoMutation = {createToDoMutation}
          handleCreate={handleCreate}
        />
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error: {error.message}</div>
        ) : (
          <div>
            {data && data.data?.map(
            (todo)=>
              <ToDoItem
                toDo={todo}
                key={todo.id}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleComplete={handleComplete}
              />
            )}
          </div>
        )}
        <Center>
          <Group
            mt='xs'
          >
            <Button onClick={() => setPage(data.prev)} disabled = {data && data.prev== null}>Previous</Button>
            {page}
            <Button onClick={() => setPage(data.next)} disabled={data && data.next == null}>Next</Button>
          </Group>
        </Center>
        {isFetching ? <span> Loading...</span> : null}{' '}
      </div>
    </Center>
  )
}
