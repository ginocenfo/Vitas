package com.cenfotec.vitas.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.cenfotec.vitas.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class VisitasPacienteDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(VisitasPacienteDTO.class);
        VisitasPacienteDTO visitasPacienteDTO1 = new VisitasPacienteDTO();
        visitasPacienteDTO1.setId(1L);
        VisitasPacienteDTO visitasPacienteDTO2 = new VisitasPacienteDTO();
        assertThat(visitasPacienteDTO1).isNotEqualTo(visitasPacienteDTO2);
        visitasPacienteDTO2.setId(visitasPacienteDTO1.getId());
        assertThat(visitasPacienteDTO1).isEqualTo(visitasPacienteDTO2);
        visitasPacienteDTO2.setId(2L);
        assertThat(visitasPacienteDTO1).isNotEqualTo(visitasPacienteDTO2);
        visitasPacienteDTO1.setId(null);
        assertThat(visitasPacienteDTO1).isNotEqualTo(visitasPacienteDTO2);
    }
}
