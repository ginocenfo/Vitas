package com.cenfotec.vitas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.cenfotec.vitas.IntegrationTest;
import com.cenfotec.vitas.domain.VisitasPaciente;
import com.cenfotec.vitas.repository.VisitasPacienteRepository;
import com.cenfotec.vitas.service.dto.VisitasPacienteDTO;
import com.cenfotec.vitas.service.mapper.VisitasPacienteMapper;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
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
 * Integration tests for the {@link VisitasPacienteResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class VisitasPacienteResourceIT {

    private static final Instant DEFAULT_HORA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_HORA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Double DEFAULT_DURACION = 1D;
    private static final Double UPDATED_DURACION = 2D;

    private static final String ENTITY_API_URL = "/api/visitas-pacientes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private VisitasPacienteRepository visitasPacienteRepository;

    @Autowired
    private VisitasPacienteMapper visitasPacienteMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restVisitasPacienteMockMvc;

    private VisitasPaciente visitasPaciente;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VisitasPaciente createEntity(EntityManager em) {
        VisitasPaciente visitasPaciente = new VisitasPaciente().hora(DEFAULT_HORA).duracion(DEFAULT_DURACION);
        return visitasPaciente;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VisitasPaciente createUpdatedEntity(EntityManager em) {
        VisitasPaciente visitasPaciente = new VisitasPaciente().hora(UPDATED_HORA).duracion(UPDATED_DURACION);
        return visitasPaciente;
    }

    @BeforeEach
    public void initTest() {
        visitasPaciente = createEntity(em);
    }

    @Test
    @Transactional
    void createVisitasPaciente() throws Exception {
        int databaseSizeBeforeCreate = visitasPacienteRepository.findAll().size();
        // Create the VisitasPaciente
        VisitasPacienteDTO visitasPacienteDTO = visitasPacienteMapper.toDto(visitasPaciente);
        restVisitasPacienteMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(visitasPacienteDTO))
            )
            .andExpect(status().isCreated());

        // Validate the VisitasPaciente in the database
        List<VisitasPaciente> visitasPacienteList = visitasPacienteRepository.findAll();
        assertThat(visitasPacienteList).hasSize(databaseSizeBeforeCreate + 1);
        VisitasPaciente testVisitasPaciente = visitasPacienteList.get(visitasPacienteList.size() - 1);
        assertThat(testVisitasPaciente.getHora()).isEqualTo(DEFAULT_HORA);
        assertThat(testVisitasPaciente.getDuracion()).isEqualTo(DEFAULT_DURACION);
    }

    @Test
    @Transactional
    void createVisitasPacienteWithExistingId() throws Exception {
        // Create the VisitasPaciente with an existing ID
        visitasPaciente.setId(1L);
        VisitasPacienteDTO visitasPacienteDTO = visitasPacienteMapper.toDto(visitasPaciente);

        int databaseSizeBeforeCreate = visitasPacienteRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restVisitasPacienteMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(visitasPacienteDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the VisitasPaciente in the database
        List<VisitasPaciente> visitasPacienteList = visitasPacienteRepository.findAll();
        assertThat(visitasPacienteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllVisitasPacientes() throws Exception {
        // Initialize the database
        visitasPacienteRepository.saveAndFlush(visitasPaciente);

        // Get all the visitasPacienteList
        restVisitasPacienteMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(visitasPaciente.getId().intValue())))
            .andExpect(jsonPath("$.[*].hora").value(hasItem(DEFAULT_HORA.toString())))
            .andExpect(jsonPath("$.[*].duracion").value(hasItem(DEFAULT_DURACION.doubleValue())));
    }

    @Test
    @Transactional
    void getVisitasPaciente() throws Exception {
        // Initialize the database
        visitasPacienteRepository.saveAndFlush(visitasPaciente);

        // Get the visitasPaciente
        restVisitasPacienteMockMvc
            .perform(get(ENTITY_API_URL_ID, visitasPaciente.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(visitasPaciente.getId().intValue()))
            .andExpect(jsonPath("$.hora").value(DEFAULT_HORA.toString()))
            .andExpect(jsonPath("$.duracion").value(DEFAULT_DURACION.doubleValue()));
    }

    @Test
    @Transactional
    void getNonExistingVisitasPaciente() throws Exception {
        // Get the visitasPaciente
        restVisitasPacienteMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewVisitasPaciente() throws Exception {
        // Initialize the database
        visitasPacienteRepository.saveAndFlush(visitasPaciente);

        int databaseSizeBeforeUpdate = visitasPacienteRepository.findAll().size();

        // Update the visitasPaciente
        VisitasPaciente updatedVisitasPaciente = visitasPacienteRepository.findById(visitasPaciente.getId()).get();
        // Disconnect from session so that the updates on updatedVisitasPaciente are not directly saved in db
        em.detach(updatedVisitasPaciente);
        updatedVisitasPaciente.hora(UPDATED_HORA).duracion(UPDATED_DURACION);
        VisitasPacienteDTO visitasPacienteDTO = visitasPacienteMapper.toDto(updatedVisitasPaciente);

        restVisitasPacienteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, visitasPacienteDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(visitasPacienteDTO))
            )
            .andExpect(status().isOk());

        // Validate the VisitasPaciente in the database
        List<VisitasPaciente> visitasPacienteList = visitasPacienteRepository.findAll();
        assertThat(visitasPacienteList).hasSize(databaseSizeBeforeUpdate);
        VisitasPaciente testVisitasPaciente = visitasPacienteList.get(visitasPacienteList.size() - 1);
        assertThat(testVisitasPaciente.getHora()).isEqualTo(UPDATED_HORA);
        assertThat(testVisitasPaciente.getDuracion()).isEqualTo(UPDATED_DURACION);
    }

    @Test
    @Transactional
    void putNonExistingVisitasPaciente() throws Exception {
        int databaseSizeBeforeUpdate = visitasPacienteRepository.findAll().size();
        visitasPaciente.setId(count.incrementAndGet());

        // Create the VisitasPaciente
        VisitasPacienteDTO visitasPacienteDTO = visitasPacienteMapper.toDto(visitasPaciente);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVisitasPacienteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, visitasPacienteDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(visitasPacienteDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the VisitasPaciente in the database
        List<VisitasPaciente> visitasPacienteList = visitasPacienteRepository.findAll();
        assertThat(visitasPacienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchVisitasPaciente() throws Exception {
        int databaseSizeBeforeUpdate = visitasPacienteRepository.findAll().size();
        visitasPaciente.setId(count.incrementAndGet());

        // Create the VisitasPaciente
        VisitasPacienteDTO visitasPacienteDTO = visitasPacienteMapper.toDto(visitasPaciente);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVisitasPacienteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(visitasPacienteDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the VisitasPaciente in the database
        List<VisitasPaciente> visitasPacienteList = visitasPacienteRepository.findAll();
        assertThat(visitasPacienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamVisitasPaciente() throws Exception {
        int databaseSizeBeforeUpdate = visitasPacienteRepository.findAll().size();
        visitasPaciente.setId(count.incrementAndGet());

        // Create the VisitasPaciente
        VisitasPacienteDTO visitasPacienteDTO = visitasPacienteMapper.toDto(visitasPaciente);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVisitasPacienteMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(visitasPacienteDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the VisitasPaciente in the database
        List<VisitasPaciente> visitasPacienteList = visitasPacienteRepository.findAll();
        assertThat(visitasPacienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateVisitasPacienteWithPatch() throws Exception {
        // Initialize the database
        visitasPacienteRepository.saveAndFlush(visitasPaciente);

        int databaseSizeBeforeUpdate = visitasPacienteRepository.findAll().size();

        // Update the visitasPaciente using partial update
        VisitasPaciente partialUpdatedVisitasPaciente = new VisitasPaciente();
        partialUpdatedVisitasPaciente.setId(visitasPaciente.getId());

        restVisitasPacienteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedVisitasPaciente.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedVisitasPaciente))
            )
            .andExpect(status().isOk());

        // Validate the VisitasPaciente in the database
        List<VisitasPaciente> visitasPacienteList = visitasPacienteRepository.findAll();
        assertThat(visitasPacienteList).hasSize(databaseSizeBeforeUpdate);
        VisitasPaciente testVisitasPaciente = visitasPacienteList.get(visitasPacienteList.size() - 1);
        assertThat(testVisitasPaciente.getHora()).isEqualTo(DEFAULT_HORA);
        assertThat(testVisitasPaciente.getDuracion()).isEqualTo(DEFAULT_DURACION);
    }

    @Test
    @Transactional
    void fullUpdateVisitasPacienteWithPatch() throws Exception {
        // Initialize the database
        visitasPacienteRepository.saveAndFlush(visitasPaciente);

        int databaseSizeBeforeUpdate = visitasPacienteRepository.findAll().size();

        // Update the visitasPaciente using partial update
        VisitasPaciente partialUpdatedVisitasPaciente = new VisitasPaciente();
        partialUpdatedVisitasPaciente.setId(visitasPaciente.getId());

        partialUpdatedVisitasPaciente.hora(UPDATED_HORA).duracion(UPDATED_DURACION);

        restVisitasPacienteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedVisitasPaciente.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedVisitasPaciente))
            )
            .andExpect(status().isOk());

        // Validate the VisitasPaciente in the database
        List<VisitasPaciente> visitasPacienteList = visitasPacienteRepository.findAll();
        assertThat(visitasPacienteList).hasSize(databaseSizeBeforeUpdate);
        VisitasPaciente testVisitasPaciente = visitasPacienteList.get(visitasPacienteList.size() - 1);
        assertThat(testVisitasPaciente.getHora()).isEqualTo(UPDATED_HORA);
        assertThat(testVisitasPaciente.getDuracion()).isEqualTo(UPDATED_DURACION);
    }

    @Test
    @Transactional
    void patchNonExistingVisitasPaciente() throws Exception {
        int databaseSizeBeforeUpdate = visitasPacienteRepository.findAll().size();
        visitasPaciente.setId(count.incrementAndGet());

        // Create the VisitasPaciente
        VisitasPacienteDTO visitasPacienteDTO = visitasPacienteMapper.toDto(visitasPaciente);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVisitasPacienteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, visitasPacienteDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(visitasPacienteDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the VisitasPaciente in the database
        List<VisitasPaciente> visitasPacienteList = visitasPacienteRepository.findAll();
        assertThat(visitasPacienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchVisitasPaciente() throws Exception {
        int databaseSizeBeforeUpdate = visitasPacienteRepository.findAll().size();
        visitasPaciente.setId(count.incrementAndGet());

        // Create the VisitasPaciente
        VisitasPacienteDTO visitasPacienteDTO = visitasPacienteMapper.toDto(visitasPaciente);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVisitasPacienteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(visitasPacienteDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the VisitasPaciente in the database
        List<VisitasPaciente> visitasPacienteList = visitasPacienteRepository.findAll();
        assertThat(visitasPacienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamVisitasPaciente() throws Exception {
        int databaseSizeBeforeUpdate = visitasPacienteRepository.findAll().size();
        visitasPaciente.setId(count.incrementAndGet());

        // Create the VisitasPaciente
        VisitasPacienteDTO visitasPacienteDTO = visitasPacienteMapper.toDto(visitasPaciente);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVisitasPacienteMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(visitasPacienteDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the VisitasPaciente in the database
        List<VisitasPaciente> visitasPacienteList = visitasPacienteRepository.findAll();
        assertThat(visitasPacienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteVisitasPaciente() throws Exception {
        // Initialize the database
        visitasPacienteRepository.saveAndFlush(visitasPaciente);

        int databaseSizeBeforeDelete = visitasPacienteRepository.findAll().size();

        // Delete the visitasPaciente
        restVisitasPacienteMockMvc
            .perform(delete(ENTITY_API_URL_ID, visitasPaciente.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<VisitasPaciente> visitasPacienteList = visitasPacienteRepository.findAll();
        assertThat(visitasPacienteList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
