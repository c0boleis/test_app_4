package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.TaskLink;
import com.mycompany.myapp.repository.TaskLinkRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link TaskLinkResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TaskLinkResourceIT {

    private static final String ENTITY_API_URL = "/api/task-links";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TaskLinkRepository taskLinkRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTaskLinkMockMvc;

    private TaskLink taskLink;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TaskLink createEntity(EntityManager em) {
        TaskLink taskLink = new TaskLink();
        return taskLink;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TaskLink createUpdatedEntity(EntityManager em) {
        TaskLink taskLink = new TaskLink();
        return taskLink;
    }

    @BeforeEach
    public void initTest() {
        taskLink = createEntity(em);
    }

    @Test
    @Transactional
    void createTaskLink() throws Exception {
        int databaseSizeBeforeCreate = taskLinkRepository.findAll().size();
        // Create the TaskLink
        restTaskLinkMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(taskLink)))
            .andExpect(status().isCreated());

        // Validate the TaskLink in the database
        List<TaskLink> taskLinkList = taskLinkRepository.findAll();
        assertThat(taskLinkList).hasSize(databaseSizeBeforeCreate + 1);
        TaskLink testTaskLink = taskLinkList.get(taskLinkList.size() - 1);
    }

    @Test
    @Transactional
    void createTaskLinkWithExistingId() throws Exception {
        // Create the TaskLink with an existing ID
        taskLink.setId(1L);

        int databaseSizeBeforeCreate = taskLinkRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTaskLinkMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(taskLink)))
            .andExpect(status().isBadRequest());

        // Validate the TaskLink in the database
        List<TaskLink> taskLinkList = taskLinkRepository.findAll();
        assertThat(taskLinkList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllTaskLinks() throws Exception {
        // Initialize the database
        taskLinkRepository.saveAndFlush(taskLink);

        // Get all the taskLinkList
        restTaskLinkMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(taskLink.getId().intValue())));
    }

    @Test
    @Transactional
    void getTaskLink() throws Exception {
        // Initialize the database
        taskLinkRepository.saveAndFlush(taskLink);

        // Get the taskLink
        restTaskLinkMockMvc
            .perform(get(ENTITY_API_URL_ID, taskLink.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(taskLink.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingTaskLink() throws Exception {
        // Get the taskLink
        restTaskLinkMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewTaskLink() throws Exception {
        // Initialize the database
        taskLinkRepository.saveAndFlush(taskLink);

        int databaseSizeBeforeUpdate = taskLinkRepository.findAll().size();

        // Update the taskLink
        TaskLink updatedTaskLink = taskLinkRepository.findById(taskLink.getId()).get();
        // Disconnect from session so that the updates on updatedTaskLink are not directly saved in db
        em.detach(updatedTaskLink);

        restTaskLinkMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTaskLink.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTaskLink))
            )
            .andExpect(status().isOk());

        // Validate the TaskLink in the database
        List<TaskLink> taskLinkList = taskLinkRepository.findAll();
        assertThat(taskLinkList).hasSize(databaseSizeBeforeUpdate);
        TaskLink testTaskLink = taskLinkList.get(taskLinkList.size() - 1);
    }

    @Test
    @Transactional
    void putNonExistingTaskLink() throws Exception {
        int databaseSizeBeforeUpdate = taskLinkRepository.findAll().size();
        taskLink.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTaskLinkMockMvc
            .perform(
                put(ENTITY_API_URL_ID, taskLink.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(taskLink))
            )
            .andExpect(status().isBadRequest());

        // Validate the TaskLink in the database
        List<TaskLink> taskLinkList = taskLinkRepository.findAll();
        assertThat(taskLinkList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTaskLink() throws Exception {
        int databaseSizeBeforeUpdate = taskLinkRepository.findAll().size();
        taskLink.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTaskLinkMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(taskLink))
            )
            .andExpect(status().isBadRequest());

        // Validate the TaskLink in the database
        List<TaskLink> taskLinkList = taskLinkRepository.findAll();
        assertThat(taskLinkList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTaskLink() throws Exception {
        int databaseSizeBeforeUpdate = taskLinkRepository.findAll().size();
        taskLink.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTaskLinkMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(taskLink)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the TaskLink in the database
        List<TaskLink> taskLinkList = taskLinkRepository.findAll();
        assertThat(taskLinkList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTaskLinkWithPatch() throws Exception {
        // Initialize the database
        taskLinkRepository.saveAndFlush(taskLink);

        int databaseSizeBeforeUpdate = taskLinkRepository.findAll().size();

        // Update the taskLink using partial update
        TaskLink partialUpdatedTaskLink = new TaskLink();
        partialUpdatedTaskLink.setId(taskLink.getId());

        restTaskLinkMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTaskLink.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTaskLink))
            )
            .andExpect(status().isOk());

        // Validate the TaskLink in the database
        List<TaskLink> taskLinkList = taskLinkRepository.findAll();
        assertThat(taskLinkList).hasSize(databaseSizeBeforeUpdate);
        TaskLink testTaskLink = taskLinkList.get(taskLinkList.size() - 1);
    }

    @Test
    @Transactional
    void fullUpdateTaskLinkWithPatch() throws Exception {
        // Initialize the database
        taskLinkRepository.saveAndFlush(taskLink);

        int databaseSizeBeforeUpdate = taskLinkRepository.findAll().size();

        // Update the taskLink using partial update
        TaskLink partialUpdatedTaskLink = new TaskLink();
        partialUpdatedTaskLink.setId(taskLink.getId());

        restTaskLinkMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTaskLink.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTaskLink))
            )
            .andExpect(status().isOk());

        // Validate the TaskLink in the database
        List<TaskLink> taskLinkList = taskLinkRepository.findAll();
        assertThat(taskLinkList).hasSize(databaseSizeBeforeUpdate);
        TaskLink testTaskLink = taskLinkList.get(taskLinkList.size() - 1);
    }

    @Test
    @Transactional
    void patchNonExistingTaskLink() throws Exception {
        int databaseSizeBeforeUpdate = taskLinkRepository.findAll().size();
        taskLink.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTaskLinkMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, taskLink.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(taskLink))
            )
            .andExpect(status().isBadRequest());

        // Validate the TaskLink in the database
        List<TaskLink> taskLinkList = taskLinkRepository.findAll();
        assertThat(taskLinkList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTaskLink() throws Exception {
        int databaseSizeBeforeUpdate = taskLinkRepository.findAll().size();
        taskLink.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTaskLinkMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(taskLink))
            )
            .andExpect(status().isBadRequest());

        // Validate the TaskLink in the database
        List<TaskLink> taskLinkList = taskLinkRepository.findAll();
        assertThat(taskLinkList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTaskLink() throws Exception {
        int databaseSizeBeforeUpdate = taskLinkRepository.findAll().size();
        taskLink.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTaskLinkMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(taskLink)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the TaskLink in the database
        List<TaskLink> taskLinkList = taskLinkRepository.findAll();
        assertThat(taskLinkList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTaskLink() throws Exception {
        // Initialize the database
        taskLinkRepository.saveAndFlush(taskLink);

        int databaseSizeBeforeDelete = taskLinkRepository.findAll().size();

        // Delete the taskLink
        restTaskLinkMockMvc
            .perform(delete(ENTITY_API_URL_ID, taskLink.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TaskLink> taskLinkList = taskLinkRepository.findAll();
        assertThat(taskLinkList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
