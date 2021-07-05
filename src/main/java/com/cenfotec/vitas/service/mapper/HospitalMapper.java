package com.cenfotec.vitas.service.mapper;

import com.cenfotec.vitas.domain.*;
import com.cenfotec.vitas.service.dto.HospitalDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Hospital} and its DTO {@link HospitalDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface HospitalMapper extends EntityMapper<HospitalDTO, Hospital> {
    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    HospitalDTO toDtoId(Hospital hospital);
}
