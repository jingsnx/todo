import { Button, TextInput, Center } from '@mantine/core'
import React, { useState } from 'react'

export const CreateToDoForm = ({handleCreate}) => {
    const [value, setValue] = useState("");

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCreate(value)
        setValue("");
    }

  return (
    <form onSubmit={handleSubmit}>
        <Center
            mt='sm'
        >
            <TextInput
                mr='sm'
                size='sm'
                placeholder='Create a new task'
                onChange={handleChange}
                value={value}
            />
            <Button type='submit'>Add Task</Button>
        </Center>
    </form>
  )
}
