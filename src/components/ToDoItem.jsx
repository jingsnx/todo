import React, {useState} from 'react'
import { Flex, Checkbox, Button, Text, Group, Container, Modal, TextInput } from '@mantine/core'
import { MdDelete,MdEdit } from "react-icons/md";
import { useDisclosure } from '@mantine/hooks';

export const ToDoItem = ({toDo, handleDelete, handleEdit, handleComplete}) => {
    const [checked, setChecked] = useState(toDo.completed);
    const [opened, {open, close}] = useDisclosure(false);
    const [value, setValue] = useState(toDo.task);

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleEditHelper = (e) => {
        e.preventDefault();
        handleEdit(toDo, value);
    }

    const handleCompleteHelper = (e) => {
        setChecked(e.currentTarget.checked);
        handleComplete(toDo, e.currentTarget.checked);
    }
  return (
    <Flex
        align='center'
        pt='sm'
        gap='xs'
    >
        <Checkbox
            defaultChecked={checked}
            onChange={handleCompleteHelper}
        />
        <Container>
            <Text td={`${checked ? "line-through" : "none"}`}>{toDo.task}</Text>
        </Container>
        <Group
            gap='xs'
        >
            <Modal
                opened={opened} 
                onClose={close}
                centered
            >
                <form onSubmit={handleEditHelper}>
                    <TextInput
                        placeholder='Edit task'
                        value={value}
                        onChange={handleChange}
                    />
                    <Button mt='sm' type='submit'>
                        Save Changes
                    </Button>
                </form>
            </Modal>
            <Button onClick={open}><MdEdit/></Button>
            <Button onClick={()=> handleDelete(toDo.id)}><MdDelete/> </Button>
        </Group>
    </Flex>
  )
}
