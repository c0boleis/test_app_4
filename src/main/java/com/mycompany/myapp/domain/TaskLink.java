package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;

/**
 * A TaskLink.
 */
@Entity
@Table(name = "task_link")
public class TaskLink implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties(value = { "outLinks", "inLinks" }, allowSetters = true)
    private Task startTask;

    @ManyToOne
    @JsonIgnoreProperties(value = { "outLinks", "inLinks" }, allowSetters = true)
    private Task endTask;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TaskLink id(Long id) {
        this.id = id;
        return this;
    }

    public Task getStartTask() {
        return this.startTask;
    }

    public TaskLink startTask(Task task) {
        this.setStartTask(task);
        return this;
    }

    public void setStartTask(Task task) {
        this.startTask = task;
    }

    public Task getEndTask() {
        return this.endTask;
    }

    public TaskLink endTask(Task task) {
        this.setEndTask(task);
        return this;
    }

    public void setEndTask(Task task) {
        this.endTask = task;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TaskLink)) {
            return false;
        }
        return id != null && id.equals(((TaskLink) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TaskLink{" +
            "id=" + getId() +
            "}";
    }
}
