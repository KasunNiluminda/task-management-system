package com.project01.tms.service;

import com.project01.tms.model.Task;
import com.project01.tms.repository.TaskRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();

    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Task updateTask(Task task) {
        return taskRepository.save(task);
    }

    public Task updateTaskStatus(Integer id, Task.Status status) {
        Task taskToUpdate = getTaskById(id);
        if (taskToUpdate != null) {
            taskToUpdate.setStatus(status);
            return updateTask(taskToUpdate);
        } else {
            // Handle task not found
            return null;
        }
    }
    public Task getTaskDetailById(Integer id){

        return taskRepository.findTaskById(id);
    }
    public Task getTaskById(Integer id) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        return optionalTask.orElse(null);
    }

    public void deleteTask(Integer id) {
        taskRepository.deleteById(id);
    }
}
