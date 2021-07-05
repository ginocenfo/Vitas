package com.cenfotec.vitas.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.cenfotec.vitas.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class VisitasPacienteTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VisitasPaciente.class);
        VisitasPaciente visitasPaciente1 = new VisitasPaciente();
        visitasPaciente1.setId(1L);
        VisitasPaciente visitasPaciente2 = new VisitasPaciente();
        visitasPaciente2.setId(visitasPaciente1.getId());
        assertThat(visitasPaciente1).isEqualTo(visitasPaciente2);
        visitasPaciente2.setId(2L);
        assertThat(visitasPaciente1).isNotEqualTo(visitasPaciente2);
        visitasPaciente1.setId(null);
        assertThat(visitasPaciente1).isNotEqualTo(visitasPaciente2);
    }
}
