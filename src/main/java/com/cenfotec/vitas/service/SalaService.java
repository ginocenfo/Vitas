package com.cenfotec.vitas.service;

import com.cenfotec.vitas.service.dto.SalaDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.cenfotec.vitas.domain.Sala}.
 */
public interface SalaService {
    /**
     * Save a sala.
     *
     * @param salaDTO the entity to save.
     * @return the persisted entity.
     */
    SalaDTO save(SalaDTO salaDTO);

    /**
     * Partially updates a sala.
     *
     * @param salaDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<SalaDTO> partialUpdate(SalaDTO salaDTO);

    /**
     * Get all the salas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<SalaDTO> findAll(Pageable pageable);

    /**
     * Get the "id" sala.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<SalaDTO> findOne(Long id);

    /**
     * Delete the "id" sala.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
