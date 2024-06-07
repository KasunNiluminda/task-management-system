package com.project01.tms.controller;

import com.project01.tms.model.Task;
import com.project01.tms.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/tasks")
@CrossOrigin
public class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Integer id, @RequestBody Task task) {
        task.setId(id);
        task.setTitle(taskService.getTaskDetailById(id).getTitle());
        task.setDescription(taskService.getTaskDetailById(id).getDescription());
        task.setAssignedTo(taskService.getTaskDetailById(id).getAssignedTo());
        task.setCreatedBy(taskService.getTaskDetailById(id).getCreatedBy());
        return taskService.updateTask(task);
    }
//    @PutMapping("/{id}")
//    public Task updateTaskStatus(@PathVariable Integer id, @RequestParam Task.Status status) {
//        System.out.println("task");
//        return taskService.updateTaskStatus(id, status);
//    }


    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Integer id) {
        taskService.deleteTask(id);
    }
}
