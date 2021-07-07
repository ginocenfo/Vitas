package com.cenfotec.vitas.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.cenfotec.vitas.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class InternamientoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Internamiento.class);
        Internamiento internamiento1 = new Internamiento();
        internamiento1.setId(1L);
        Internamiento internamiento2 = new Internamiento();
        internamiento2.setId(internamiento1.getId());
        assertThat(internamiento1).isEqualTo(internamiento2);
        internamiento2.setId(2L);
        assertThat(internamiento1).isNotEqualTo(internamiento2);
        internamiento1.setId(null);
        assertThat(internamiento1).isNotEqualTo(internamiento2);
    }
}
