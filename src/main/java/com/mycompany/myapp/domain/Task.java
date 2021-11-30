package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A Task.
 */
@Entity
@Table(name = "task")
public class Task implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "task_name")
    private String taskName;

    @Column(name = "start_time")
    private LocalDate startTime;

    @Column(name = "end_time")
    private LocalDate endTime;

    @OneToMany(mappedBy = "startTask")
    @JsonIgnoreProperties(value = { "startTask", "endTask" }, allowSetters = true)
    private Set<TaskLink> outLinks = new HashSet<>();

    @OneToMany(mappedBy = "endTask")
    @JsonIgnoreProperties(value = { "startTask", "endTask" }, allowSetters = true)
    private Set<TaskLink> inLinks = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Task id(Long id) {
        this.id = id;
        return this;
    }

    public String getTaskName() {
        return this.taskName;
    }

    public Task taskName(String taskName) {
        this.taskName = taskName;
        return this;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public LocalDate getStartTime() {
        return this.startTime;
    }

    public Task startTime(LocalDate startTime) {
        this.startTime = startTime;
        return this;
    }

    public void setStartTime(LocalDate startTime) {
        this.startTime = startTime;
    }

    public LocalDate getEndTime() {
        return this.endTime;
    }

    public Task endTime(LocalDate endTime) {
        this.endTime = endTime;
        return this;
    }

    public void setEndTime(LocalDate endTime) {
        this.endTime = endTime;
    }

    public Set<TaskLink> getOutLinks() {
        return this.outLinks;
    }

    public Task outLinks(Set<TaskLink> taskLinks) {
        this.setOutLinks(taskLinks);
        return this;
    }

    public Task addOutLinks(TaskLink taskLink) {
        this.outLinks.add(taskLink);
        taskLink.setStartTask(this);
        return this;
    }

    public Task removeOutLinks(TaskLink taskLink) {
        this.outLinks.remove(taskLink);
        taskLink.setStartTask(null);
        return this;
    }

    public void setOutLinks(Set<TaskLink> taskLinks) {
        if (this.outLinks != null) {
            this.outLinks.forEach(i -> i.setStartTask(null));
        }
        if (taskLinks != null) {
            taskLinks.forEach(i -> i.setStartTask(this));
        }
        this.outLinks = taskLinks;
    }

    public Set<TaskLink> getInLinks() {
        return this.inLinks;
    }

    public Task inLinks(Set<TaskLink> taskLinks) {
        this.setInLinks(taskLinks);
        return this;
    }

    public Task addInLinks(TaskLink taskLink) {
        this.inLinks.add(taskLink);
        taskLink.setEndTask(this);
        return this;
    }

    public Task removeInLinks(TaskLink taskLink) {
        this.inLinks.remove(taskLink);
        taskLink.setEndTask(null);
        return this;
    }

    public void setInLinks(Set<TaskLink> taskLinks) {
        if (this.inLinks != null) {
            this.inLinks.forEach(i -> i.setEndTask(null));
        }
        if (taskLinks != null) {
            taskLinks.forEach(i -> i.setEndTask(this));
        }
        this.inLinks = taskLinks;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Task)) {
            return false;
        }
        return id != null && id.equals(((Task) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Task{" +
            "id=" + getId() +
            ", taskName='" + getTaskName() + "'" +
            ", startTime='" + getStartTime() + "'" +
            ", endTime='" + getEndTime() + "'" +
            "}";
    }
}
