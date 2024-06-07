package com.project01.tms.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType
            .IDENTITY)
    private Integer id;
    private String title;
    private String description;
    @Enumerated(EnumType.STRING)
    private Status status;
    private Integer assignedTo;
    private Integer createdBy;
    @Column(name = "created_at", columnDefinition = "DATETIME")
    private Date createdAt;
    @Column(name = "updated_at", columnDefinition = "DATETIME")
    private Date updatedAt;

    public enum Status {
        PENDING, IN_PROGRESS, COMPLETED
    }
    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
        if (this.status == null) {
            this.status = Status.PENDING;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Date();
    }
}
