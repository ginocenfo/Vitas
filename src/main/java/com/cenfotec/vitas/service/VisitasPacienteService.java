package com.cenfotec.vitas.service;

import com.cenfotec.vitas.service.dto.VisitasPacienteDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.cenfotec.vitas.domain.VisitasPaciente}.
 */
public interface VisitasPacienteService {
    /**
     * Save a visitasPaciente.
     *
     * @param visitasPacienteDTO the entity to save.
     * @return the persisted entity.
     */
    VisitasPacienteDTO save(VisitasPacienteDTO visitasPacienteDTO);

    /**
     * Partially updates a visitasPaciente.
     *
     * @param visitasPacienteDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<VisitasPacienteDTO> partialUpdate(VisitasPacienteDTO visitasPacienteDTO);

    /**
     * Get all the visitasPacientes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<VisitasPacienteDTO> findAll(Pageable pageable);

    /**
     * Get the "id" visitasPaciente.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<VisitasPacienteDTO> findOne(Long id);

    /**
     * Delete the "id" visitasPaciente.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
