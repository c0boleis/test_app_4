package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.TaskLink;
import com.mycompany.myapp.repository.TaskLinkRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.TaskLink}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TaskLinkResource {

    private final Logger log = LoggerFactory.getLogger(TaskLinkResource.class);

    private static final String ENTITY_NAME = "taskLink";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TaskLinkRepository taskLinkRepository;

    public TaskLinkResource(TaskLinkRepository taskLinkRepository) {
        this.taskLinkRepository = taskLinkRepository;
    }

    /**
     * {@code POST  /task-links} : Create a new taskLink.
     *
     * @param taskLink the taskLink to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new taskLink, or with status {@code 400 (Bad Request)} if the taskLink has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/task-links")
    public ResponseEntity<TaskLink> createTaskLink(@RequestBody TaskLink taskLink) throws URISyntaxException {
        log.debug("REST request to save TaskLink : {}", taskLink);
        if (taskLink.getId() != null) {
            throw new BadRequestAlertException("A new taskLink cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TaskLink result = taskLinkRepository.save(taskLink);
        return ResponseEntity
            .created(new URI("/api/task-links/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /task-links/:id} : Updates an existing taskLink.
     *
     * @param id the id of the taskLink to save.
     * @param taskLink the taskLink to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated taskLink,
     * or with status {@code 400 (Bad Request)} if the taskLink is not valid,
     * or with status {@code 500 (Internal Server Error)} if the taskLink couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/task-links/{id}")
    public ResponseEntity<TaskLink> updateTaskLink(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TaskLink taskLink
    ) throws URISyntaxException {
        log.debug("REST request to update TaskLink : {}, {}", id, taskLink);
        if (taskLink.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, taskLink.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!taskLinkRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TaskLink result = taskLinkRepository.save(taskLink);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, taskLink.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /task-links/:id} : Partial updates given fields of an existing taskLink, field will ignore if it is null
     *
     * @param id the id of the taskLink to save.
     * @param taskLink the taskLink to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated taskLink,
     * or with status {@code 400 (Bad Request)} if the taskLink is not valid,
     * or with status {@code 404 (Not Found)} if the taskLink is not found,
     * or with status {@code 500 (Internal Server Error)} if the taskLink couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/task-links/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<TaskLink> partialUpdateTaskLink(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TaskLink taskLink
    ) throws URISyntaxException {
        log.debug("REST request to partial update TaskLink partially : {}, {}", id, taskLink);
        if (taskLink.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, taskLink.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!taskLinkRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TaskLink> result = taskLinkRepository
            .findById(taskLink.getId())
            .map(
                existingTaskLink -> {
                    return existingTaskLink;
                }
            )
            .map(taskLinkRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, taskLink.getId().toString())
        );
    }

    /**
     * {@code GET  /task-links} : get all the taskLinks.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of taskLinks in body.
     */
    @GetMapping("/task-links")
    public List<TaskLink> getAllTaskLinks() {
        log.debug("REST request to get all TaskLinks");
        return taskLinkRepository.findAll();
    }

    /**
     * {@code GET  /task-links/:id} : get the "id" taskLink.
     *
     * @param id the id of the taskLink to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the taskLink, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/task-links/{id}")
    public ResponseEntity<TaskLink> getTaskLink(@PathVariable Long id) {
        log.debug("REST request to get TaskLink : {}", id);
        Optional<TaskLink> taskLink = taskLinkRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(taskLink);
    }

    /**
     * {@code DELETE  /task-links/:id} : delete the "id" taskLink.
     *
     * @param id the id of the taskLink to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/task-links/{id}")
    public ResponseEntity<Void> deleteTaskLink(@PathVariable Long id) {
        log.debug("REST request to delete TaskLink : {}", id);
        taskLinkRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
