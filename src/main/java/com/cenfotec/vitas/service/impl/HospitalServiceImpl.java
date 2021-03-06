package com.cenfotec.vitas.service.impl;

import com.cenfotec.vitas.domain.Hospital;
import com.cenfotec.vitas.repository.HospitalRepository;
import com.cenfotec.vitas.service.HospitalService;
import com.cenfotec.vitas.service.dto.HospitalDTO;
import com.cenfotec.vitas.service.mapper.HospitalMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Hospital}.
 */
@Service
@Transactional
public class HospitalServiceImpl implements HospitalService {

    private final Logger log = LoggerFactory.getLogger(HospitalServiceImpl.class);

    private final HospitalRepository hospitalRepository;

    private final HospitalMapper hospitalMapper;

    public HospitalServiceImpl(HospitalRepository hospitalRepository, HospitalMapper hospitalMapper) {
        this.hospitalRepository = hospitalRepository;
        this.hospitalMapper = hospitalMapper;
    }

    @Override
    public HospitalDTO save(HospitalDTO hospitalDTO) {
        log.debug("Request to save Hospital : {}", hospitalDTO);
        Hospital hospital = hospitalMapper.toEntity(hospitalDTO);
        hospital = hospitalRepository.save(hospital);
        return hospitalMapper.toDto(hospital);
    }

    @Override
    public Optional<HospitalDTO> partialUpdate(HospitalDTO hospitalDTO) {
        log.debug("Request to partially update Hospital : {}", hospitalDTO);

        return hospitalRepository
            .findById(hospitalDTO.getId())
            .map(
                existingHospital -> {
                    hospitalMapper.partialUpdate(existingHospital, hospitalDTO);

                    return existingHospital;
                }
            )
            .map(hospitalRepository::save)
            .map(hospitalMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<HospitalDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Hospitals");
        return hospitalRepository.findAll(pageable).map(hospitalMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<HospitalDTO> findOne(Long id) {
        log.debug("Request to get Hospital : {}", id);
        return hospitalRepository.findById(id).map(hospitalMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Hospital : {}", id);
        hospitalRepository.deleteById(id);
    }
}
