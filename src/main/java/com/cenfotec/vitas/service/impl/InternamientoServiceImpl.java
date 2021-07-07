package com.cenfotec.vitas.service.impl;

import com.cenfotec.vitas.domain.Internamiento;
import com.cenfotec.vitas.repository.InternamientoRepository;
import com.cenfotec.vitas.service.InternamientoService;
import com.cenfotec.vitas.service.dto.InternamientoDTO;
import com.cenfotec.vitas.service.mapper.InternamientoMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Internamiento}.
 */
@Service
@Transactional
public class InternamientoServiceImpl implements InternamientoService {

    private final Logger log = LoggerFactory.getLogger(InternamientoServiceImpl.class);

    private final InternamientoRepository internamientoRepository;

    private final InternamientoMapper internamientoMapper;

    public InternamientoServiceImpl(InternamientoRepository internamientoRepository, InternamientoMapper internamientoMapper) {
        this.internamientoRepository = internamientoRepository;
        this.internamientoMapper = internamientoMapper;
    }

    @Override
    public InternamientoDTO save(InternamientoDTO internamientoDTO) {
        log.debug("Request to save Internamiento : {}", internamientoDTO);
        Internamiento internamiento = internamientoMapper.toEntity(internamientoDTO);
        internamiento = internamientoRepository.save(internamiento);
        return internamientoMapper.toDto(internamiento);
    }

    @Override
    public Optional<InternamientoDTO> partialUpdate(InternamientoDTO internamientoDTO) {
        log.debug("Request to partially update Internamiento : {}", internamientoDTO);

        return internamientoRepository
            .findById(internamientoDTO.getId())
            .map(
                existingInternamiento -> {
                    internamientoMapper.partialUpdate(existingInternamiento, internamientoDTO);

                    return existingInternamiento;
                }
            )
            .map(internamientoRepository::save)
            .map(internamientoMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<InternamientoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Internamientos");
        return internamientoRepository.findAll(pageable).map(internamientoMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<InternamientoDTO> findOne(Long id) {
        log.debug("Request to get Internamiento : {}", id);
        return internamientoRepository.findById(id).map(internamientoMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Internamiento : {}", id);
        internamientoRepository.deleteById(id);
    }
}
