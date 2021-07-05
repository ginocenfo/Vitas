package com.cenfotec.vitas.service.impl;

import com.cenfotec.vitas.domain.Sala;
import com.cenfotec.vitas.repository.SalaRepository;
import com.cenfotec.vitas.service.SalaService;
import com.cenfotec.vitas.service.dto.SalaDTO;
import com.cenfotec.vitas.service.mapper.SalaMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Sala}.
 */
@Service
@Transactional
public class SalaServiceImpl implements SalaService {

    private final Logger log = LoggerFactory.getLogger(SalaServiceImpl.class);

    private final SalaRepository salaRepository;

    private final SalaMapper salaMapper;

    public SalaServiceImpl(SalaRepository salaRepository, SalaMapper salaMapper) {
        this.salaRepository = salaRepository;
        this.salaMapper = salaMapper;
    }

    @Override
    public SalaDTO save(SalaDTO salaDTO) {
        log.debug("Request to save Sala : {}", salaDTO);
        Sala sala = salaMapper.toEntity(salaDTO);
        sala = salaRepository.save(sala);
        return salaMapper.toDto(sala);
    }

    @Override
    public Optional<SalaDTO> partialUpdate(SalaDTO salaDTO) {
        log.debug("Request to partially update Sala : {}", salaDTO);

        return salaRepository
            .findById(salaDTO.getId())
            .map(
                existingSala -> {
                    salaMapper.partialUpdate(existingSala, salaDTO);

                    return existingSala;
                }
            )
            .map(salaRepository::save)
            .map(salaMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<SalaDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Salas");
        return salaRepository.findAll(pageable).map(salaMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<SalaDTO> findOne(Long id) {
        log.debug("Request to get Sala : {}", id);
        return salaRepository.findById(id).map(salaMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Sala : {}", id);
        salaRepository.deleteById(id);
    }
}
