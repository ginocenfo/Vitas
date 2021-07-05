package com.cenfotec.vitas.service.impl;

import com.cenfotec.vitas.domain.VisitasPaciente;
import com.cenfotec.vitas.repository.VisitasPacienteRepository;
import com.cenfotec.vitas.service.VisitasPacienteService;
import com.cenfotec.vitas.service.dto.VisitasPacienteDTO;
import com.cenfotec.vitas.service.mapper.VisitasPacienteMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link VisitasPaciente}.
 */
@Service
@Transactional
public class VisitasPacienteServiceImpl implements VisitasPacienteService {

    private final Logger log = LoggerFactory.getLogger(VisitasPacienteServiceImpl.class);

    private final VisitasPacienteRepository visitasPacienteRepository;

    private final VisitasPacienteMapper visitasPacienteMapper;

    public VisitasPacienteServiceImpl(VisitasPacienteRepository visitasPacienteRepository, VisitasPacienteMapper visitasPacienteMapper) {
        this.visitasPacienteRepository = visitasPacienteRepository;
        this.visitasPacienteMapper = visitasPacienteMapper;
    }

    @Override
    public VisitasPacienteDTO save(VisitasPacienteDTO visitasPacienteDTO) {
        log.debug("Request to save VisitasPaciente : {}", visitasPacienteDTO);
        VisitasPaciente visitasPaciente = visitasPacienteMapper.toEntity(visitasPacienteDTO);
        visitasPaciente = visitasPacienteRepository.save(visitasPaciente);
        return visitasPacienteMapper.toDto(visitasPaciente);
    }

    @Override
    public Optional<VisitasPacienteDTO> partialUpdate(VisitasPacienteDTO visitasPacienteDTO) {
        log.debug("Request to partially update VisitasPaciente : {}", visitasPacienteDTO);

        return visitasPacienteRepository
            .findById(visitasPacienteDTO.getId())
            .map(
                existingVisitasPaciente -> {
                    visitasPacienteMapper.partialUpdate(existingVisitasPaciente, visitasPacienteDTO);

                    return existingVisitasPaciente;
                }
            )
            .map(visitasPacienteRepository::save)
            .map(visitasPacienteMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<VisitasPacienteDTO> findAll(Pageable pageable) {
        log.debug("Request to get all VisitasPacientes");
        return visitasPacienteRepository.findAll(pageable).map(visitasPacienteMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<VisitasPacienteDTO> findOne(Long id) {
        log.debug("Request to get VisitasPaciente : {}", id);
        return visitasPacienteRepository.findById(id).map(visitasPacienteMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete VisitasPaciente : {}", id);
        visitasPacienteRepository.deleteById(id);
    }
}
