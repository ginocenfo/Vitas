package com.cenfotec.vitas.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class VisitasPacienteMapperTest {

    private VisitasPacienteMapper visitasPacienteMapper;

    @BeforeEach
    public void setUp() {
        visitasPacienteMapper = new VisitasPacienteMapperImpl();
    }
}
