package com.cenfotec.vitas.web.rest;

import com.cenfotec.vitas.repository.InternamientoRepository;
import com.cenfotec.vitas.service.InternamientoService;
import com.cenfotec.vitas.service.dto.InternamientoDTO;
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
 * REST controller for managing {@link com.cenfotec.vitas.domain.Internamiento}.
 */
@RestController
@RequestMapping("/api")
public class InternamientoResource {

    private final Logger log = LoggerFactory.getLogger(InternamientoResource.class);

    private static final String ENTITY_NAME = "internamiento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InternamientoService internamientoService;

    private final InternamientoRepository internamientoRepository;

    public InternamientoResource(InternamientoService internamientoService, InternamientoRepository internamientoRepository) {
        this.internamientoService = internamientoService;
        this.internamientoRepository = internamientoRepository;
    }

    /**
     * {@code POST  /internamientos} : Create a new internamiento.
     *
     * @param internamientoDTO the internamientoDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new internamientoDTO, or with status {@code 400 (Bad Request)} if the internamiento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/internamientos")
    public ResponseEntity<InternamientoDTO> createInternamiento(@RequestBody InternamientoDTO internamientoDTO) throws URISyntaxException {
        log.debug("REST request to save Internamiento : {}", internamientoDTO);
        if (internamientoDTO.getId() != null) {
            throw new BadRequestAlertException("A new internamiento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InternamientoDTO result = internamientoService.save(internamientoDTO);
        return ResponseEntity
            .created(new URI("/api/internamientos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /internamientos/:id} : Updates an existing internamiento.
     *
     * @param id the id of the internamientoDTO to save.
     * @param internamientoDTO the internamientoDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated internamientoDTO,
     * or with status {@code 400 (Bad Request)} if the internamientoDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the internamientoDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/internamientos/{id}")
    public ResponseEntity<InternamientoDTO> updateInternamiento(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody InternamientoDTO internamientoDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Internamiento : {}, {}", id, internamientoDTO);
        if (internamientoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, internamientoDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!internamientoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        InternamientoDTO result = internamientoService.save(internamientoDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, internamientoDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /internamientos/:id} : Partial updates given fields of an existing internamiento, field will ignore if it is null
     *
     * @param id the id of the internamientoDTO to save.
     * @param internamientoDTO the internamientoDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated internamientoDTO,
     * or with status {@code 400 (Bad Request)} if the internamientoDTO is not valid,
     * or with status {@code 404 (Not Found)} if the internamientoDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the internamientoDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/internamientos/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<InternamientoDTO> partialUpdateInternamiento(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody InternamientoDTO internamientoDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Internamiento partially : {}, {}", id, internamientoDTO);
        if (internamientoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, internamientoDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!internamientoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<InternamientoDTO> result = internamientoService.partialUpdate(internamientoDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, internamientoDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /internamientos} : get all the internamientos.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of internamientos in body.
     */
    @GetMapping("/internamientos")
    public ResponseEntity<List<InternamientoDTO>> getAllInternamientos(Pageable pageable) {
        log.debug("REST request to get a page of Internamientos");
        Page<InternamientoDTO> page = internamientoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /internamientos/:id} : get the "id" internamiento.
     *
     * @param id the id of the internamientoDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the internamientoDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/internamientos/{id}")
    public ResponseEntity<InternamientoDTO> getInternamiento(@PathVariable Long id) {
        log.debug("REST request to get Internamiento : {}", id);
        Optional<InternamientoDTO> internamientoDTO = internamientoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(internamientoDTO);
    }

    /**
     * {@code DELETE  /internamientos/:id} : delete the "id" internamiento.
     *
     * @param id the id of the internamientoDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/internamientos/{id}")
    public ResponseEntity<Void> deleteInternamiento(@PathVariable Long id) {
        log.debug("REST request to delete Internamiento : {}", id);
        internamientoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
