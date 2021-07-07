package com.cenfotec.vitas.service;

import com.cenfotec.vitas.service.dto.InternamientoDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.cenfotec.vitas.domain.Internamiento}.
 */
public interface InternamientoService {
    /**
     * Save a internamiento.
     *
     * @param internamientoDTO the entity to save.
     * @return the persisted entity.
     */
    InternamientoDTO save(InternamientoDTO internamientoDTO);

    /**
     * Partially updates a internamiento.
     *
     * @param internamientoDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<InternamientoDTO> partialUpdate(InternamientoDTO internamientoDTO);

    /**
     * Get all the internamientos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<InternamientoDTO> findAll(Pageable pageable);

    /**
     * Get the "id" internamiento.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<InternamientoDTO> findOne(Long id);

    /**
     * Delete the "id" internamiento.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
