package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TaskLinkTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TaskLink.class);
        TaskLink taskLink1 = new TaskLink();
        taskLink1.setId(1L);
        TaskLink taskLink2 = new TaskLink();
        taskLink2.setId(taskLink1.getId());
        assertThat(taskLink1).isEqualTo(taskLink2);
        taskLink2.setId(2L);
        assertThat(taskLink1).isNotEqualTo(taskLink2);
        taskLink1.setId(null);
        assertThat(taskLink1).isNotEqualTo(taskLink2);
    }
}
