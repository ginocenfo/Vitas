package com.cenfotec.vitas.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class InternamientoMapperTest {

    private InternamientoMapper internamientoMapper;

    @BeforeEach
    public void setUp() {
        internamientoMapper = new InternamientoMapperImpl();
    }
}
