package com.project01.tms.repository;

import com.project01.tms.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task,Integer> {
    @Query("SELECT t FROM Task t WHERE t.id = :id")
    Task findTaskById(Integer id);
}
