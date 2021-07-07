package com.cenfotec.vitas.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.cenfotec.vitas.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class InternamientoDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(InternamientoDTO.class);
        InternamientoDTO internamientoDTO1 = new InternamientoDTO();
        internamientoDTO1.setId(1L);
        InternamientoDTO internamientoDTO2 = new InternamientoDTO();
        assertThat(internamientoDTO1).isNotEqualTo(internamientoDTO2);
        internamientoDTO2.setId(internamientoDTO1.getId());
        assertThat(internamientoDTO1).isEqualTo(internamientoDTO2);
        internamientoDTO2.setId(2L);
        assertThat(internamientoDTO1).isNotEqualTo(internamientoDTO2);
        internamientoDTO1.setId(null);
        assertThat(internamientoDTO1).isNotEqualTo(internamientoDTO2);
    }
}
