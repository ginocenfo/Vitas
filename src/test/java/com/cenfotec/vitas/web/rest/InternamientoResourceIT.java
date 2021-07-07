package com.cenfotec.vitas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.cenfotec.vitas.IntegrationTest;
import com.cenfotec.vitas.domain.Internamiento;
import com.cenfotec.vitas.repository.InternamientoRepository;
import com.cenfotec.vitas.service.dto.InternamientoDTO;
import com.cenfotec.vitas.service.mapper.InternamientoMapper;
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
 * Integration tests for the {@link InternamientoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class InternamientoResourceIT {

    private static final Instant DEFAULT_INICIO_INTERNAMIENTO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_INICIO_INTERNAMIENTO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_DURACION_INTERNAMIENTO = 1;
    private static final Integer UPDATED_DURACION_INTERNAMIENTO = 2;

    private static final String ENTITY_API_URL = "/api/internamientos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private InternamientoRepository internamientoRepository;

    @Autowired
    private InternamientoMapper internamientoMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restInternamientoMockMvc;

    private Internamiento internamiento;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Internamiento createEntity(EntityManager em) {
        Internamiento internamiento = new Internamiento()
            .inicioInternamiento(DEFAULT_INICIO_INTERNAMIENTO)
            .duracionInternamiento(DEFAULT_DURACION_INTERNAMIENTO);
        return internamiento;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Internamiento createUpdatedEntity(EntityManager em) {
        Internamiento internamiento = new Internamiento()
            .inicioInternamiento(UPDATED_INICIO_INTERNAMIENTO)
            .duracionInternamiento(UPDATED_DURACION_INTERNAMIENTO);
        return internamiento;
    }

    @BeforeEach
    public void initTest() {
        internamiento = createEntity(em);
    }

    @Test
    @Transactional
    void createInternamiento() throws Exception {
        int databaseSizeBeforeCreate = internamientoRepository.findAll().size();
        // Create the Internamiento
        InternamientoDTO internamientoDTO = internamientoMapper.toDto(internamiento);
        restInternamientoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(internamientoDTO))
            )
            .andExpect(status().isCreated());

        // Validate the Internamiento in the database
        List<Internamiento> internamientoList = internamientoRepository.findAll();
        assertThat(internamientoList).hasSize(databaseSizeBeforeCreate + 1);
        Internamiento testInternamiento = internamientoList.get(internamientoList.size() - 1);
        assertThat(testInternamiento.getInicioInternamiento()).isEqualTo(DEFAULT_INICIO_INTERNAMIENTO);
        assertThat(testInternamiento.getDuracionInternamiento()).isEqualTo(DEFAULT_DURACION_INTERNAMIENTO);
    }

    @Test
    @Transactional
    void createInternamientoWithExistingId() throws Exception {
        // Create the Internamiento with an existing ID
        internamiento.setId(1L);
        InternamientoDTO internamientoDTO = internamientoMapper.toDto(internamiento);

        int databaseSizeBeforeCreate = internamientoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restInternamientoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(internamientoDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Internamiento in the database
        List<Internamiento> internamientoList = internamientoRepository.findAll();
        assertThat(internamientoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllInternamientos() throws Exception {
        // Initialize the database
        internamientoRepository.saveAndFlush(internamiento);

        // Get all the internamientoList
        restInternamientoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(internamiento.getId().intValue())))
            .andExpect(jsonPath("$.[*].inicioInternamiento").value(hasItem(DEFAULT_INICIO_INTERNAMIENTO.toString())))
            .andExpect(jsonPath("$.[*].duracionInternamiento").value(hasItem(DEFAULT_DURACION_INTERNAMIENTO)));
    }

    @Test
    @Transactional
    void getInternamiento() throws Exception {
        // Initialize the database
        internamientoRepository.saveAndFlush(internamiento);

        // Get the internamiento
        restInternamientoMockMvc
            .perform(get(ENTITY_API_URL_ID, internamiento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(internamiento.getId().intValue()))
            .andExpect(jsonPath("$.inicioInternamiento").value(DEFAULT_INICIO_INTERNAMIENTO.toString()))
            .andExpect(jsonPath("$.duracionInternamiento").value(DEFAULT_DURACION_INTERNAMIENTO));
    }

    @Test
    @Transactional
    void getNonExistingInternamiento() throws Exception {
        // Get the internamiento
        restInternamientoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewInternamiento() throws Exception {
        // Initialize the database
        internamientoRepository.saveAndFlush(internamiento);

        int databaseSizeBeforeUpdate = internamientoRepository.findAll().size();

        // Update the internamiento
        Internamiento updatedInternamiento = internamientoRepository.findById(internamiento.getId()).get();
        // Disconnect from session so that the updates on updatedInternamiento are not directly saved in db
        em.detach(updatedInternamiento);
        updatedInternamiento.inicioInternamiento(UPDATED_INICIO_INTERNAMIENTO).duracionInternamiento(UPDATED_DURACION_INTERNAMIENTO);
        InternamientoDTO internamientoDTO = internamientoMapper.toDto(updatedInternamiento);

        restInternamientoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, internamientoDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(internamientoDTO))
            )
            .andExpect(status().isOk());

        // Validate the Internamiento in the database
        List<Internamiento> internamientoList = internamientoRepository.findAll();
        assertThat(internamientoList).hasSize(databaseSizeBeforeUpdate);
        Internamiento testInternamiento = internamientoList.get(internamientoList.size() - 1);
        assertThat(testInternamiento.getInicioInternamiento()).isEqualTo(UPDATED_INICIO_INTERNAMIENTO);
        assertThat(testInternamiento.getDuracionInternamiento()).isEqualTo(UPDATED_DURACION_INTERNAMIENTO);
    }

    @Test
    @Transactional
    void putNonExistingInternamiento() throws Exception {
        int databaseSizeBeforeUpdate = internamientoRepository.findAll().size();
        internamiento.setId(count.incrementAndGet());

        // Create the Internamiento
        InternamientoDTO internamientoDTO = internamientoMapper.toDto(internamiento);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInternamientoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, internamientoDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(internamientoDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Internamiento in the database
        List<Internamiento> internamientoList = internamientoRepository.findAll();
        assertThat(internamientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchInternamiento() throws Exception {
        int databaseSizeBeforeUpdate = internamientoRepository.findAll().size();
        internamiento.setId(count.incrementAndGet());

        // Create the Internamiento
        InternamientoDTO internamientoDTO = internamientoMapper.toDto(internamiento);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInternamientoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(internamientoDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Internamiento in the database
        List<Internamiento> internamientoList = internamientoRepository.findAll();
        assertThat(internamientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamInternamiento() throws Exception {
        int databaseSizeBeforeUpdate = internamientoRepository.findAll().size();
        internamiento.setId(count.incrementAndGet());

        // Create the Internamiento
        InternamientoDTO internamientoDTO = internamientoMapper.toDto(internamiento);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInternamientoMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(internamientoDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Internamiento in the database
        List<Internamiento> internamientoList = internamientoRepository.findAll();
        assertThat(internamientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateInternamientoWithPatch() throws Exception {
        // Initialize the database
        internamientoRepository.saveAndFlush(internamiento);

        int databaseSizeBeforeUpdate = internamientoRepository.findAll().size();

        // Update the internamiento using partial update
        Internamiento partialUpdatedInternamiento = new Internamiento();
        partialUpdatedInternamiento.setId(internamiento.getId());

        partialUpdatedInternamiento.inicioInternamiento(UPDATED_INICIO_INTERNAMIENTO);

        restInternamientoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedInternamiento.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedInternamiento))
            )
            .andExpect(status().isOk());

        // Validate the Internamiento in the database
        List<Internamiento> internamientoList = internamientoRepository.findAll();
        assertThat(internamientoList).hasSize(databaseSizeBeforeUpdate);
        Internamiento testInternamiento = internamientoList.get(internamientoList.size() - 1);
        assertThat(testInternamiento.getInicioInternamiento()).isEqualTo(UPDATED_INICIO_INTERNAMIENTO);
        assertThat(testInternamiento.getDuracionInternamiento()).isEqualTo(DEFAULT_DURACION_INTERNAMIENTO);
    }

    @Test
    @Transactional
    void fullUpdateInternamientoWithPatch() throws Exception {
        // Initialize the database
        internamientoRepository.saveAndFlush(internamiento);

        int databaseSizeBeforeUpdate = internamientoRepository.findAll().size();

        // Update the internamiento using partial update
        Internamiento partialUpdatedInternamiento = new Internamiento();
        partialUpdatedInternamiento.setId(internamiento.getId());

        partialUpdatedInternamiento.inicioInternamiento(UPDATED_INICIO_INTERNAMIENTO).duracionInternamiento(UPDATED_DURACION_INTERNAMIENTO);

        restInternamientoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedInternamiento.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedInternamiento))
            )
            .andExpect(status().isOk());

        // Validate the Internamiento in the database
        List<Internamiento> internamientoList = internamientoRepository.findAll();
        assertThat(internamientoList).hasSize(databaseSizeBeforeUpdate);
        Internamiento testInternamiento = internamientoList.get(internamientoList.size() - 1);
        assertThat(testInternamiento.getInicioInternamiento()).isEqualTo(UPDATED_INICIO_INTERNAMIENTO);
        assertThat(testInternamiento.getDuracionInternamiento()).isEqualTo(UPDATED_DURACION_INTERNAMIENTO);
    }

    @Test
    @Transactional
    void patchNonExistingInternamiento() throws Exception {
        int databaseSizeBeforeUpdate = internamientoRepository.findAll().size();
        internamiento.setId(count.incrementAndGet());

        // Create the Internamiento
        InternamientoDTO internamientoDTO = internamientoMapper.toDto(internamiento);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInternamientoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, internamientoDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(internamientoDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Internamiento in the database
        List<Internamiento> internamientoList = internamientoRepository.findAll();
        assertThat(internamientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchInternamiento() throws Exception {
        int databaseSizeBeforeUpdate = internamientoRepository.findAll().size();
        internamiento.setId(count.incrementAndGet());

        // Create the Internamiento
        InternamientoDTO internamientoDTO = internamientoMapper.toDto(internamiento);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInternamientoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(internamientoDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Internamiento in the database
        List<Internamiento> internamientoList = internamientoRepository.findAll();
        assertThat(internamientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamInternamiento() throws Exception {
        int databaseSizeBeforeUpdate = internamientoRepository.findAll().size();
        internamiento.setId(count.incrementAndGet());

        // Create the Internamiento
        InternamientoDTO internamientoDTO = internamientoMapper.toDto(internamiento);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInternamientoMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(internamientoDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Internamiento in the database
        List<Internamiento> internamientoList = internamientoRepository.findAll();
        assertThat(internamientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteInternamiento() throws Exception {
        // Initialize the database
        internamientoRepository.saveAndFlush(internamiento);

        int databaseSizeBeforeDelete = internamientoRepository.findAll().size();

        // Delete the internamiento
        restInternamientoMockMvc
            .perform(delete(ENTITY_API_URL_ID, internamiento.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Internamiento> internamientoList = internamientoRepository.findAll();
        assertThat(internamientoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
