package com.cenfotec.vitas.web.rest;

import com.cenfotec.vitas.repository.VisitasPacienteRepository;
import com.cenfotec.vitas.service.VisitasPacienteService;
import com.cenfotec.vitas.service.dto.VisitasPacienteDTO;
import com.cenfotec.vitas.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.cenfotec.vitas.domain.VisitasPaciente}.
 */
@RestController
@RequestMapping("/api")
public class VisitasPacienteResource {

    private final Logger log = LoggerFactory.getLogger(VisitasPacienteResource.class);

    private static final String ENTITY_NAME = "visitasPaciente";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VisitasPacienteService visitasPacienteService;

    private final VisitasPacienteRepository visitasPacienteRepository;

    public VisitasPacienteResource(VisitasPacienteService visitasPacienteService, VisitasPacienteRepository visitasPacienteRepository) {
        this.visitasPacienteService = visitasPacienteService;
        this.visitasPacienteRepository = visitasPacienteRepository;
    }

    /**
     * {@code POST  /visitas-pacientes} : Create a new visitasPaciente.
     *
     * @param visitasPacienteDTO the visitasPacienteDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new visitasPacienteDTO, or with status {@code 400 (Bad Request)} if the visitasPaciente has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/visitas-pacientes")
    public ResponseEntity<VisitasPacienteDTO> createVisitasPaciente(@RequestBody VisitasPacienteDTO visitasPacienteDTO)
        throws URISyntaxException {
        log.debug("REST request to save VisitasPaciente : {}", visitasPacienteDTO);
        if (visitasPacienteDTO.getId() != null) {
            throw new BadRequestAlertException("A new visitasPaciente cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VisitasPacienteDTO result = visitasPacienteService.save(visitasPacienteDTO);
        return ResponseEntity
            .created(new URI("/api/visitas-pacientes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /visitas-pacientes/:id} : Updates an existing visitasPaciente.
     *
     * @param id the id of the visitasPacienteDTO to save.
     * @param visitasPacienteDTO the visitasPacienteDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated visitasPacienteDTO,
     * or with status {@code 400 (Bad Request)} if the visitasPacienteDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the visitasPacienteDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/visitas-pacientes/{id}")
    public ResponseEntity<VisitasPacienteDTO> updateVisitasPaciente(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody VisitasPacienteDTO visitasPacienteDTO
    ) throws URISyntaxException {
        log.debug("REST request to update VisitasPaciente : {}, {}", id, visitasPacienteDTO);
        if (visitasPacienteDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, visitasPacienteDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!visitasPacienteRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        VisitasPacienteDTO result = visitasPacienteService.save(visitasPacienteDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, visitasPacienteDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /visitas-pacientes/:id} : Partial updates given fields of an existing visitasPaciente, field will ignore if it is null
     *
     * @param id the id of the visitasPacienteDTO to save.
     * @param visitasPacienteDTO the visitasPacienteDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated visitasPacienteDTO,
     * or with status {@code 400 (Bad Request)} if the visitasPacienteDTO is not valid,
     * or with status {@code 404 (Not Found)} if the visitasPacienteDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the visitasPacienteDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/visitas-pacientes/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<VisitasPacienteDTO> partialUpdateVisitasPaciente(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody VisitasPacienteDTO visitasPacienteDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update VisitasPaciente partially : {}, {}", id, visitasPacienteDTO);
        if (visitasPacienteDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, visitasPacienteDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!visitasPacienteRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<VisitasPacienteDTO> result = visitasPacienteService.partialUpdate(visitasPacienteDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, visitasPacienteDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /visitas-pacientes} : get all the visitasPacientes.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of visitasPacientes in body.
     */
    @GetMapping("/visitas-pacientes")
    public ResponseEntity<List<VisitasPacienteDTO>> getAllVisitasPacientes(Pageable pageable) {
        log.debug("REST request to get a page of VisitasPacientes");
        Page<VisitasPacienteDTO> page = visitasPacienteService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /visitas-pacientes/:id} : get the "id" visitasPaciente.
     *
     * @param id the id of the visitasPacienteDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the visitasPacienteDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/visitas-pacientes/{id}")
    public ResponseEntity<VisitasPacienteDTO> getVisitasPaciente(@PathVariable Long id) {
        log.debug("REST request to get VisitasPaciente : {}", id);
        Optional<VisitasPacienteDTO> visitasPacienteDTO = visitasPacienteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(visitasPacienteDTO);
    }

    /**
     * {@code DELETE  /visitas-pacientes/:id} : delete the "id" visitasPaciente.
     *
     * @param id the id of the visitasPacienteDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/visitas-pacientes/{id}")
    public ResponseEntity<Void> deleteVisitasPaciente(@PathVariable Long id) {
        log.debug("REST request to delete VisitasPaciente : {}", id);
        visitasPacienteService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
